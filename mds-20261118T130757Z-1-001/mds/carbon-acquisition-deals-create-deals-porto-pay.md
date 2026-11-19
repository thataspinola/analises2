# carbon-acquisition-deals-create-deals-porto-pay

- Repositório: `deals/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app-create-deals-porto-pay-cards/` (o nome da pasta difere do nome da função)
- Classificação: PROBLEMA
- Funções sistêmicas: 1 (fila SQS `carbon-acquisition-deals-create-deals-porto-pay`)

## Resumo

A função faz parte do fluxo de ofertas (deals). Para cada pedido de ofertas, consulta os cartões Porto Pay do cliente, mantém apenas as bandeiras aceitas, ordena e grava o resultado numa tabela DynamoDB, por meio da layer compartilhada do projeto. Ela consome uma fila alimentada pelo tópico SNS `carbon-create-deals`. Tem os mesmos defeitos de retorno das funções de elegibilidade e good card, com um agravante: o controller descarta os erros sem nem registrá-los em log. Quando a consulta de cartões está desligada, a função nunca termina; nos demais casos, as falhas são tratadas como sucesso e a mensagem é apagada da fila.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-acquisition-deals-create-deals-porto-pay` | Lote de 1, falha parcial ativa | `infra/modules/lambda-create-deals-porto-pay-cards-event-source/main.tf:5-14` |

A fila é assinante do tópico `carbon-create-deals` (`infra/modules/lambda-create-deals-porto-pay-cards-queue/main.tf:21-26`), onde a lambda vizinha `carbon-acquisition-deals-create-deals` publica cada pedido de ofertas. A assinatura não tem filtro. O vínculo entre a pasta `app-create-deals-porto-pay-cards/` e a função `carbon-acquisition-deals-create-deals-porto-pay` é feito pela variável `lambda_name_create_deals_porto_pay_cards` (`infra/variables.tf:28-31`). Não há outros gatilhos para esta função no Terraform.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app-create-deals-porto-pay-cards/index.js:5-30` |

Ramificação por tipo de evento: Não. O desvio pelo campo `creditCards` da mensagem é uma regra de negócio.

## Fluxos de retorno

Cada mensagem é tratada dentro de uma Promise criada manualmente, que só termina quando alguém chama `resolve` ou `reject`. O handler espera todas as Promises e marca como falha as rejeitadas.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Cartões gravados | Sucesso | Correto |
| JSON inválido | Mensagem marcada como falha | Correto |
| `creditCards` igual a `false` | Nenhum retorno; a função termina por timeout | Problema 1 |
| Dados inválidos, falha no token ou na API | Sucesso, erro descartado sem log | Problema 2 |
| Cliente sem cartões (API responde 404) | Sucesso, por um erro descartado no filtro | Problema 4 |
| Falha ao gravar no DynamoDB | Sucesso, com objeto de erro ignorado | Problema 3 |

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-acquisition-deals-create-deals-porto-pay-dead-letter` |
| Tentativas antes da DLQ | 10 |
| Retenção da DLQ | 14 dias em prd; 3 dias em dev e 1 em poc, menos que os 4 dias da fila |
| Visibility timeout x timeout | 120 s x 30 s em prd (4 vezes); 120 s x 60 s em hml e poc |

Na prática, a DLQ recebe as mensagens que deveriam ser apenas ignoradas (problema 1), enquanto as falhas reais não chegam a ela. Configuração em `infra/modules/lambda-create-deals-porto-pay-cards-queue/main.tf`.

## Divergências Terraform x Código

Nenhuma no contrato: o Terraform ativa a resposta de falha parcial e o handler devolve essa resposta. Os defeitos estão no tratamento de cada mensagem.

## Problemas encontrados

### 1. Promise que nunca termina quando a consulta está desligada (Alta)

- O que acontece: se a mensagem traz `creditCards: false`, o código só registra um log e não chama `resolve` nem `reject` (mesmo trecho das funções de elegibilidade e good card).
- Por que é um problema: a Promise fica pendente e a execução só termina por timeout. A AWS devolve a mensagem para a fila e repete 10 vezes, até mandá-la para a DLQ.
- Como corrigir: chamar `resolve()` no ramo em que a consulta está desligada.
- Onde: `app-create-deals-porto-pay-cards/index.js:12-15`

### 2. Controller descarta o erro sem log (Alta)

- O que acontece: o controller captura qualquer erro e devolve um objeto de resposta HTTP, sem registrar o erro.

Trecho simplificado de `app-create-deals-porto-pay-cards/src/controller/portoPayCardsController.js:36-43`:

```js
} catch (error) {
	if (error.name == 'ValidationError') {
		return factory.response.badRequestError('Não foi possível processar ...')
	}
	return factory.response.error('Erro interno')
}
```

- Por que é um problema: a mensagem é confirmada e apagada da fila, sem nova tentativa e sem DLQ. Como o erro não vai para o log, não há como saber depois que a falha aconteceu nem por quê.
- Como corrigir: registrar o erro e relançá-lo (`throw error`).
- Onde: `app-create-deals-porto-pay-cards/src/controller/portoPayCardsController.js:36-43`

### 3. Layer de dados devolve objeto em falha de gravação (Alta)

- O que acontece: a função de gravação da layer compartilhada `carbon-acquisition-deals-common-layer` captura o erro do DynamoDB e devolve um objeto. O controller não verifica o retorno.
- Por que é um problema: a falha de gravação passa como sucesso. O mesmo acontece nas outras quatro lambdas SQS de `deals`.
- Como corrigir: fazer a função de gravação da layer lançar o erro.
- Onde: `app-deals-data-layer/nodejs/carbon-acquisition-deals-common-layer/src/controller/dealsController.js:17-25`

### 4. Cliente sem cartões tratado por um erro escondido (Baixa)

- O que acontece: quando a API responde 404, a função recebe `null` e o filtro de bandeiras tenta percorrer esse `null`, gerando um `TypeError`. O erro é descartado pelo catch do problema 2.
- Por que é um problema: o resultado final (nada é gravado) está certo por acaso. Depois de corrigir o problema 2, esse caso passaria a falhar e ir para a DLQ.
- Como corrigir: verificar se a resposta da API é `null` antes do filtro e encerrar sem erro.
- Onde: `app-create-deals-porto-pay-cards/src/service/filterCardsService.js:12-13`

### 5. Visibility timeout abaixo do recomendado (Média)

- O que acontece: o visibility timeout (120 s) fica entre 2 e 4,8 vezes o timeout da função.
- Por que é um problema: a AWS recomenda visibility de pelo menos 6 vezes o timeout, para evitar reprocessamento durante as retentativas internas do gatilho.
- Como corrigir: aumentar o visibility timeout para 360 s.
- Onde: `infra/prd.tfvars:16`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Corrigir os fluxos de retorno (problemas 1 a 4), tratando o caso de cliente sem cartões junto com a correção do catch. Também vale filtrar no SNS as mensagens com a consulta desligada, para que nem cheguem à fila.

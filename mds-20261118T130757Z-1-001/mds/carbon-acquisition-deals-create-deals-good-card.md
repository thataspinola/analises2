# carbon-acquisition-deals-create-deals-good-card

- Repositório: `deals/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app-create-deals-good-card/`
- Classificação: PROBLEMA
- Funções sistêmicas: 1 (fila SQS `carbon-acquisition-deals-create-deals-good-card`)

## Resumo

A função faz parte do fluxo de ofertas (deals). Para cada pedido de ofertas, consulta as ofertas de cartão (good card) do cliente e grava o resultado numa tabela DynamoDB, por meio da layer compartilhada do projeto. Ela consome uma fila alimentada pelo tópico SNS `carbon-create-deals`. Tem os mesmos defeitos de retorno da função de elegibilidade. Quando a consulta de cartões está desligada na mensagem, a função nunca termina e só para por timeout. Nos demais casos, o controller e a layer de dados capturam os erros e devolvem um objeto, então toda falha é tratada como sucesso e a mensagem é apagada da fila.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-acquisition-deals-create-deals-good-card` | Lote de 1, falha parcial ativa | `infra/modules/lambda-create-deals-good-card-event-source/main.tf:5-14` |

A fila é assinante do tópico `carbon-create-deals` (`infra/modules/lambda-create-deals-good-card-queue/main.tf:21-26`), onde a lambda vizinha `carbon-acquisition-deals-create-deals` publica cada pedido de ofertas. A assinatura não tem filtro. Não há outros gatilhos para esta função no Terraform.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app-create-deals-good-card/index.js:5-27` |

Ramificação por tipo de evento: Não. O desvio pelo campo `creditCards` da mensagem é uma regra de negócio.

## Fluxos de retorno

Cada mensagem é tratada dentro de uma Promise criada manualmente, que só termina quando alguém chama `resolve` ou `reject`. O handler espera todas as Promises e marca como falha as rejeitadas.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Oferta gravada | Sucesso | Correto |
| Cliente sem oferta (API responde 404) | Sucesso, nada é gravado | Correto |
| JSON inválido | Mensagem marcada como falha | Correto |
| `creditCards` igual a `false` | Nenhum retorno; a função termina por timeout | Problema 1 |
| Dados inválidos, falha no token ou na API | Sucesso, com objeto de erro ignorado | Problema 2 |
| Falha ao gravar no DynamoDB | Sucesso, com objeto de erro ignorado | Problema 3 |

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-acquisition-deals-create-deals-good-card-dead-letter` |
| Tentativas antes da DLQ | 10 |
| Retenção da DLQ | 14 dias em prd; 3 dias em dev e 1 em poc, menos que os 4 dias da fila |
| Visibility timeout x timeout | 120 s x 30 s em prd (4 vezes); 120 s x 60 s em hml e poc |

Na prática, a DLQ recebe as mensagens que deveriam ser apenas ignoradas (problema 1), enquanto as falhas reais não chegam a ela. Configuração em `infra/modules/lambda-create-deals-good-card-queue/main.tf`.

## Divergências Terraform x Código

Nenhuma no contrato: o Terraform ativa a resposta de falha parcial e o handler devolve essa resposta. Os defeitos estão no tratamento de cada mensagem.

## Problemas encontrados

### 1. Promise que nunca termina quando a consulta está desligada (Alta)

- O que acontece: se a mensagem traz `creditCards: false`, o código só registra um log e não chama `resolve` nem `reject`.

Trecho simplificado de `app-create-deals-good-card/index.js:12-20`:

```js
if (parsedInput.creditCards === false) {
	service.logger.info(`[NÃO REALIZAR A CHAMADA PARA GOOD CARDS]...`)
} else {
	service.logger.info(`[REALIZAR A CHAMADA PARA GOOD CARDS]...`)
	controller.goodCard.process(parsedInput).then(resolve).catch(reject)
}
```

- Por que é um problema: a Promise fica pendente, o handler nunca responde e a execução só termina por timeout. A AWS devolve a mensagem para a fila e repete 10 vezes, até mandá-la para a DLQ. Uma mensagem que deveria ser ignorada gasta 10 execuções completas e aparece como erro.
- Como corrigir: chamar `resolve()` no ramo em que a consulta está desligada.
- Onde: `app-create-deals-good-card/index.js:12-15`

### 2. Controller devolve objeto no lugar de lançar o erro (Alta)

- O que acontece: o controller captura qualquer erro e devolve um objeto de resposta HTTP (400 ou 500).
- Por que é um problema: a mensagem é confirmada e apagada da fila, sem nova tentativa e sem ir para a DLQ. A oferta do cliente não é gravada.
- Como corrigir: registrar o erro e relançá-lo (`throw error`).
- Onde: `app-create-deals-good-card/src/controller/goodCardController.js:27-36`

### 3. Layer de dados devolve objeto em falha de gravação (Alta)

- O que acontece: a função de gravação da layer compartilhada `carbon-acquisition-deals-common-layer` captura o erro do DynamoDB e devolve um objeto. O controller não verifica o retorno.
- Por que é um problema: a falha de gravação passa como sucesso. O mesmo acontece nas outras quatro lambdas SQS de `deals`.
- Como corrigir: fazer a função de gravação da layer lançar o erro.
- Onde: `app-deals-data-layer/nodejs/carbon-acquisition-deals-common-layer/src/controller/dealsController.js:17-25`

### 4. Visibility timeout abaixo do recomendado (Média)

- O que acontece: o visibility timeout é de 120 s em todos os ambientes, entre 2 e 4,8 vezes o timeout da função.
- Por que é um problema: a AWS recomenda pelo menos 6 vezes para evitar reprocessamento durante as retentativas internas do gatilho.
- Como corrigir: aumentar o visibility timeout para 360 s.
- Onde: `infra/prd.tfvars:16`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Corrigir primeiro os fluxos de retorno (problemas 1, 2 e 3). Também vale filtrar no SNS as mensagens com a consulta desligada, para que nem cheguem à fila.

## Observações

- O mesmo campo `creditCards` desliga esta função e a `carbon-acquisition-deals-create-deals-porto-pay`, que tem o mesmo defeito.

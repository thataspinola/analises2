# carbon-acquisition-deals-create-deals-card-proposals

- Repositório: `deals/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app-create-deals-card-proposals/`
- Classificação: PROBLEMA
- Funções sistêmicas: 1 (fila SQS `carbon-acquisition-deals-create-deals-card-proposals`)

## Resumo

A função faz parte do fluxo de ofertas (deals). Para cada pedido de ofertas, consulta na API do Portobank as propostas de cartão em andamento do cliente e grava o resultado numa tabela DynamoDB, por meio da layer compartilhada do projeto. Ela consome uma fila alimentada pelo tópico SNS `carbon-create-deals`. O handler está preparado para informar falhas à AWS, mas o controller e a layer de dados capturam todos os erros e devolvem um objeto em vez de lançar. Com isso, toda falha é tratada como sucesso e a mensagem é apagada da fila sem nova tentativa.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-acquisition-deals-create-deals-card-proposals` | Lote de 1, falha parcial ativa | `infra/modules/lambda-create-deals-card-proposals-event-source/main.tf:5-14` |

A fila é assinante do tópico `carbon-create-deals` (`infra/modules/lambda-create-deals-card-proposals-queue/main.tf:21-26`), onde a lambda vizinha `carbon-acquisition-deals-create-deals` publica cada pedido de ofertas. O mesmo tópico alimenta as cinco lambdas SQS de `deals`. Não há outros gatilhos para esta função no Terraform.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app-create-deals-card-proposals/index.js:5-21` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O handler só marca uma mensagem como falha quando a Promise do controller é rejeitada. O controller, porém, captura qualquer erro e devolve um objeto no formato de resposta HTTP (`statusCode`/`body`), o que resolve a Promise.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Propostas gravadas | Sucesso | Correto |
| Cliente sem propostas (API responde 404) | Sucesso, nada é gravado | Correto |
| JSON inválido | Mensagem marcada como falha | Correto |
| Dados inválidos, falha no token ou na API | Sucesso, com objeto de erro ignorado | Problema 1 |
| Falha ao gravar no DynamoDB | Sucesso, com objeto de erro ignorado | Problema 2 |

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-acquisition-deals-create-deals-card-proposals-dead-letter` |
| Tentativas antes da DLQ | 10 |
| Retenção da DLQ | 14 dias em prd; 3 dias em dev e 1 em poc, menos que os 4 dias da fila |
| Visibility timeout x timeout | 120 s x 30 s em prd (4 vezes); 120 s x 60 s em hml e poc |

A DLQ está configurada, mas, pelos problemas 1 e 2, as falhas de processamento não chegam a ela. Configuração em `infra/modules/lambda-create-deals-card-proposals-queue/main.tf`.

## Divergências Terraform x Código

Nenhuma no contrato: o Terraform ativa a resposta de falha parcial e o handler devolve essa resposta. O problema está no controller e na layer, que escondem as falhas do handler.

## Problemas encontrados

### 1. Controller devolve objeto no lugar de lançar o erro (Alta)

- O que acontece: qualquer erro no processamento é capturado pelo controller e convertido num objeto de resposta HTTP.

Trecho de `app-create-deals-card-proposals/src/controller/cardProposalsController.js:35-39`:

```js
} catch (error) {
	service.logger.error(error.message)

	return factory.response.error(error.message, error.code)
}
```

- Por que é um problema: a mensagem é confirmada como processada e apagada da fila. Não há nova tentativa, a mensagem não vai para a DLQ, e as propostas daquele cliente não são gravadas. O formato HTTP (`statusCode`/`body`) não tem efeito numa função acionada por fila.
- Como corrigir: registrar o erro e relançá-lo (`throw error`), para que o handler marque a mensagem como falha.
- Onde: `app-create-deals-card-proposals/src/controller/cardProposalsController.js:35-40`

### 2. Layer de dados devolve objeto em falha de gravação (Alta)

- O que acontece: a função de gravação da layer compartilhada `carbon-acquisition-deals-common-layer` captura o erro do DynamoDB e devolve um objeto de erro. O controller aguarda essa função, mas não verifica o retorno.
- Por que é um problema: uma falha de gravação passa como sucesso antes mesmo de chegar ao catch do controller. O mesmo acontece nas outras quatro lambdas SQS de `deals`, que usam a mesma layer.
- Como corrigir: fazer a função de gravação da layer lançar o erro.
- Onde: `app-deals-data-layer/nodejs/carbon-acquisition-deals-common-layer/src/controller/dealsController.js:17-25`

### 3. Visibility timeout abaixo do recomendado (Média)

- O que acontece: o visibility timeout é de 120 s em todos os ambientes, entre 2 e 4,8 vezes o timeout da função.
- Por que é um problema: a AWS recomenda pelo menos 6 vezes para evitar reprocessamento durante as retentativas internas do gatilho.
- Como corrigir: aumentar o visibility timeout para 360 s.
- Onde: `infra/prd.tfvars:16`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Corrigir os dois pontos que escondem as falhas (problemas 1 e 2); a correção da layer beneficia as cinco lambdas SQS de `deals`. Em seguida, ajustar o visibility timeout.

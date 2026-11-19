# carbon-inspection-request-portable-device

- Repositório: `inspection-request-portable-device/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app-request/`
- Classificação: PROBLEMA
- Funções sistêmicas: 1 (fila SQS `carbon-inspection-request-portable-device`)

## Resumo

A função trata propostas de seguro para aparelhos portáteis que exigem vistoria. Para cada mensagem, envia a proposta ao produto, grava os dados de pagamento e, quando há dados de tagueamento, publica na fila do Google Analytics. Ela consome a fila `carbon-inspection-request-portable-device`, alimentada pelo tópico SNS `carbon-inspection-ready`. O tratamento de erro do handler está correto, mas a etapa do Google Analytics usa duas variáveis que não existem no arquivo. Toda mensagem com dados de tagueamento falha depois de a proposta já ter sido enviada, é reprocessada várias vezes (reenviando a proposta) e termina na fila de fail, que manda um e-mail de erro.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-inspection-request-portable-device` | Lote de 10, falha parcial ativa | `infra/modules/sqs-inspection-request/main.tf:48-60` |

A fila é assinante do tópico SNS `carbon-inspection-ready`, com filtro `scope = portable_device` (`infra/modules/sqs-inspection-request/main.tf:31-42`). O vínculo com o código é feito pelo módulo `lambda-inspection-request`, que empacota a pasta `app-request/`. Não há outros gatilhos no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app-request/index.js:5-19` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O handler processa cada mensagem e devolve `{ batchItemFailures }` com as que falharam. Todas as etapas registram o erro e o relançam, então toda falha chega ao handler.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Mensagem sem dados de tagueamento | Lista de falhas vazia | Correto |
| Mensagem com dados de tagueamento | Falha sempre, após enviar a proposta | Problema 1 |
| Falha na validação, no token, na proposta ou na gravação | Mensagem marcada como falha | Correto |

## Dead Letter Queue

As mensagens de vistoria de aparelhos portáteis passam por esta cadeia:

1. Fila `carbon-inspection-request-portable-device` (esta função): após 6 falhas, vão para a fila `carbon-inspection-fail-portable-device`.
2. Fila de fail: a função `carbon-inspection-fail-portable-device` envia um e-mail de erro e grava a mensagem, por código, em `carbon-inspection-request-portable-device-dead-letter`.
3. Se a lambda de fail falhar 10 vezes, a mensagem vai para `carbon-inspection-fail-portable-device-dead-letter`.

| Item | Valor |
|------|-------|
| Destino após 6 falhas | Fila de trabalho `carbon-inspection-fail-portable-device` |
| DLQ de mesmo nome da fila | `carbon-inspection-request-portable-device-dead-letter`, alimentada só por código |
| Visibility timeout x timeout | 120 s x 30 s (4 vezes) |

Configuração em `infra/modules/sqs-inspection-request/main.tf`.

## Divergências Terraform x Código

Nenhuma. O Terraform ativa a resposta de falha parcial e o handler devolve essa resposta.

## Problemas encontrados

### 1. Variáveis inexistentes na etapa do Google Analytics (Alta)

- O que acontece: o arquivo da etapa importa apenas `CONSTANT` e `service`, mas usa `factory` e `proposalId`, que não são declarados em nenhum lugar do módulo.

Trecho simplificado de `app-request/src/controller/activity/hubVendasCarbon/serviceConnector/googleAnalyticsActivity.js`:

```js
const CONSTANT = require('../../../../property')
const service = require('../../../../service')
// ...
const message = factory.googleAnalytics.getMessage(inputData, proposalId)
```

- Por que é um problema: quando a mensagem traz `integrationData.analytics`, essa linha lança `ReferenceError`. A essa altura a proposta já foi enviada ao produto e os dados de pagamento já foram gravados. A mensagem volta para a fila e é reprocessada até 6 vezes, reenviando a proposta a cada tentativa, e depois vai para a fila de fail, que manda ao cliente um e-mail de erro de vistoria, mesmo com a proposta registrada. A frequência depende de o produtor enviar os dados de tagueamento; o teste da função não cobre esse caso.
- Como corrigir: importar a factory (`require('../../../../factory')`) e usar `idTransaction` no lugar de `proposalId`. Também vale tratar essa etapa como opcional, como na função equivalente de celular, para que uma falha de tagueamento não reprocesse a proposta.
- Onde: `app-request/src/controller/activity/hubVendasCarbon/serviceConnector/googleAnalyticsActivity.js:16`

### 2. A DLQ da fila depende de código com erro ignorado (Média)

- O que acontece: a DLQ `carbon-inspection-request-portable-device-dead-letter` existe, mas não é o destino do redrive. As mensagens que falham vão para a fila de fail, e só chegam a essa DLQ se a lambda de fail conseguir gravá-las.
- Por que é um problema: a lambda de fail ignora o erro dessa gravação (ver relatório `carbon-inspection-fail-portable-device`). Se ela falhar, a mensagem some da cadeia sem cópia.
- Como corrigir: corrigir o tratamento de erro da lambda de fail, ou apontar o redrive para a DLQ e deixar o envio do e-mail para uma função que consome a DLQ.
- Onde: `infra/modules/sqs-inspection-request/main.tf:9-12`

### 3. Visibility timeout abaixo do recomendado (Média)

- O que acontece: a mensagem fica invisível por 120 s e a função pode executar por até 30 s (4 vezes).
- Por que é um problema: a AWS recomenda pelo menos 6 vezes para evitar reprocessamento durante as retentativas internas do gatilho, o que aqui reenviaria a proposta.
- Como corrigir: aumentar o visibility timeout para 180 s.
- Onde: `infra/modules/sqs-inspection-request/main.tf:7`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. A correção prioritária é a das variáveis inexistentes (problema 1), que causa reprocessamento e e-mail de erro indevido. Em seguida, rever a cadeia de falha (problema 2) e a configuração da fila.

## Observações

- O comportamento da layer `carbon-postponed-payment-data`, que grava os dados de pagamento, não está neste repositório. O código relança o erro que ela devolver.
- A função é executada por meio do wrapper de segurança Twistlock, que não está no repositório; considerou-se que ele repassa evento e resposta sem alteração.

# carbon-acq-service-order-customer-notify

> **Leitura rápida**
>
> |                          |                                                                          |
> | ------------------------ | ------------------------------------------------------------------------ |
> | Classificação            | ⚠️ ATENÇÃO                                                               |
> | Função AWS               | `carbon-acq-service-order-customer-notify`                               |
> | Código                   | `carbon-acquisition-service-provision-service-order-customer-notify/app` |
> | Função sistêmica         | Uma: consumidor SQS                                                      |
> | Retorno do handler       | Sempre `{ batchItemFailures }`                                           |
> | DLQ                      | Sim, `carbon-acq-service-order-customer-notify-dead-letter`              |
> | Quebrar em duas lambdas? | Não                                                                      |

**Caminho do código:** `carbon-acquisition-service-provision-service-order-customer-notify/app`
**Nome da função na AWS (Terraform):** `carbon-acq-service-order-customer-notify`
**Classificação:** ⚠️ ATENÇÃO

## Resumo

A lambda consome a fila `carbon-acq-service-order-customer-notify` (SNS `carbon-acq-service-order-requested` alimenta a fila). O código trata só SQS e devolve falha parcial. Timeout igual à visibility em hml/prd.

## Gatilhos no Terraform

| Tipo         | Recurso / Detalhe                                                                                                                                           | Arquivo:linha                                                                                                                                                                                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SQS          | fila `carbon-acq-service-order-customer-notify`, `ReportBatchItemFailures`, `batch_size` default 1, DLQ `-dead-letter`, `maxReceiveCount=5`, visibility 30s | `carbon-acquisition-service-provision-service-order-customer-notify/infra/locals.tf:6-7`; `carbon-acquisition-service-provision-service-order-customer-notify/infra/modules/lambda-event-source/main.tf:5-10`; `carbon-acquisition-service-provision-service-order-customer-notify/infra/modules/queue-dead-letter/main.tf:6` |
| SNS indireto | tópico default `carbon-acq-service-order-requested`                                                                                                         | `carbon-acquisition-service-provision-service-order-customer-notify/infra/variables.tf:30-33`                                                                                                                                                                                                                                 |
| Lambda       | timeout hml/prd=30, dev/poc=25                                                                                                                              | `carbon-acquisition-service-provision-service-order-customer-notify/infra/prd.tfvars:9-12`                                                                                                                                                                                                                                    |

## Eventos tratados no handler

| Tipo de evento     | Evidência no código                                                         | Arquivo:linha                                                                                    |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| SQS (envelope SNS) | `event.Records`, `record.body`, `.Message`, retorno `{ batchItemFailures }` | `carbon-acquisition-service-provision-service-order-customer-notify/app/index.js:5-12` e `42-46` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma de gatilho.

## Problemas encontrados

1. **Média** — hml/prd: timeout 30 = visibility 30. Evidência: `hml.tfvars:9-12`, `prd.tfvars:9-12`.

## Recomendação

Não separar. Aumentar visibility timeout da fila.

## Débitos técnicos

| Item                            | Evidência                            | Efeito                             |
| ------------------------------- | ------------------------------------ | ---------------------------------- |
| Timeout = visibility em hml/prd | `hml.tfvars:9-12`, `prd.tfvars:9-12` | Reentrega antes do fim da execução |

## Erros que acontecem ou podem acontecer

| Situação      | O que ocorre                                           | Evidência                     |
| ------------- | ------------------------------------------------------ | ----------------------------- |
| Falha de item | Retorno `{ batchItemFailures }`. Não fica `undefined`. | `app/index.js:42-46`          |
| JSON inválido | Item reportado via reject.                             | `app/index.js` catch do parse |
| DLQ           | Fila `-dead-letter`, `maxReceiveCount=5`.              | `queue-dead-letter/main.tf:6` |

## Oportunidades

Subir visibility timeout. Trace já vem do payload (`payload.carbonTraceId`), não repetir o bug de `messageAttributes` desta função.

## Melhorias identificadas

- Subir o visibility timeout acima de 30s em hml e prd.
- Manter o trace vindo de `payload.carbonTraceId`.
- Não repetir o bug de `messageAttributes` e não juntar com API.

## Observações

O trace id vem de `payload.carbonTraceId` no corpo, não de `messageAttributes`. Não encontrado API Gateway.

# carbon-acq-service-order-coupon-redeem

> **Leitura rápida**
>
> |                          |                                |
> | ------------------------ | ------------------------------ |
> | Classificação            | ⚠️ ATENÇÃO                     |
> | Função sistêmica         | Uma: consumidor SQS            |
> | Retorno                  | Sempre `{ batchItemFailures }` |
> | DLQ                      | Sim                            |
> | Quebrar em duas lambdas? | Não                            |

**Caminho do código:** `carbon-acquisition-service-provision-service-order-coupon-redeem/app`
**Nome da função na AWS (Terraform):** `carbon-acq-service-order-coupon-redeem`
**Classificação:** ⚠️ ATENÇÃO

## Resumo

A lambda trata mensagens SQS da fila `carbon-acq-service-order-coupon-redeem`, alimentada pelo tópico SNS `carbon-acq-service-order-requested` (subscription SQS, não invocação direta da lambda). O handler lê `event.Records` / `record.body` (envelope SNS) e devolve `batchItemFailures`. Não há API Gateway. Em hml e prd o timeout da lambda é igual ao visibility timeout da fila.

## Gatilhos no Terraform

| Tipo           | Recurso / Detalhe                                                                                                                                                                                                                                | Arquivo:linha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SQS            | fila `carbon-acq-service-order-coupon-redeem` (`batch_size` default 1, `ReportBatchItemFailures`, `maximum_concurrency` default 2). DLQ: sim, `carbon-acq-service-order-coupon-redeem-dead-letter`, `maxReceiveCount=5`. visibility: tfvars 30s. | `carbon-acquisition-service-provision-service-order-coupon-redeem/infra/locals.tf:5-6`; `carbon-acquisition-service-provision-service-order-coupon-redeem/infra/modules/queue/main.tf:5-10`; `carbon-acquisition-service-provision-service-order-coupon-redeem/infra/modules/queue-dead-letter/main.tf:5`; `carbon-acquisition-service-provision-service-order-coupon-redeem/infra/modules/lambda-event-source/main.tf:5-13`; `carbon-acquisition-service-provision-service-order-coupon-redeem/infra/main.tf:86-96` |
| SNS (indireto) | `aws_sns_topic_subscription` protocol `sqs` no tópico `carbon-acq-service-order-requested` apontando para a fila, não para a lambda                                                                                                              | `carbon-acquisition-service-provision-service-order-coupon-redeem/infra/modules/queue-topic-subscription/main.tf:5-10`; `carbon-acquisition-service-provision-service-order-coupon-redeem/infra/variables.tf:30-33`                                                                                                                                                                                                                                                                                                  |
| Lambda         | `timeout=var.lambda_timeout` (dev/poc=25, hml/prd=30)                                                                                                                                                                                            | `carbon-acquisition-service-provision-service-order-coupon-redeem/infra/main.tf:24`; `carbon-acquisition-service-provision-service-order-coupon-redeem/infra/hml.tfvars:10-13`; `carbon-acquisition-service-provision-service-order-coupon-redeem/infra/prd.tfvars:10-13`                                                                                                                                                                                                                                            |

## Eventos tratados no handler

| Tipo de evento                            | Evidência no código                                                                        | Arquivo:linha                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| SQS (corpo no formato de notificação SNS) | `event.Records`, `record.body`, `JSON.parse(...).Message`, retorno `{ batchItemFailures }` | `carbon-acquisition-service-provision-service-order-coupon-redeem/app/index.js:5-46` |

**Ramificação por tipo de evento no handler?** Não. Sempre assume `event.Records`.

## Divergências Terraform × Código

Nenhuma de tipo. Terraform liga SQS com `ReportBatchItemFailures` e o código reporta `batchItemFailures`. O SNS não invoca a lambda direto.

## Problemas encontrados

1. **Média** — Em hml e prd, `lambda_timeout` (30) é igual a `queue_visibility_timeout_seconds` (30). A mensagem pode voltar a ficar visível antes do fim da execução. Evidência: `hml.tfvars:10-13`, `prd.tfvars:10-13`. Em dev/poc o timeout é 25 e a visibility 30 (ainda folga pequena).

## Recomendação

Manter consumidor único de SQS. Aumentar `visibility_timeout_seconds` para ficar acima do timeout da lambda.

## Débitos técnicos

| Item                                       | Evidência                              | Efeito                                                     |
| ------------------------------------------ | -------------------------------------- | ---------------------------------------------------------- |
| Timeout = visibility em hml/prd            | `hml.tfvars:10-13`, `prd.tfvars:10-13` | Reentrega concorrente da mesma mensagem                    |
| Leitura de `messageAttributes` como string | `app/index.js:14-20`                   | `carbon-trace-id` do SQS (objeto `stringValue`) é ignorado |

## Erros que acontecem ou podem acontecer

| Situação                   | O que ocorre                                                                          | Evidência                                           |
| -------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Falha de item              | Entra em `batchItemFailures`. Não há retorno `undefined`.                             | `app/index.js:36-46`                                |
| JSON inválido              | Promise rejeitada e item reportado.                                                   | `app/index.js:27-29`                                |
| Após 5 recebimentos        | `maxReceiveCount=5` envia à DLQ `carbon-acq-service-order-coupon-redeem-dead-letter`. | `queue/main.tf:8-10`; `queue-dead-letter/main.tf:5` |
| Timeout igual à visibility | A mensagem pode voltar a ficar visível antes do fim. Segunda execução em paralelo.    | `prd.tfvars:10-13`                                  |

## Oportunidades

- Visibility maior que o timeout.
- Ler `messageAttributes['carbon-trace-id'].stringValue`.
- SNS continua só alimentando a fila. Não juntar com endpoint.

## Melhorias identificadas

- Aumentar o visibility timeout acima do timeout da lambda em hml e prd.
- Corrigir a leitura de `messageAttributes` para `.stringValue`.
- Manter DLQ e `batchItemFailures`. Não criar endpoint nesta função.

## Observações

- Não encontrado API Gateway neste stack (`infra/**/*.tf` não tem `aws_api_gateway_*` nas buscas de `http_method`/`function_name`).
- Não conferi o nome do handler no `aws_lambda_function` além de `function_name`; o pacote é o módulo `./modules/lambda` com `source` do app (padrão do módulo). Confirmei `function_name` em `locals.tf:6` e event source em `lambda-event-source/main.tf:8`.

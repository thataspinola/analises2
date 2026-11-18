# carbon-acq-service-order-checkin

> **Leitura rápida**
>
> |                          |                                                                  |
> | ------------------------ | ---------------------------------------------------------------- |
> | Classificação            | ⚠️ ATENÇÃO                                                       |
> | Função AWS               | `carbon-acq-service-order-checkin`                               |
> | Código                   | `carbon-acquisition-service-provision-service-order-checkin/app` |
> | Função sistêmica         | Uma: consumidor SQS (SNS só alimenta a fila)                     |
> | Retorno do handler       | Sempre `{ batchItemFailures }` — alinhado ao Terraform           |
> | DLQ                      | Sim, `carbon-acq-service-order-checkin-dead-letter`              |
> | Quebrar em duas lambdas? | Não                                                              |

**Caminho do código:** `carbon-acquisition-service-provision-service-order-checkin/app`
**Nome da função na AWS (Terraform):** `carbon-acq-service-order-checkin`
**Classificação:** ⚠️ ATENÇÃO

## Resumo

A lambda trata a fila SQS `carbon-acq-service-order-checkin`, assinada pelo tópico SNS `carbon-acq-service-order-requested`. O handler só lê `event.Records` e devolve `batchItemFailures`. Em hml/prd o timeout da lambda é igual ao visibility timeout.

## Gatilhos no Terraform

| Tipo         | Recurso / Detalhe                                                                                                                                                           | Arquivo:linha                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SQS          | fila `carbon-acq-service-order-checkin` (`batch_size` default 1, `ReportBatchItemFailures`). DLQ: sim, sufixo `-dead-letter`, `maxReceiveCount=5`. visibility tfvars = 30s. | `carbon-acquisition-service-provision-service-order-checkin/infra/locals.tf:5-6`; `carbon-acquisition-service-provision-service-order-checkin/infra/modules/lambda-event-source/main.tf:5-10`; `carbon-acquisition-service-provision-service-order-checkin/infra/modules/queue/main.tf:6-10`; `carbon-acquisition-service-provision-service-order-checkin/infra/modules/queue-dead-letter/main.tf:6` |
| SNS indireto | tópico `carbon-acq-service-order-requested` assina a fila, não a lambda                                                                                                     | `carbon-acquisition-service-provision-service-order-checkin/infra/variables.tf:36-39`                                                                                                                                                                                                                                                                                                                |
| Lambda       | timeout dev/poc=25, hml/prd=30                                                                                                                                              | `carbon-acquisition-service-provision-service-order-checkin/infra/hml.tfvars:10-13`; `carbon-acquisition-service-provision-service-order-checkin/infra/prd.tfvars:10-13`                                                                                                                                                                                                                             |

## Eventos tratados no handler

| Tipo de evento       | Evidência no código                                                                        | Arquivo:linha                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| SQS com envelope SNS | `event.Records`, `record.body`, `JSON.parse(...).Message`, retorno `{ batchItemFailures }` | `carbon-acquisition-service-provision-service-order-checkin/app/index.js:5-12` e `43-46` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma de tipo de gatilho. O contrato `ReportBatchItemFailures` é honrado.

## Problemas encontrados

1. **Média** — Em hml e prd, `lambda_timeout` (30) = `queue_visibility_timeout_seconds` (30). Evidência: `hml.tfvars:10-13`, `prd.tfvars:10-13`.
2. **Baixa** — `messageAttributes['carbon-trace-id']` é testado com `typeof === 'string'`. No SQS o atributo chega como objeto (`stringValue`), então o trace do atributo nunca é usado e cai no UUID. Evidência: `app/index.js:14-20`.

## Recomendação

Manter uma lambda só de fila. Subir o visibility timeout acima do timeout da lambda. Corrigir a leitura de `messageAttributes`.

## Débitos técnicos

| Item                               | Evidência                              | Efeito                      |
| ---------------------------------- | -------------------------------------- | --------------------------- |
| Timeout = visibility em hml/prd    | `hml.tfvars:10-13`, `prd.tfvars:10-13` | Reprocessamento concorrente |
| Atributo de trace lido como string | `app/index.js:14-20`                   | Trace do SQS ignorado       |

## Erros que acontecem ou podem acontecer

| Situação             | O que ocorre                                                         | Evidência                                                          |
| -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Falha de item        | `batchItemFailures` com `messageId`. Contrato do Terraform cumprido. | `app/index.js:43-46`; `lambda-event-source/main.tf:9`              |
| JSON inválido        | Promise rejeitada e item reportado.                                  | `app/index.js` catch interno                                       |
| 5 recebimentos       | DLQ `carbon-acq-service-order-checkin-dead-letter`.                  | `queue/main.tf` `maxReceiveCount=5`; `queue-dead-letter/main.tf:6` |
| Visibility estourada | Segunda invocação da mesma mensagem.                                 | `prd.tfvars:10-13`                                                 |

## Oportunidades

Aumentar visibility e ler `.stringValue`. Não unir com API.

## Melhorias identificadas

- Aumentar o visibility timeout acima do timeout da lambda em hml e prd (hoje 30s = 30s).
- Ler `messageAttributes['carbon-trace-id'].stringValue`, não comparar o atributo com `typeof === 'string'`.
- Manter o retorno `batchItemFailures`. Não unir com API.

## Observações

Não encontrado API Gateway neste stack.

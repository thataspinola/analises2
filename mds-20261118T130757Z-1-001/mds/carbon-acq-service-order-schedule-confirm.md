# carbon-acq-service-order-schedule-confirm

> **Leitura rápida**
>
> |                          |                                                                           |
> | ------------------------ | ------------------------------------------------------------------------- |
> | Classificação            | ⚠️ ATENÇÃO                                                                |
> | Função AWS               | `carbon-acq-service-order-schedule-confirm`                               |
> | Código                   | `carbon-acquisition-service-provision-service-order-schedule-confirm/app` |
> | Função sistêmica         | Uma: consumidor SQS                                                       |
> | Retorno do handler       | Sempre `{ batchItemFailures }`                                            |
> | DLQ                      | Sim, sufixo `-dead-letter`                                                |
> | Quebrar em duas lambdas? | Não                                                                       |

**Caminho do código:** `carbon-acquisition-service-provision-service-order-schedule-confirm/app`
**Nome da função na AWS (Terraform):** `carbon-acq-service-order-schedule-confirm`
**Classificação:** ⚠️ ATENÇÃO

## Resumo

A lambda consome a fila `carbon-acq-service-order-schedule-confirm` (SNS `carbon-acq-service-order-requested` na fila, não na lambda). Código e Terraform concordam em SQS com falha parcial. Timeout igual à visibility em hml/prd.

## Gatilhos no Terraform

| Tipo         | Recurso / Detalhe                                                                                                                                     | Arquivo:linha                                                                                                                                                                                                                                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SQS          | fila `carbon-acq-service-order-schedule-confirm`, `ReportBatchItemFailures`, batch default 1, DLQ `-dead-letter`, `maxReceiveCount=5`, visibility 30s | `carbon-acquisition-service-provision-service-order-schedule-confirm/infra/locals.tf:5-6`; `carbon-acquisition-service-provision-service-order-schedule-confirm/infra/modules/lambda-event-source/main.tf:5-10`; `carbon-acquisition-service-provision-service-order-schedule-confirm/infra/modules/queue-dead-letter/main.tf:6` |
| SNS indireto | tópico default `carbon-acq-service-order-requested`                                                                                                   | `carbon-acquisition-service-provision-service-order-schedule-confirm/infra/variables.tf:30-33`                                                                                                                                                                                                                                   |
| Lambda       | timeout hml/prd=30                                                                                                                                    | `carbon-acquisition-service-provision-service-order-schedule-confirm/infra/prd.tfvars:10-13`                                                                                                                                                                                                                                     |

## Eventos tratados no handler

| Tipo de evento     | Evidência no código                                                         | Arquivo:linha                                                                                     |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| SQS (envelope SNS) | `event.Records`, `record.body`, `.Message`, retorno `{ batchItemFailures }` | `carbon-acquisition-service-provision-service-order-schedule-confirm/app/index.js:5-12` e `43-46` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma de gatilho.

## Problemas encontrados

1. **Média** — hml/prd: timeout 30 = visibility 30. Evidência: `hml.tfvars:10-13`, `prd.tfvars:10-13`.
2. **Baixa** — `messageAttributes['carbon-trace-id']` comparado com `typeof === 'string'` não lê o formato real do SQS. Evidência: `app/index.js:14-20`.

## Recomendação

Não separar. Aumentar visibility timeout e corrigir atributos da mensagem.

## Débitos técnicos

| Item                            | Evidência                              | Efeito                            |
| ------------------------------- | -------------------------------------- | --------------------------------- |
| Timeout = visibility hml/prd    | `hml.tfvars:10-13`, `prd.tfvars:10-13` | Reprocessamento concorrente       |
| `messageAttributes` como string | `app/index.js:14-20`                   | Trace do atributo SQS nunca usado |

## Erros que acontecem ou podem acontecer

| Situação                    | O que ocorre                         | Evidência                     |
| --------------------------- | ------------------------------------ | ----------------------------- |
| Falha de item               | Retorno `{ batchItemFailures }`.     | `app/index.js:43-46`          |
| DLQ                         | `-dead-letter`, `maxReceiveCount=5`. | `queue-dead-letter/main.tf:6` |
| Visibility igual ao timeout | Segunda execução da mesma mensagem.  | `prd.tfvars:10-13`            |

## Oportunidades

Mesmo ajuste das outras filas de service-order: visibility maior e `.stringValue`.

## Melhorias identificadas

- Subir visibility timeout acima do timeout em hml e prd.
- Ler `.stringValue` do atributo `carbon-trace-id`.
- Manter uma lambda só de fila.

## Observações

Não encontrado API Gateway neste stack.

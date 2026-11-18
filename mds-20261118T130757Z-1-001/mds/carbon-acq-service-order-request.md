# carbon-acq-service-order-request

> **Leitura rápida**
>
> |                          |                                                                                         |
> | ------------------------ | --------------------------------------------------------------------------------------- |
> | Classificação            | ⚠️ ATENÇÃO                                                                              |
> | Função AWS               | `carbon-acq-service-order-request`                                                      |
> | Código                   | `carbon-acquisition-service-provision-service-order-request/app-process`                |
> | Função sistêmica         | Uma: consumidor SQS. A vizinha `carbon-acq-service-order-failed-request` é outra lambda |
> | Retorno do handler       | Sempre `{ batchItemFailures }`                                                          |
> | DLQ                      | Sim: fila `carbon-acq-service-order-failed-request`                                     |
> | Quebrar em duas lambdas? | Já está separado do consumidor da DLQ. Não misturar com API                             |

**Caminho do código:** `carbon-acquisition-service-provision-service-order-request/app-process`
**Nome da função na AWS (Terraform):** `carbon-acq-service-order-request`
**Classificação:** ⚠️ ATENÇÃO

## Resumo

A lambda `carbon-acq-service-order-request` só consome a fila de mesmo nome e devolve `batchItemFailures`. A DLQ tem consumidor próprio (`app-failed-request`). Não há API Gateway nesta função. Em prd o timeout é igual à visibility.

## Gatilhos no Terraform

| Tipo                      | Recurso / Detalhe                                                                                                                                                           | Arquivo:linha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SQS                       | fila `carbon-acq-service-order-request`, mapping com `ReportBatchItemFailures`. DLQ: sim, ARN de `module.failed_request_queue` (`carbon-acq-service-order-failed-request`). | `carbon-acquisition-service-provision-service-order-request/infra/modules/request-lambda/variables.tf:7-10`; `carbon-acquisition-service-provision-service-order-request/infra/modules/request-queue/variables.tf:4-6`; `carbon-acquisition-service-provision-service-order-request/infra/modules/request-queue/main.tf:5-10`; `carbon-acquisition-service-provision-service-order-request/infra/modules/request-lambda-event-source/main.tf:5-9`; `carbon-acquisition-service-provision-service-order-request/infra/main.tf:24-30` e `140` |
| Lambda vizinha (não esta) | `carbon-acq-service-order-failed-request` consome a DLQ, pacote `app-failed-request`                                                                                        | `carbon-acquisition-service-provision-service-order-request/infra/modules/failed-request-lambda/variables.tf:7-10`; `carbon-acquisition-service-provision-service-order-request/infra/main.tf:163`                                                                                                                                                                                                                                                                                                                                          |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                                                 | Arquivo:linha                                                                                   |
| -------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| SQS            | `event.Records`, `record.body`, `record.messageId`, retorno `{ batchItemFailures }` | `carbon-acquisition-service-provision-service-order-request/app-process/index.js:5-8` e `52-55` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma de tipo. Pacote da função pedida é o módulo `request-lambda` (não o `failed-request-lambda`).

## Problemas encontrados

1. **Média** — prd: `lambda_timeout=30` e `queue_message_visibility_timeout_seconds=30`. Evidência: `infra/prd.tfvars:11-14`. dev fica 29 vs 30 (`dev.tfvars:11-14`), folga mínima.
2. **Baixa** — A DLQ não tem segunda DLQ. Se `app-failed-request` falhar, a mensagem fica na mesma fila até o retention. Isso é da lambda vizinha, não desta. Evidência: `failed-request-queue/main.tf:5-8` não tem `redrive_policy`.

## Recomendação

Não unir com endpoint. Só ajustar visibility timeout. O padrão de duas lambdas (processo e falha) já está correto.

## Débitos técnicos

| Item                     | Evidência                                               | Efeito                                                               |
| ------------------------ | ------------------------------------------------------- | -------------------------------------------------------------------- |
| prd timeout = visibility | `prd.tfvars:11-14` (30 e 30)                            | Reentrega concorrente                                                |
| DLQ sem segunda DLQ      | `failed-request-queue/main.tf:5-8` sem `redrive_policy` | Se a lambda da DLQ falhar, a mensagem permanece nela até o retention |

## Erros que acontecem ou podem acontecer

| Situação                  | O que ocorre                                                                             | Evidência                                                               |
| ------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Falha de processamento    | `batchItemFailures` e log de reprocessamento.                                            | `app-process/index.js:44-55`                                            |
| JSON inválido             | Reject e item na lista de falhas.                                                        | `app-process/index.js:28-31`                                            |
| Estoura `maxReceiveCount` | Mensagem vai para `carbon-acq-service-order-failed-request`, consumida por outra lambda. | `request-queue/main.tf:5-10`; `failed-request-lambda/variables.tf:7-10` |

## Oportunidades

O split processo/falha já existe. Não criar endpoint nesta lambda. Só ajustar visibility.

## Melhorias identificadas

- Em prd, visibility precisa ser maior que o timeout (hoje os dois são 30s).
- O split processo / falha já existe (`app-process` e `app-failed-request`). Não criar endpoint nesta lambda.
- Avaliar segunda redrive só na fila da lambda vizinha de falha, se o time quiser esgotar mensagens que a DLQ não consegue processar.

## Observações

Não encontrado `aws_api_gateway_*` ligado a `carbon-acq-service-order-request`. Procurei nos módulos `request-lambda-event-source` e `main.tf`.

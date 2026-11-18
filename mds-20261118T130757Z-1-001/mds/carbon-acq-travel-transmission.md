# carbon-acq-travel-transmission

> **Leitura rápida**
>
> |                          |                                                   |
> | ------------------------ | ------------------------------------------------- |
> | Classificação            | ✅ OK                                             |
> | Função AWS               | `carbon-acq-travel-transmission`                  |
> | Código                   | `carbon-payments-transmission-travel/app`         |
> | Função sistêmica         | Uma: consumidor SQS                               |
> | Retorno do handler       | Sempre `{ batchItemFailures }`                    |
> | DLQ                      | Sim, `carbon-acq-travel-transmission-dead-letter` |
> | Quebrar em duas lambdas? | Não                                               |

**Caminho do código:** `carbon-payments-transmission-travel/app`
**Nome da função na AWS (Terraform):** `carbon-acq-travel-transmission`
**Classificação:** ✅ OK

## Resumo

A lambda consome a fila SQS `carbon-acq-travel-transmission` (nome = `project_name`) e devolve falha parcial. O tópico SNS `carbon-approved-payments` publica na fila; não invoca a lambda. Visibility (300s) fica acima do timeout (60s). Há DLQ.

## Gatilhos no Terraform

| Tipo         | Recurso / Detalhe                                                                                                                                                                                                                   | Arquivo:linha                                                                                                                                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SQS          | fila `carbon-acq-travel-transmission`, mapping `batch_size=1`, `ReportBatchItemFailures`, `maximum_concurrency=2`. DLQ: sim, `${project_name}-dead-letter`, `maxReceiveCount=var.max_retry_lambda` (dev=2, prd=5). visibility=300s. | `carbon-payments-transmission-travel/infra/variables.tf:12-14`; `carbon-payments-transmission-travel/infra/modules/lambda/main.tf:112-119`; `carbon-payments-transmission-travel/infra/modules/sqs/main.tf:5-20`; `carbon-payments-transmission-travel/infra/prd.tfvars:8-12` |
| SNS indireto | `approved_payments_sns_name` default de uso `carbon-approved-payments` vai para a fila                                                                                                                                              | `carbon-payments-transmission-travel/infra/main.tf:31` e `40`; `carbon-payments-transmission-travel/infra/prd.tfvars:16`                                                                                                                                                      |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                                                 | Arquivo:linha                                           |
| -------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------- |
| SQS            | `event.Records`, `record.body`, `record.messageId`, retorno `{ batchItemFailures }` | `carbon-payments-transmission-travel/app/index.js:5-33` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma de gatilho. `var.default_batch_size` (10) é passado ao módulo SQS, mas o event source mapping fixa `batch_size = 1` (`lambda/main.tf:117`). O código aguenta lote; o mapping efetivo é 1.

## Problemas encontrados

1. **Baixa** — Variável de batch (10) não é a usada no mapping (1). Não quebra o contrato de retorno. Evidência: `variables.tf:18-20` vs `lambda/main.tf:117`.

## Recomendação

Nenhuma separação. Opcional: usar a variável de batch no mapping para não haver dois números.

## Débitos técnicos

| Item                                         | Evidência                                          | Efeito                                           |
| -------------------------------------------- | -------------------------------------------------- | ------------------------------------------------ |
| `default_batch_size=10` não usado no mapping | mapping fixa `batch_size=1` (`lambda/main.tf:117`) | Dois números de lote no Terraform; o efetivo é 1 |

DLQ existe (`sqs/main.tf:8-20`). Visibility 300 > timeout 60 (`prd.tfvars:8-12`).

## Erros que acontecem ou podem acontecer

| Situação                     | O que ocorre                                      | Evidência                            |
| ---------------------------- | ------------------------------------------------- | ------------------------------------ |
| Parse ou processamento falha | Item vai para `batchItemFailures`.                | `app/index.js:14-33`                 |
| Após `max_retry_lambda`      | DLQ `carbon-acq-travel-transmission-dead-letter`. | `sqs/main.tf:16-20`; `prd.tfvars:12` |

## Oportunidades

Usar a variável de batch no mapping ou apagá-la. Não juntar com API.

## Melhorias identificadas

- Usar `default_batch_size` no event source mapping ou apagar a variável, porque o mapping efetivo está fixo em 1.
- Manter visibility 300s acima do timeout 60s e a DLQ.
- Não juntar esta fila com um endpoint.

## Observações

Não encontrado API Gateway neste stack. Procurei `infra/main.tf` e `infra/modules/lambda/main.tf`.

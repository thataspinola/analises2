# carbon-otp-sender

> **Leitura rápida**
>
> |                          |                                |
> | ------------------------ | ------------------------------ |
> | Classificação            | ⚠️ ATENÇÃO                     |
> | Função sistêmica         | Uma: consumidor SQS            |
> | Retorno                  | Sempre `{ batchItemFailures }` |
> | DLQ                      | Sim                            |
> | Quebrar em duas lambdas? | Não                            |

**Caminho do código:** `carbon-auth-guest-auth-verification/app-otp-sender`
**Nome da função na AWS (Terraform):** `carbon-otp-sender`
**Classificação:** ⚠️ ATENÇÃO

## Resumo

A lambda `carbon-otp-sender` trata mensagens SQS da fila `carbon-auth-otp-send-sms-requests`, com event source mapping e `ReportBatchItemFailures`. O handler só lê `event.Records` / `record.body` e devolve `batchItemFailures`. O API Gateway do mesmo stack está ligado às lambdas de request e check, não a esta. Problema secundário: timeout da lambda é maior ou igual ao `visibility_timeout` da fila em todos os tfvars (em prd, 90s contra 14s).

## Gatilhos no Terraform

| Tipo   | Recurso / Detalhe                                                                                                                                                                                                                                                                                                                                                                      | Arquivo:linha                                                                                                                                                                                                                                                                                                           |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SQS    | fila `carbon-auth-otp-send-sms-requests` (`batch_size=1`, `function_response_types=["ReportBatchItemFailures"]`, `maximum_concurrency=2`). DLQ: sim, `carbon-auth-otp-send-sms-requests-dead-letter`, `maxReceiveCount=2`. `visibility_timeout_seconds` = tfvars (`dev`/`hml`=60, `poc`=90, `prd`=14). Função: `module.sender_lambda.lambda_function_name`. Pacote: `app-otp-sender/`. | `carbon-auth-guest-auth-verification/infra/main.tf:153-180`; `carbon-auth-guest-auth-verification/infra/modules/sender-lambda-event-source/main.tf:5-14`; `carbon-auth-guest-auth-verification/infra/modules/sender-queue/main.tf:5-27`; `carbon-auth-guest-auth-verification/infra/modules/sender-lambda/main.tf:7,25` |
| Lambda | `handler=index.handler`, `runtime=nodejs20.x`, `timeout=var.lambda_timeout_sender` (`dev`/`hml`=120, `poc`/`prd`=90)                                                                                                                                                                                                                                                                   | `carbon-auth-guest-auth-verification/infra/modules/sender-lambda/main.tf:24-36`; `carbon-auth-guest-auth-verification/infra/dev.tfvars:14`; `carbon-auth-guest-auth-verification/infra/prd.tfvars:14-16`                                                                                                                |

API Gateway (`module.gateway`) recebe apenas `request_lambda_invoke_arn` e `check_lambda_invoke_arn` (`infra/main.tf:16-29`). Não encontrado `aws_lambda_permission` para `carbon-otp-sender`.

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                                                 | Arquivo:linha                                                      |
| -------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| SQS            | `event.Records`, `record.body`, `record.messageId`, retorno `{ batchItemFailures }` | `carbon-auth-guest-auth-verification/app-otp-sender/index.js:5-31` |

**Ramificação por tipo de evento no handler?** Não. Não há checagem de `httpMethod`, `eventSource` ou `else` para outro tipo.

## Divergências Terraform × Código

Nenhuma de tipo de gatilho. Terraform liga SQS com `ReportBatchItemFailures` e o código devolve `batchItemFailures`.

## Problemas encontrados

1. **Alta (prd) / Média (demais)** — Timeout da lambda ≥ visibility timeout da fila, risco de reprocessamento concorrente da mesma mensagem. Evidência: `dev.tfvars:14-16` (120 vs 60), `hml.tfvars:14-16` (120 vs 60), `poc.tfvars:14-16` (90 vs 90), `prd.tfvars:14-16` (90 vs 14). Timeout aplicado em `sender-lambda/main.tf:36` via `var.lambda_timeout_sender` (`main.tf:124`).
2. **Baixa** — `src/factory/responseFactory.js` monta objetos com `statusCode` (200/400/500), formato de API, sem uso no handler. Não é ramificação de evento. Evidência: `app-otp-sender/src/factory/responseFactory.js:3,18,34`.

## Recomendação

Nenhuma separação de gatilhos. Ajustar `visibility_timeout_seconds` para ficar acima do timeout da lambda (recomendação AWS: pelo menos 6x o timeout, ou no mínimo maior que o timeout) em todos os ambientes, em especial prd.

## Débitos técnicos

| Item                                 | Evidência                                                     | Efeito                                                            |
| ------------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| Visibility menor ou igual ao timeout | `dev.tfvars:14-16` (120 vs 60), `prd.tfvars:14-16` (90 vs 14) | Mensagem pode ser entregue de novo enquanto a execução ainda roda |
| Factory HTTP sem uso no handler      | `responseFactory.js:3,18,34`                                  | Código morto de contrato de API                                   |

## Erros que acontecem ou podem acontecer

| Situação                             | O que ocorre                                                                                                                    | Evidência                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Falha ao processar um record         | `Promise.allSettled` marca o `messageId` em `batchItemFailures`. Com `ReportBatchItemFailures`, só esse item volta para a fila. | `app-otp-sender/index.js:20-31`; `sender-lambda-event-source/main.tf:9` |
| JSON inválido no body                | O `catch` interno rejeita a promise; o item entra em `batchItemFailures`. Não fica retorno `undefined`.                         | `index.js:13-16`                                                        |
| Timeout maior que a visibility (prd) | A fila pode reentregar a mesma mensagem antes da lambda terminar. Risco de SMS/e-mail duplicado.                                | `prd.tfvars:14-16`                                                      |
| Após `maxReceiveCount=2`             | Mensagem vai para `carbon-auth-otp-send-sms-requests-dead-letter`.                                                              | `sender-queue/main.tf:8-10`                                             |

## Oportunidades

- Subir `visibility_timeout_seconds` acima do timeout (em prd, 14s é insuficiente para timeout 90s).
- Remover ou isolar `responseFactory` se nenhum caller de API usar esta lambda.
- Não separar gatilho: só há SQS.

## Melhorias identificadas

- Subir `visibility_timeout_seconds` acima do timeout da lambda em todos os ambientes. Em prd, 14s contra timeout de 90s é o caso mais grave.
- Remover ou isolar `responseFactory` (contrato HTTP) que esta lambda de fila não usa.
- Manter uma lambda só de SQS. Não juntar com o OTP request/check.

## Observações

- A lambda publica em outra fila (`CARBON_EMAIL_SENDER_QUEUE_URL` = `carbon-service-connector-email-sender`, `main.tf:141`), mas isso é destino de saída, não gatilho desta função.
- Não encontrado gatilho de API Gateway, SNS, EventBridge ou S3 para `carbon-otp-sender`. Procurei em `carbon-auth-guest-auth-verification/infra/**/*.tf`.

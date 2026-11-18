# Resumo da auditoria de lambdas

> **Item 2 corrigido no código (18/11/2026):** fila OTP com visibilidade de 720 s em DEV/HML e 540 s em POC/PRD, proteção de seis vezes o timeout e 15 testes da política passando. Validação AWS pendente. [Detalhes](../../docs/fixes/02-otp-sender-visibility.md). A tabela original abaixo preserva o diagnóstico anterior.

> **Item 1 corrigido no código (18/11/2026):** abandono de cotação passa a reportar o checkpoint com falha ao DynamoDB Stream. As linhas da tabela abaixo são o diagnóstico original. [Validação e limitações](../../docs/fixes/01-abandoned-quotation-stream.md). O acompanhamento dos demais itens está nas notas de atualização.

> Nenhuma lambda desta lista está ao mesmo tempo no API Gateway e numa fila SQS.
> O anti-padrão do Tech Lead **não apareceu** nos nomes que existem no repositório.
> Há nomes da lista que **não são lambda** aqui, timeouts de fila apertados, e retornos que não cumprem o contrato (HTTP ou `batchItemFailures`).

## Como ler

| Selo            | Significado                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------- |
| ❌ PROBLEMA     | Dois tipos de gatilho na mesma lambda, ou Terraform e código discordam do tipo              |
| ⚠️ ATENÇÃO      | Um gatilho só, com bug secundário (timeout ≥ visibility, retorno errado, DLQ, nome confuso) |
| ❓ INCONCLUSIVO | A lambda pedida não está no repositório                                                     |
| ✅ OK           | Um gatilho, código trata só esse tipo, retorno coerente                                     |

Critérios extras pedidos na revisão: mais de uma função sistêmica (separar lambdas), retorno `undefined`/`null` ou ausência de `throw`/`batchItemFailures`, fila sem DLQ, bugs de oportunidade.

Cada relatório de lambda tem, imediatamente antes de Observações:

- Débitos técnicos
- Erros que acontecem ou podem acontecer
- Oportunidades
- Melhorias identificadas

A tabela abaixo é o índice. O detalhe com arquivo e linha está no MD de cada função.

## Tabela

| Lambda                                                  | Gatilhos (Terraform)                                                                                 | Eventos no código                                                     | Classificação   | Problema principal                                     |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------- | ------------------------------------------------------ |
| carbon-support-abandoned-quotation                      | DynamoDB Stream `carbon-lead-in-progress` (`ReportBatchItemFailures`)                                | Stream (`record.dynamodb`) mas devolve `{ statusCode }` e engole erro | ⚠️ ATENÇÃO      | Não devolve `batchItemFailures` nem faz `throw`        |
| carbon-otp-sender                                       | SQS `carbon-auth-otp-send-sms-requests` + DLQ                                                        | SQS + `batchItemFailures`                                             | ⚠️ ATENÇÃO      | Timeout da lambda ≥ visibility (prd 90s vs 14s)        |
| carbon-acq-residential-transmission                     | Não é lambda. Fila é só destino de `carbon-acq-transmission`                                         | API `POST /transmission` publica na fila                              | ❓ INCONCLUSIVO | Nome não existe como função                            |
| carbon-acq-sp-auto-shop-repair-appointment-search       | Não encontrado                                                                                       | Não encontrado                                                        | ❓ INCONCLUSIVO | Nome ausente. Vizinha é GET de disponibilidade         |
| carbon-acq-sp-auto-shop-repair-appointments-create      | Não encontrado                                                                                       | Não encontrado                                                        | ❓ INCONCLUSIVO | Nome ausente na pasta                                  |
| carbon-acq-sp-auto-shop-repair-search-caps-id           | Não encontrado                                                                                       | Não encontrado                                                        | ❓ INCONCLUSIVO | Nome ausente. Não herda gatilho da vizinha             |
| carbon-sup-sp-auto-shop-repair-vehicle-search           | Não encontrado                                                                                       | Não encontrado                                                        | ❓ INCONCLUSIVO | Nome ausente no workspace                              |
| carbon-acquisition-travel-proposal                      | Não é lambda. Step Function + `POST proposal/travel` + `sendMessage` em `carbon-support-update-lead` | Sem handler                                                           | ❓ INCONCLUSIVO | Pasta sem lambda. Fallback de SQS engole erro          |
| carbon-acq-service-order-checkin                        | SQS + DLQ. SNS só na fila                                                                            | SQS + `batchItemFailures`                                             | ⚠️ ATENÇÃO      | hml/prd timeout = visibility (30s)                     |
| carbon-acq-service-order-coupon-redeem                  | SQS + DLQ. SNS só na fila                                                                            | SQS + `batchItemFailures`                                             | ⚠️ ATENÇÃO      | hml/prd timeout = visibility (30s)                     |
| carbon-acq-service-order-customer-notify                | SQS + DLQ. SNS só na fila                                                                            | SQS + `batchItemFailures`                                             | ⚠️ ATENÇÃO      | hml/prd timeout = visibility (30s)                     |
| carbon-acq-service-order-request                        | SQS + DLQ (`failed-request`)                                                                         | SQS + `batchItemFailures`                                             | ⚠️ ATENÇÃO      | prd timeout = visibility (30s)                         |
| carbon-acq-service-order-schedule-confirm               | SQS + DLQ. SNS só na fila                                                                            | SQS + `batchItemFailures`                                             | ⚠️ ATENÇÃO      | hml/prd timeout = visibility (30s)                     |
| carbon-acquisition-life-quotation                       | API `POST quotation/life`                                                                            | `event.body`                                                          | ⚠️ ATENÇÃO      | `error` não importado: body inválido não vira HTTP 400 |
| carbon-support-income-bracket-life                      | API `GET income-bracket/life`                                                                        | Não lê o event; sucesso 200                                           | ⚠️ ATENÇÃO      | Erro faz `throw` e não devolve `{ statusCode }`        |
| carbon-acquisition-petlove-proposal                     | API `POST acquisition/petlove/proposal`                                                              | `event.body`                                                          | ✅ OK           | Nenhum                                                 |
| carbon-marketing-optin-status                           | API `POST marketing-optin-status` (pasta real: consent, não e-mail)                                  | `event.body`                                                          | ✅ OK           | Nenhum de gatilho                                      |
| carbon-acq-sp-auto-shop-repair-appointments-search-caps | API `POST` search-caps                                                                               | `event.body`                                                          | ✅ OK           | Nenhum                                                 |
| carbon-acq-service-order-availability                   | API `POST acquisition/service-order-availability`                                                    | `event.body`                                                          | ✅ OK           | Nenhum                                                 |
| carbon-acq-services-proposal                            | API `POST acquisition/service-provision/proposal`                                                    | `event.body`                                                          | ✅ OK           | Nenhum                                                 |
| carbon-service-provision-search-products                | API `ANY service-provision/search-products`                                                          | GET e POST HTTP                                                       | ✅ OK           | `switch` é de método, não de fila                      |
| carbon-acq-travel-transmission                          | SQS + DLQ. SNS `carbon-approved-payments` na fila                                                    | SQS + `batchItemFailures`                                             | ✅ OK           | Visibility 300s > timeout 60s                          |
| carbon-acquisition-travel-quotation                     | API `POST quotation/travel`                                                                          | `event.body`                                                          | ✅ OK           | Nenhum                                                 |
| carbon-acq-life-proposal-confirmation                   | API `POST proposal-confirmation/life`                                                                | `event.body`                                                          | ✅ OK           | Nenhum                                                 |
| carbon-acq-life-proposal-opening                        | API `POST proposal-opening/life`                                                                     | `event.body`                                                          | ✅ OK           | Nenhum                                                 |

## O que não achamos

> Nenhuma função da lista tem `if (event.Records)` no mesmo handler que também lê `event.httpMethod` / `event.body` de API.
> Nenhuma fila ligada a estas lambdas ficou sem `redrive_policy`, exceto a DLQ em si (`carbon-acq-service-order-failed-request`), que é o destino final.

## Melhorias identificadas

- Corrigir o contrato de falha de `carbon-support-abandoned-quotation` (`batchItemFailures` ou `throw`).
- Subir visibility timeout acima do timeout: otp-sender (prd 14s vs 90s) e as filas de service-order em hml/prd.
- Ler `messageAttributes` como objeto (`.stringValue`) em checkin, schedule-confirm e coupon-redeem.
- Importar `error` em life-quotation e capturar erro HTTP em income-bracket-life.
- Fazer a Step Function de travel-proposal falhar quando o SQS falhar.
- Não atribuir gatilho da pasta vizinha aos nomes inconclusivos.
- Manter uma lambda por gatilho. O split request / failed-request já é o modelo certo.

## Bugs e oportunidades que valem o lote

| Tema                                                 | Onde                                                                                                               | O que fazer                                                                                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Contrato de falha de lote                            | `carbon-support-abandoned-quotation`                                                                               | Terraform pede `ReportBatchItemFailures` e o código devolve `statusCode` sem `throw`. Ou devolver `batchItemFailures`, ou relançar o erro. |
| Timeout ≥ visibility                                 | otp-sender (prd grave); checkin, coupon-redeem, customer-notify, schedule-confirm, request                         | Visibility precisa ser maior que o timeout.                                                                                                |
| `messageAttributes` como string                      | checkin, schedule-confirm, coupon-redeem                                                                           | Atributo SQS é `{ stringValue, dataType }`. O `typeof === 'string'` nunca casa.                                                            |
| `error` sem import                                   | life-quotation                                                                                                     | Body inválido vira `ReferenceError` e a API não recebe 400.                                                                                |
| Handler sem `catch`                                  | income-bracket-life                                                                                                | Erro externo não vira `{ statusCode, body }`.                                                                                              |
| Step Function engole SQS                             | travel-proposal                                                                                                    | Estado `Fallback SQS Update Lead` termina com texto fixo.                                                                                  |
| Nomes da lista sem função                            | residential-transmission, appointment-search, appointments-create, search-caps-id, vehicle-search, travel-proposal | Não atribuir gatilho da pasta vizinha.                                                                                                     |
| Pasta errada na lista                                | marketing-optin-status                                                                                             | Função está em `carbon-registration-consent-marketing-optin-status`, não em e-mail notification.                                           |
| Duas funções no mesmo fluxo, mas não na mesma lambda | service-order-request + failed-request; transmission publica em fila e não consome                                 | Modelo certo: uma lambda por gatilho. Não juntar endpoint e fila.                                                                          |

# carbon-marketing-optin-status

> **Leitura rápida**
>
> |                          |                               |
> | ------------------------ | ----------------------------- |
> | Classificação            | ✅ OK                         |
> | Função sistêmica         | Uma: API Gateway POST         |
> | Retorno                  | Sempre `{ statusCode, body }` |
> | DLQ                      | Não se aplica                 |
> | Quebrar em duas lambdas? | Não                           |

**Caminho do código:** `carbon-registration-consent-marketing-optin-status/app`
**Nome da função na AWS (Terraform):** `carbon-marketing-optin-status` (`var.project_name`, default em `carbon-registration-consent-marketing-optin-status/infra/variables.tf:22`)
**Classificação:** ✅ OK

## Resumo

A lambda `carbon-marketing-optin-status` trata `POST` no recurso raiz da API REST privada `carbon-marketing-optin-status-gateway`, com custom domain path `marketing-optin-status`. O handler lê `event.body` e devolve `{ statusCode, body, headers }`. Não há SQS nem ramificação por tipo de evento.

## Gatilhos no Terraform

| Tipo             | Recurso / Detalhe                                                                                                                                                                                                                                             | Arquivo:linha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| API Gateway REST | `POST /` (root) na API `carbon-marketing-optin-status-gateway`, stage `v1`, integração proxy. Custom domain path `marketing-optin-status`. Permission `principal=apigateway.amazonaws.com` na função `module.lambda.lambda_function_name`. Pacote: `../app/`. | `carbon-registration-consent-marketing-optin-status/infra/modules/api-gateway/main.tf:5-36`; `carbon-registration-consent-marketing-optin-status/infra/variables.tf:6-23`; `carbon-registration-consent-marketing-optin-status/infra/main.tf:44-46`; `carbon-registration-consent-marketing-optin-status/infra/modules/lambda-event-source/main.tf:5-10`; `carbon-registration-consent-marketing-optin-status/infra/modules/lambda/main.tf:5-8`; `carbon-registration-consent-marketing-optin-status/infra/modules/lambda/datasource.tf:7` |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                                                     | Arquivo:linha                                                           |
| -------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| API Gateway    | `event.body` como string JSON; retorno `{ isBase64Encoded, headers, statusCode, body }` | `carbon-registration-consent-marketing-optin-status/app/index.js:14-64` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma de tipo de gatilho.

## Problemas encontrados

Nenhum relacionado a múltiplos gatilhos.

## Recomendação

Nenhuma ação necessária.

## Débitos técnicos

| Item                                                           | Evidência                                                           | Efeito                                                                                                   |
| -------------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `source_arn` da permission sem `/` entre execution ARN e stage | `lambda-event-source/main.tf:10`                                    | A permissão pode não casar com o ARN real do método. Não confirmei o formato do output do execution ARN. |
| Lista apontava a pasta de e-mail                               | função real em `carbon-registration-consent-marketing-optin-status` | Risco de auditar o pacote errado                                                                         |

## Erros que acontecem ou podem acontecer

| Situação                | O que ocorre                                                                             | Evidência                      |
| ----------------------- | ---------------------------------------------------------------------------------------- | ------------------------------ |
| Body não string         | `ValidationError` e resposta 400.                                                        | `app/index.js:16-18` e `37-39` |
| JSON inválido           | `JSON.parse` cai no `catch` e devolve 500 (`error.message`), não 400 específico de JSON. | `app/index.js:21` e `32-42`    |
| Sucesso ou erro tratado | Sempre há `return response` com `statusCode`.                                            | `app/index.js:54-64`           |

## Oportunidades

- Diferenciar JSON inválido (400) de falha de integração (500).
- Conferir se o `source_arn` da permission precisa da barra.
- Não há fila para separar.

## Melhorias identificadas

- Diferenciar JSON inválido (400) de falha de integração (500).
- Conferir se o `source_arn` da permission precisa da barra entre execution ARN e stage.
- Apontar a pasta real `carbon-registration-consent-marketing-optin-status`, não a de e-mail.

## Observações

- A pasta indicada na lista (`carbon-acquisition-email-notification`) **não** contém esta função. Lá a função Terraform é `carbon-acquisition-email-notification` (`POST /email-notification`), sem menção a marketing/optin. Procurei `marketing|optin` em `carbon-acquisition-email-notification/**/*.{js,tf,json,md}`: nenhum match. A função com esse nome está em `carbon-registration-consent-marketing-optin-status`.
- Não encontrado `aws_lambda_event_source_mapping` neste stack. Procurei em `carbon-registration-consent-marketing-optin-status/infra/**/*.tf`.
- `aws_lambda_permission.source_arn` concatena execution ARN e stage sem `/` explícito (`lambda-event-source/main.tf:10`). Não alterei a classificação por isso; o principal continua sendo só API Gateway.

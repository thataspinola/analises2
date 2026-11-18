# carbon-acq-sp-auto-shop-repair-appointments-search-caps

> **Leitura rápida**
>
> |                  |                               |
> | ---------------- | ----------------------------- |
> | Classificação    | ✅ OK                         |
> | Função sistêmica | Uma: API POST                 |
> | Retorno          | Sempre `{ statusCode, body }` |
> | DLQ              | Não se aplica                 |

**Caminho do código:** `carbon-acquisition-service-provider-auto-shop-repair-appointments-search-caps/app`
**Nome da função na AWS (Terraform):** `carbon-acq-sp-auto-shop-repair-appointments-search-caps`
**Classificação:** ✅ OK

## Resumo

A lambda trata `POST` no recurso raiz da API REST privada de mesmo nome, custom domain `acq/service-provision/auto-shop-repair/appointments-search-caps`. O handler lê `event.body` e devolve `{ statusCode, body }`. Não há SQS nem ramificação por tipo de evento.

## Gatilhos no Terraform

| Tipo             | Recurso / Detalhe                                                                                                                                                                                     | Arquivo:linha                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway REST | `POST /` (root), stage `v1`, integração proxy, permission `apigateway.amazonaws.com` na função `module.lambda`. Custom domain path `acq/service-provision/auto-shop-repair/appointments-search-caps`. | `carbon-acquisition-service-provider-auto-shop-repair-appointments-search-caps/infra/variables.tf:6-26`; `carbon-acquisition-service-provider-auto-shop-repair-appointments-search-caps/infra/modules/api-gateway/main.tf:25-37`; `carbon-acquisition-service-provider-auto-shop-repair-appointments-search-caps/infra/modules/lambda-event-source/main.tf:5-10`; `carbon-acquisition-service-provider-auto-shop-repair-appointments-search-caps/infra/modules/lambda/main.tf:6` |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                         | Arquivo:linha                                                                                     |
| -------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| API Gateway    | `event.body` string JSON; retorno com `statusCode` e `body` | `carbon-acquisition-service-provider-auto-shop-repair-appointments-search-caps/app/index.js:8-28` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma.

## Problemas encontrados

Nenhum.

## Recomendação

Nenhuma ação necessária.

## Débitos técnicos

Nenhum de gatilho duplo ou fila sem DLQ. Uma função sistêmica (POST).

## Erros que acontecem ou podem acontecer

| Situação        | O que ocorre                                                                         | Evidência            |
| --------------- | ------------------------------------------------------------------------------------ | -------------------- |
| Body não string | Lança erro e o `catch` externo monta resposta de erro. Há `return` no JSON inválido. | `app/index.js:8-28`  |
| JSON inválido   | Retorno imediato 400, sem seguir o fluxo.                                            | `app/index.js:16-28` |

## Oportunidades

Nenhuma separação de lambda. Os outros dois nomes da mesma pasta não devem herdar este gatilho.

## Melhorias identificadas

- Nenhuma quebra de lambda. A função já é só POST.
- Não copiar este gatilho para os nomes `search-caps-id` e `appointment-search`, que não existem neste workspace.

## Observações

- Não encontrado `aws_lambda_event_source_mapping` neste stack (`infra/**/*.tf`).
- Os outros dois nomes da lista apontados para a mesma pasta (`carbon-acq-sp-auto-shop-repair-search-caps-id` e `carbon-sup-sp-auto-shop-repair-vehicle-search`) não existem neste diretório. Há um único `aws_lambda_function`.

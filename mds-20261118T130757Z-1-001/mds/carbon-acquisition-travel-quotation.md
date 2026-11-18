# carbon-acquisition-travel-quotation

> **Leitura rápida**
>
> |                          |                                           |
> | ------------------------ | ----------------------------------------- |
> | Classificação            | ✅ OK                                     |
> | Função AWS               | `carbon-acquisition-travel-quotation`     |
> | Código                   | `carbon-acquisition-travel-quotation/app` |
> | Função sistêmica         | Uma: API Gateway                          |
> | Retorno do handler       | Sempre objeto HTTP no `try` e no `catch`  |
> | DLQ                      | Não se aplica                             |
> | Quebrar em duas lambdas? | Não                                       |

**Caminho do código:** `carbon-acquisition-travel-quotation/app`
**Nome da função na AWS (Terraform):** `carbon-acquisition-travel-quotation`
**Classificação:** ✅ OK

## Resumo

A lambda trata `POST` no recurso raiz, custom domain `quotation/travel`. O handler exige `event.body` string e devolve `{ statusCode, body, headers }` no sucesso e no erro.

## Gatilhos no Terraform

| Tipo             | Recurso / Detalhe                                                                     | Arquivo:linha                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway REST | `POST /`, stage `v1`, permission `apigateway.amazonaws.com`. Path `quotation/travel`. | `carbon-acquisition-travel-quotation/infra/variables.tf:6-23`; `carbon-acquisition-travel-quotation/infra/modules/lambda-event-source/main.tf:5-10` |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                                        | Arquivo:linha                                                      |
| -------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| API Gateway    | `event.body`, `event.headers['carbon-trace-id']`, retorno com `statusCode` | `carbon-acquisition-travel-quotation/app/index.js:14-36` e `55-62` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma.

## Problemas encontrados

Nenhum de gatilho duplo, retorno `undefined` do handler ou DLQ. `createdCorrelationId` devolve `''` se o header quebrar (`index.js:64-72`), mas o handler ainda retorna HTTP.

## Recomendação

Nenhuma ação necessária.

## Débitos técnicos

Nenhum de gatilho duplo ou fila. Handler sempre devolve objeto HTTP.

## Erros que acontecem ou podem acontecer

| Situação                         | O que ocorre                                             | Evidência                                             |
| -------------------------------- | -------------------------------------------------------- | ----------------------------------------------------- |
| Body não string ou JSON inválido | `catch` monta `factory.response.Error` e devolve status. | `app/index.js:14-16` e trecho de erro após a linha 40 |
| Header de trace inválido         | `createdCorrelationId` devolve `''` e o handler segue.   | `app/index.js:55-72`                                  |

## Oportunidades

Nenhuma quebra de lambda.

## Melhorias identificadas

- Nenhuma quebra de lambda.
- Tratar header de trace inválido de forma explícita, em vez de seguir com correlation id vazio.

## Observações

Não encontrado SQS neste stack.

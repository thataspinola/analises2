# carbon-service-provision-search-products

> **Leitura rápida**
>
> |                          |                                                     |
> | ------------------------ | --------------------------------------------------- |
> | Classificação            | ✅ OK                                               |
> | Função AWS               | `carbon-service-provision-search-products`          |
> | Código                   | `carbon-service-provision-search-products/app`      |
> | Função sistêmica         | Uma: API Gateway (`ANY`, código aceita GET e POST)  |
> | Retorno do handler       | Sempre objeto HTTP, inclusive no erro               |
> | DLQ                      | Não se aplica                                       |
> | Quebrar em duas lambdas? | Não. O `switch` é de método HTTP, não de SQS vs API |

**Caminho do código:** `carbon-service-provision-search-products/app`
**Nome da função na AWS (Terraform):** `carbon-service-provision-search-products`
**Classificação:** ✅ OK

## Resumo

A lambda atende `ANY` no recurso raiz da API, custom domain `service-provision/search-products`. O handler ramifica só `event.httpMethod` (`POST`/`GET`) e sempre devolve `{ statusCode, body }`. Não há fila.

## Gatilhos no Terraform

| Tipo             | Recurso / Detalhe                                                                                                                            | Arquivo:linha                                                                                                                                                                                                                                               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway REST | método default `ANY` no root, stage `v1`, integração proxy, permission `apigateway.amazonaws.com`. Path `service-provision/search-products`. | `carbon-service-provision-search-products/infra/variables.tf:7-20` e `96-99`; `carbon-service-provision-search-products/infra/modules/api-gateway/main.tf:22-25`; `carbon-service-provision-search-products/infra/modules/lambda-event-source/main.tf:5-10` |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                                                                          | Arquivo:linha                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| API Gateway    | `switch (event.httpMethod)` POST usa `event.body`, GET usa `queryStringParameters`; retorno com `statusCode` | `carbon-service-provision-search-products/app/index.js:13-22` e `49-66` |

**Ramificação por tipo de evento no handler?** Não entre API e fila. Sim entre métodos HTTP: `case 'POST'` / `case 'GET'` / `default: throw new Error('Unsupported HTTP method')`.

## Divergências Terraform × Código

Nenhuma de tipo. Terraform libera `ANY`; o código rejeita método que não seja GET ou POST com HTTP 400 (`createErrorResponse`). Isso é filtro de método, não segundo gatilho.

## Problemas encontrados

Nenhum de múltipla função sistêmica, retorno `undefined` ou DLQ.

## Recomendação

Nenhuma separação. Se quiser contrato mais estrito, trocar `ANY` por GET e POST explícitos no API Gateway.

## Débitos técnicos

| Item                                            | Evidência                                | Efeito                                  |
| ----------------------------------------------- | ---------------------------------------- | --------------------------------------- |
| Método `ANY` no gateway e só GET/POST no código | `variables.tf:7-9`; `app/index.js:16-22` | PUT/DELETE chegam na lambda e viram 400 |

## Erros que acontecem ou podem acontecer

| Situação              | O que ocorre                                                              | Evidência                      |
| --------------------- | ------------------------------------------------------------------------- | ------------------------------ |
| Método não suportado  | `throw new Error('Unsupported HTTP method')` e `createErrorResponse` 400. | `app/index.js:20-22` e `49-52` |
| JSON inválido no POST | Erro capturado em `parseEventInput` e resposta 400.                       | `app/index.js:5-8` e `27-29`   |
| Erro no processamento | `catch` do handler devolve HTTP. Não há `return` implícito `undefined`.   | `app/index.js:63-66`           |

## Oportunidades

Publicar só GET e POST no API Gateway. O `switch` não justifica duas lambdas.

## Melhorias identificadas

- Publicar só GET e POST no API Gateway, em vez de `ANY`, para PUT/DELETE não chegarem na lambda.
- O `switch` de método HTTP não justifica duas lambdas.

## Observações

Não encontrado SQS neste stack.

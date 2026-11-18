# carbon-acquisition-petlove-proposal

> **Leitura rápida**
>
> |                          |                               |
> | ------------------------ | ----------------------------- |
> | Classificação            | ✅ OK                         |
> | Função sistêmica         | Uma: API Gateway POST         |
> | Retorno                  | Sempre `{ statusCode, body }` |
> | DLQ                      | Não se aplica                 |
> | Quebrar em duas lambdas? | Não                           |

**Caminho do código:** `carbon-acquisition-petlove-proposal/app`
**Nome da função na AWS (Terraform):** `carbon-acquisition-petlove-proposal` (`var.project_name`, default em `carbon-acquisition-petlove-proposal/infra/variables.tf:15`)
**Classificação:** ✅ OK

## Resumo

A lambda `carbon-acquisition-petlove-proposal` trata requisições `POST` no recurso raiz da API REST privada de mesmo nome, mapeada no custom domain no path `acquisition/petlove/proposal`. O handler lê `event.body` e devolve `{ statusCode, body, headers }`. Não há gatilho SQS nem ramificação por tipo de evento.

## Gatilhos no Terraform

| Tipo             | Recurso / Detalhe                                                                                                                                                                                                                               | Arquivo:linha                                                                                                                                                                                                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway REST | `POST /` (root resource) na API `carbon-acquisition-petlove-proposal`, stage `v1`, integração `AWS_PROXY`. Custom domain path `acquisition/petlove/proposal` (`aws_apigatewayv2_api_mapping`). Permission `principal=apigateway.amazonaws.com`. | `carbon-acquisition-petlove-proposal/infra/modules/api-gateway/main.tf:5-41`; `carbon-acquisition-petlove-proposal/infra/variables.tf:15-32`; `carbon-acquisition-petlove-proposal/infra/modules/api-mapping/main.tf:1-3`; `carbon-acquisition-petlove-proposal/infra/modules/lambda/main.tf:80-85` |
| Lambda           | `handler=index.handler`, `runtime=nodejs20.x`, pacote `../app/`                                                                                                                                                                                 | `carbon-acquisition-petlove-proposal/infra/modules/lambda/main.tf:5-9`; `carbon-acquisition-petlove-proposal/infra/modules/lambda/datasources.tf` (source_dir conferido abaixo)                                                                                                                     |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                                                       | Arquivo:linha                                            |
| -------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| API Gateway    | `event.body` parseado como JSON; retorno `{ isBase64Encoded, headers, statusCode, body }` | `carbon-acquisition-petlove-proposal/app/index.js:23-48` |

**Ramificação por tipo de evento no handler?** Não. Só trata `event.body`.

## Divergências Terraform × Código

Nenhuma.

## Problemas encontrados

Nenhum relacionado a múltiplos gatilhos ou divergência Terraform × código.

## Recomendação

Nenhuma ação necessária.

## Débitos técnicos

Nenhum débito de gatilho duplo, retorno nulo ou fila sem DLQ. A função tem uma única responsabilidade (POST de proposta).

## Erros que acontecem ou podem acontecer

| Situação                   | O que ocorre                                                                                | Evidência                      |
| -------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------ |
| Body ausente ou não string | `parseRequestBody` lança `Input must be a string`. O `catch` genérico devolve 500, não 400. | `app/index.js:5-7` e `30-36`   |
| JSON inválido              | Mensagem `Invalid JSON format` vira 400.                                                    | `app/index.js:12-15` e `27-29` |
| Erro de negócio/API        | Devolve `{ statusCode, body }`. Não há caminho sem `return`.                                | `app/index.js:42-48`           |

## Oportunidades

- Tratar body não string como 400, no mesmo critério do JSON inválido.
- Não separar em lambda de fila: não há SQS.

## Melhorias identificadas

- Tratar body que não é string como 400, não como 500 genérico.
- Não separar em lambda de fila: não há SQS.

## Observações

- Não encontrado `aws_lambda_event_source_mapping`, SQS, SNS, EventBridge ou S3 neste stack. Procurei em `carbon-acquisition-petlove-proposal/infra/**/*.tf`.
- O método está no `root_resource_id`, não em um `aws_api_gateway_resource` filho. O path público vem do base path mapping `acquisition/petlove/proposal`.

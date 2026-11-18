# carbon-acq-service-order-availability

> **Leitura rápida**
>
> |                          |                                                                       |
> | ------------------------ | --------------------------------------------------------------------- |
> | Classificação            | ✅ OK                                                                 |
> | Função AWS               | `carbon-acq-service-order-availability`                               |
> | Código                   | `carbon-acquisition-service-provision-service-order-availability/app` |
> | Função sistêmica         | Uma: API Gateway                                                      |
> | Retorno do handler       | Sempre objeto `{ statusCode, body, headers }`                         |
> | DLQ                      | Não se aplica (não é SQS)                                             |
> | Quebrar em duas lambdas? | Não                                                                   |

**Caminho do código:** `carbon-acquisition-service-provision-service-order-availability/app`
**Nome da função na AWS (Terraform):** `carbon-acq-service-order-availability`
**Classificação:** ✅ OK

## Resumo

A lambda trata `POST` no recurso raiz da API REST privada, custom domain `acquisition/service-order-availability`. O handler lê `event.body` e sempre devolve status HTTP. Não há SQS nem segunda função sistêmica.

## Gatilhos no Terraform

| Tipo             | Recurso / Detalhe                                                                                                           | Arquivo:linha                                                                                                                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway REST | `POST /` (root), stage `v1`, permission `apigateway.amazonaws.com`. Custom domain `acquisition/service-order-availability`. | `carbon-acquisition-service-provision-service-order-availability/infra/variables.tf:7-26`; `carbon-acquisition-service-provision-service-order-availability/infra/modules/lambda-event-source/main.tf:5-10` |
| Lambda           | `function_name = var.project_name`                                                                                          | `carbon-acquisition-service-provision-service-order-availability/infra/modules/lambda/main.tf:6`                                                                                                            |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                         | Arquivo:linha                                                                                 |
| -------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| API Gateway    | `event.body` string JSON; retorno com `statusCode` e `body` | `carbon-acquisition-service-provision-service-order-availability/app/index.js:8-16` e `43-48` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma.

## Problemas encontrados

Nenhum de gatilho, retorno nulo ou DLQ.

## Recomendação

Nenhuma ação necessária. Não há duas funções sistêmicas para separar.

## Débitos técnicos

Nenhum de gatilho, DLQ ou retorno ausente. Uma função sistêmica.

## Erros que acontecem ou podem acontecer

| Situação        | O que ocorre                                           | Evidência            |
| --------------- | ------------------------------------------------------ | -------------------- |
| Body não string | Erro lançado e convertido em resposta HTTP no `catch`. | `app/index.js:8-10`  |
| JSON inválido   | Retorno imediato com `statusCode` de bad request.      | `app/index.js:16-27` |
| Fim do handler  | Sempre `return response`. Não há caminho `undefined`.  | `app/index.js:43-48` |

## Oportunidades

Nenhuma quebra em duas lambdas.

## Melhorias identificadas

- Nenhuma melhoria de gatilho. Manter uma lambda só de API.
- O handler já devolve HTTP no sucesso e no erro.

## Observações

Não encontrado `aws_lambda_event_source_mapping` neste stack. Procurei em `infra/modules/lambda-event-source/main.tf`: só `aws_lambda_permission`.

# carbon-acq-services-proposal

> **Leitura rápida**
>
> |                          |                                                     |
> | ------------------------ | --------------------------------------------------- |
> | Classificação            | ✅ OK                                               |
> | Função AWS               | `carbon-acq-services-proposal`                      |
> | Código                   | `carbon-acquisition-service-provision-proposal/app` |
> | Função sistêmica         | Uma: API Gateway                                    |
> | Retorno do handler       | Sempre `{ statusCode, body, headers }`              |
> | DLQ                      | Não se aplica                                       |
> | Quebrar em duas lambdas? | Não                                                 |

**Caminho do código:** `carbon-acquisition-service-provision-proposal/app`
**Nome da função na AWS (Terraform):** `carbon-acq-services-proposal`
**Classificação:** ✅ OK

## Resumo

A lambda trata `POST` no recurso raiz da API, custom domain `acquisition/service-provision/proposal`. O handler lê `event.body` e devolve status HTTP. Sem SQS.

## Gatilhos no Terraform

| Tipo             | Recurso / Detalhe                                                                                                      | Arquivo:linha                                                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway REST | `POST /`, stage `v1`, permission `apigateway.amazonaws.com`. Path de domínio `acquisition/service-provision/proposal`. | `carbon-acquisition-service-provision-proposal/infra/variables.tf:7-32`; `carbon-acquisition-service-provision-proposal/infra/modules/lambda-event-source/main.tf:5` |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                      | Arquivo:linha                                                                |
| -------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| API Gateway    | `parseRequestBody(event.body)`; retorno com `statusCode` | `carbon-acquisition-service-provision-proposal/app/index.js:22-24` e `46-51` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma.

## Problemas encontrados

Nenhum de gatilho, retorno nulo ou DLQ.

## Recomendação

Nenhuma ação necessária.

## Débitos técnicos

Nenhum de gatilho duplo, retorno ausente ou fila sem DLQ.

## Erros que acontecem ou podem acontecer

| Situação        | O que ocorre                                                | Evidência                      |
| --------------- | ----------------------------------------------------------- | ------------------------------ |
| Body não string | Erro genérico vira resposta de erro HTTP, não 400 dedicado. | `app/index.js:5-7` e `31-36`   |
| JSON inválido   | 400 via `Invalid JSON format`.                              | `app/index.js:12-15` e `27-29` |
| Qualquer saída  | Há `return` com `statusCode`.                               | `app/index.js:46-51`           |

## Oportunidades

Tratar body não string como 400. Não separar lambda.

## Melhorias identificadas

- Tratar body que não é string como 400, no mesmo critério do JSON inválido.
- Não separar lambda: um POST só.

## Observações

Não encontrado event source mapping de fila. Procurei `infra/modules/lambda-event-source/main.tf`.

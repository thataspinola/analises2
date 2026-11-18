# carbon-acq-sp-auto-shop-repair-appointment-search

> **Leitura rápida:** ❓ nome não existe. A pasta tem uma lambda GET de disponibilidade, não esta. Não herdar gatilho da vizinha.

**Caminho do código:** Não encontrado. A pasta `carbon-acquisition-service-provider-auto-shop-repair-appointment-service` tem um único pacote em `app/`, empacotado para outra função.
**Nome da função na AWS (Terraform):** Não encontrado
**Classificação:** ❓ INCONCLUSIVO

## Resumo

Não há lambda, módulo ou variável com o nome `carbon-acq-sp-auto-shop-repair-appointment-search`. A única função do diretório é `carbon-acq-sp-auto-shop-repair-appointment-service`, com gatilho `GET` no recurso raiz do API Gateway (custom domain `acq/service-provision/auto-shop-repair/appointment-service`). O handler dessa função lê `event.queryStringParameters` e não trata SQS.

## Gatilhos no Terraform

| Tipo                                   | Recurso / Detalhe                                                                                                                       | Arquivo:linha                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Não encontrado                         | Nenhum recurso referencia este nome. Função existente: `var.project_name` default `carbon-acq-sp-auto-shop-repair-appointment-service`. | `carbon-acquisition-service-provider-auto-shop-repair-appointment-service/infra/variables.tf:24-26`; `carbon-acquisition-service-provider-auto-shop-repair-appointment-service/infra/modules/lambda/main.tf:5-6`                                                                                                                               |
| API Gateway (função vizinha, não esta) | `GET /` (root), stage `v1`, permission `apigateway.amazonaws.com`. Sem `aws_lambda_event_source_mapping`.                               | `carbon-acquisition-service-provider-auto-shop-repair-appointment-service/infra/variables.tf:6-16`; `carbon-acquisition-service-provider-auto-shop-repair-appointment-service/infra/modules/api-gateway/main.tf:25`; `carbon-acquisition-service-provider-auto-shop-repair-appointment-service/infra/modules/lambda-event-source/main.tf:5-10` |

## Eventos tratados no handler

| Tipo de evento               | Evidência no código                                                    | Arquivo:linha                                                                                 |
| ---------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| API Gateway (função vizinha) | `event.queryStringParameters`; retorno `{ statusCode, body, headers }` | `carbon-acquisition-service-provider-auto-shop-repair-appointment-service/app/index.js:11-17` |

**Ramificação por tipo de evento no handler?** Não, no único handler da pasta.

## Divergências Terraform × Código

Não aplicável: a lambda nomeada não existe. A função vizinha está alinhada (só API Gateway GET).

## Problemas encontrados

1. **Média** — Nome da lista não existe no repositório. Busca por `carbon-acq-sp-auto-shop-repair-appointment-search` em `**/*.{tf,js,json,md}`: nenhum match.

## Recomendação

Confirmar o nome real. A função presente na pasta não mistura API Gateway e SQS.

## Débitos técnicos

| Item                                 | Evidência                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| Nome da lista sem função             | busca em `**/*.{tf,js,json,md}` sem match                                                  |
| Risco de atribuir gatilho da vizinha | a pasta só tem `carbon-acq-sp-auto-shop-repair-appointment-service` (`variables.tf:24-26`) |

## Erros que acontecem ou podem acontecer

Não há handler desta função. Na lambda vizinha, query ausente vira erro HTTP (`app/index.js:13-15`). Isso não é desta lambda.

## Oportunidades

Confirmar com o time o nome real antes de abrir débito de código.

## Melhorias identificadas

- Confirmar o nome real da função com o time. Não herdar o GET da lambda vizinha `appointment-service`.
- Se a busca existir em outro repositório, manter um gatilho só (API ou fila).

## Observações

- Também não existe `carbon-acq-sp-auto-shop-repair-appointments-create` neste workspace (mesma busca).

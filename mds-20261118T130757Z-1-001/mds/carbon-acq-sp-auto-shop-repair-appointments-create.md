# carbon-acq-sp-auto-shop-repair-appointments-create

> **Leitura rápida:** ❓ nome não existe. Não há POST nem SQS com esse function name.

**Caminho do código:** Não encontrado. A pasta `carbon-acquisition-service-provider-auto-shop-repair-appointment-service` define uma única lambda.
**Nome da função na AWS (Terraform):** Não encontrado
**Classificação:** ❓ INCONCLUSIVO

## Resumo

Não há função Terraform nem handler separado para `carbon-acq-sp-auto-shop-repair-appointments-create`. A única lambda do diretório é `carbon-acq-sp-auto-shop-repair-appointment-service` (`GET` no API Gateway, leitura de `queryStringParameters`). Não há recurso de criação (POST) nem fila SQS ligada a ela.

## Gatilhos no Terraform

| Tipo                       | Recurso / Detalhe                                                             | Arquivo:linha                                                                                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Não encontrado             | Nome ausente em `.tf`, `.js`, `.json` e `.md` do workspace.                   | busca `carbon-acq-sp-auto-shop-repair-appointments-create`                                                                                                                                                                    |
| API Gateway (outra função) | `GET /` na API da função `carbon-acq-sp-auto-shop-repair-appointment-service` | `carbon-acquisition-service-provider-auto-shop-repair-appointment-service/infra/variables.tf:6-26`; `carbon-acquisition-service-provider-auto-shop-repair-appointment-service/infra/modules/lambda-event-source/main.tf:5-10` |

## Eventos tratados no handler

| Tipo de evento                | Evidência no código                                                 | Arquivo:linha                                                                                 |
| ----------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Não encontrado para este nome | O único `index.js` da pasta não menciona create nem `event.Records` | `carbon-acquisition-service-provider-auto-shop-repair-appointment-service/app/index.js:11-17` |

**Ramificação por tipo de evento no handler?** Não encontrado para esta lambda.

## Divergências Terraform × Código

Não aplicável.

## Problemas encontrados

1. **Média** — Lambda da lista inexistente no repositório. Não há segundo pacote (`app-create` ou similar) na pasta.

## Recomendação

Não há o que separar. Validar com o time se a criação de agendamento vive em outro repositório.

## Débitos técnicos

Não há código nem Terraform desta função. Débito de inventário: o nome da lista não existe no repositório.

## Erros que acontecem ou podem acontecer

Não aplicável. Não há handler para falhar ou retornar `undefined`.

## Oportunidades

Se a criação de agendamento existir em outro repositório, manter lambda só de API ou só de fila, nunca as duas.

## Melhorias identificadas

- Confirmar se a criação de agendamento está em outro repositório.
- Se for criada aqui, uma lambda por gatilho. Não misturar API Gateway e SQS.

## Observações

- Listagem da pasta: um `app/` e um `infra/` com um módulo `lambda`. Não há `aws_lambda_event_source_mapping`.

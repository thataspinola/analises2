# carbon-acq-residential-transmission

> **Leitura rápida**
>
> |                           |                                                   |
> | ------------------------- | ------------------------------------------------- |
> | Classificação             | ❓ INCONCLUSIVO                                   |
> | Função sistêmica          | A lambda da pasta só publica na fila; não consome |
> | Retorno da lambda vizinha | HTTP `{ statusCode }`                             |
> | DLQ desta fila            | Não encontrado neste repositório                  |
> | Quebrar em duas lambdas?  | Não há lambda homônima para quebrar               |

**Caminho do código:** Não encontrado como lambda. A pasta indicada `carbon-acquisition-transmission` contém uma única função, `carbon-acq-transmission`, em `carbon-acquisition-transmission/app`.
**Nome da função na AWS (Terraform):** Não encontrado (`carbon-acq-residential-transmission` aparece só como ARN de fila de destino, não como `aws_lambda_function`).
**Classificação:** ❓ INCONCLUSIVO

## Resumo

Não existe lambda `carbon-acq-residential-transmission` neste repositório. Na pasta indicada, a lambda `carbon-acq-transmission` trata `POST /transmission` no API Gateway e **publica** mensagens na fila SQS `carbon-acq-residential-transmission` quando `item.escopo === 'residential'`. Essa fila não é gatilho da função.

## Gatilhos no Terraform

| Tipo                                                   | Recurso / Detalhe                                                                                                                         | Arquivo:linha                                                                                                                                                                                                 |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Não encontrado (lambda homônima)                       | Nenhum `aws_lambda_function` com `function_name = carbon-acq-residential-transmission`. Única função do stack: `carbon-acq-transmission`. | `carbon-acquisition-transmission/infra/modules/lambda/main.tf:25`                                                                                                                                             |
| API Gateway (função vizinha `carbon-acq-transmission`) | `POST /transmission`, stage default `v1`. Permission `apigateway.amazonaws.com`.                                                          | `carbon-acquisition-transmission/infra/variables.tf:48-63`; `carbon-acquisition-transmission/infra/modules/api-gateway/main.tf:36-58`; `carbon-acquisition-transmission/infra/modules/lambda/main.tf:125-130` |
| SQS (saída, não gatilho)                               | IAM permite `sqs:SendMessage` em `arn:aws:sqs:ca-central-1:${account_id}:carbon-acq-residential-transmission`. Env `RESIDENTIAL_QUEUE`.   | `carbon-acquisition-transmission/infra/modules/lambda/main.tf:103-108`; `carbon-acquisition-transmission/infra/variables.tf:43-45`                                                                            |

Não encontrado `aws_lambda_event_source_mapping` em `carbon-acquisition-transmission/infra/**/*.tf`.

## Eventos tratados no handler

| Tipo de evento                                 | Evidência no código                                                                | Arquivo:linha                                                                                                                                      |
| ---------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway (função `carbon-acq-transmission`) | `JSON.parse(event.body)`; retorno `{ statusCode, body, headers, isBase64Encoded }` | `carbon-acquisition-transmission/app/src/controller/checkoutController.js:6`; `carbon-acquisition-transmission/app/index.js:5-14`                  |
| Publicação SQS (não consumo)                   | `SendMessageCommand` para `RESIDENTIAL_QUEUE` no case `residential`                | `carbon-acquisition-transmission/app/src/controller/checkoutController.js:36-40`; `carbon-acquisition-transmission/app/src/property/index.js:9-11` |

**Ramificação por tipo de evento no handler?** Não. Há `switch (item.escopo)` entre filas de saída (`travel` / `residential`), não entre tipos de evento de entrada.

## Divergências Terraform × Código

Não aplicável à lambda nomeada: ela não está definida. Para `carbon-acq-transmission`, Terraform liga só API Gateway e o código trata `event.body` e publica em SQS. Sem divergência de gatilho.

## Problemas encontrados

1. **Média** — O nome pedido não corresponde a uma lambda. A fila `carbon-acq-residential-transmission` não tem consumidor neste repositório (procurei o nome em `**/*.tf`: único match é o ARN de `SendMessage`). Evidência: `carbon-acquisition-transmission/infra/modules/lambda/main.tf:108`.

## Recomendação

Confirmar se o consumidor da fila `carbon-acq-residential-transmission` está em outro repositório. A lambda desta pasta (`carbon-acq-transmission`) não precisa ser separada: só recebe API Gateway.

## Débitos técnicos

| Item                                              | Evidência                                                          | Efeito                                               |
| ------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------- |
| Nome da lista não é lambda                        | único match em `.tf` é ARN de `SendMessage` (`lambda/main.tf:108`) | Consumidor da fila não está neste repositório        |
| DLQ da fila `carbon-acq-residential-transmission` | Não encontrado `redrive_policy` para essa fila aqui                | Se a fila existir só na AWS, a DLQ não foi auditável |
| Erro de envio vira item com `error` no body HTTP  | `checkoutController.js:45-50`                                      | A API responde sucesso parcial sem falhar a chamada  |

## Erros que acontecem ou podem acontecer

| Situação                                | O que ocorre                                                                                                               | Evidência                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `SendMessage` da fila residential falha | O item entra em `homeResponse` com `error`. O handler ainda devolve HTTP. A mensagem não entra em DLQ por este código.     | `checkoutController.js:36-51`                            |
| `event.body` inválido                   | `JSON.parse` sem `try` no controller. A exceção sobe do handler, que não tem `catch`. A lambda falha sem `{ statusCode }`. | `checkoutController.js:6`; `app/index.js:5-14`           |
| Escopo não mapeado                      | Item vai para `notMappedResponse` com `error: not mapped`.                                                                 | `checkoutController.js:52` (case default no trecho lido) |

## Oportunidades

- Tratar parse do body no handler e sempre devolver HTTP.
- Confirmar em outro repositório o consumidor e a DLQ de `carbon-acq-residential-transmission`.
- Não criar uma lambda que receba o POST e a fila ao mesmo tempo.

## Melhorias identificadas

- Tratar `JSON.parse` do body e sempre devolver HTTP no handler de `carbon-acq-transmission`.
- Não tratar erro de `SendMessage` como sucesso parcial silencioso.
- Localizar o consumidor e a DLQ de `carbon-acq-residential-transmission` em outro repositório antes de criar lambda.
- Não criar uma função que receba o POST e a fila ao mesmo tempo.

## Observações

- Procurei `carbon-acq-residential-transmission` em todos os `.tf` do workspace: 1 ocorrência, política IAM de envio.
- Também há fila de travel (`TRAVEL_QUEUE`) como saída, mesmo padrão.

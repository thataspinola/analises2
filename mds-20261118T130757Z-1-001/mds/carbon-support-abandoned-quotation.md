# carbon-support-abandoned-quotation

> **Atualização de código — item 1, 18/11/2026:** o contrato de falha foi corrigido nas duas cópias de `app-abandoned-quotation` (`carbon-support-create-lead` e `carbon-support-abandoned-quotation`). Os handlers agora devolvem `batchItemFailures` com o `SequenceNumber`, interrompendo o lote na primeira falha. Validação: 38 testes por cópia; handler com 100% de cobertura. Validação AWS pendente. [Detalhes e limitações](../../docs/fixes/01-abandoned-quotation-stream.md).
>
> O texto abaixo preserva o diagnóstico anterior à correção; os PDFs desta auditoria são históricos.

> **Leitura rápida**
>
> |                          |                                                                        |
> | ------------------------ | ---------------------------------------------------------------------- |
> | Classificação            | ⚠️ ATENÇÃO                                                             |
> | Função sistêmica         | Uma: DynamoDB Stream (não é API + SQS)                                 |
> | Retorno                  | Devolve `{ statusCode }` e **não** faz `throw` nem `batchItemFailures` |
> | DLQ                      | Não se aplica (stream, não SQS)                                        |
> | Quebrar em duas lambdas? | Não. Corrigir o contrato de falha do stream                            |

**Caminho do código:** `carbon-support-create-lead/app-abandoned-quotation` (a pasta `carbon-support-quotation` não existe na raiz do workspace)
**Nome da função na AWS (Terraform):** `carbon-support-abandoned-quotation` (`var.project_name_abandoned_quotation`, default em `carbon-support-create-lead/infra/variables.tf:33`)
**Classificação:** ⚠️ ATENÇÃO

## Resumo

A lambda `carbon-support-abandoned-quotation` trata eventos de stream do DynamoDB da tabela `carbon-lead-in-progress` (TTL expirado), ligados por `aws_lambda_event_source_mapping`. Não há gatilho de API Gateway nem de SQS nesta função. O código lê `event.Records` / `record.dynamodb`, mas devolve resposta no formato de API Gateway e não reporta `batchItemFailures`, embora o Terraform peça `ReportBatchItemFailures`.

## Gatilhos no Terraform

| Tipo            | Recurso / Detalhe                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Arquivo:linha                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DynamoDB Stream | stream da tabela `carbon-lead-in-progress` (`stream_view_type=NEW_AND_OLD_IMAGES`, TTL `expireAt`); mapping com `batch_size=5`, `starting_position=TRIM_HORIZON`, `maximum_retry_attempts` (tfvars=3), `bisect_batch_on_function_error=true`, filtro `userIdentity.principalId=dynamodb.amazonaws.com`, `function_response_types=["ReportBatchItemFailures"]`. Função referenciada: `module.lambda-abandoned-quotation.lambda_function_name`. Pacote: `app-abandoned-quotation/`. | `carbon-support-create-lead/infra/main.tf:84-92`; `carbon-support-create-lead/infra/modules/lambda-abandoned-quotation-event-source/main.tf:4-17`; `carbon-support-create-lead/infra/modules/dynamodb-table/main.tf:6-18`; `carbon-support-create-lead/infra/modules/dynamodb-table/variables.tf:7-9`; `carbon-support-create-lead/infra/modules/lambda-abandoned-quotation/datasources.tf:7` |
| Lambda          | `function_name=var.project_name` (`carbon-support-abandoned-quotation`), `handler=index.handler`, `runtime=nodejs20.x`, `timeout=var.lambda_timeout` (tfvars=60)                                                                                                                                                                                                                                                                                                                  | `carbon-support-create-lead/infra/modules/lambda-abandoned-quotation/main.tf:5-12`; `carbon-support-create-lead/infra/dev.tfvars:13`                                                                                                                                                                                                                                                          |

API Gateway deste repositório aponta para `module.lambda` (create-lead), não para esta função (`carbon-support-create-lead/infra/main.tf:73-81` e `94-104`). `aws_lambda_permission` de API Gateway está só em `lambda-event-source` (create-lead).

## Eventos tratados no handler

| Tipo de evento                                       | Evidência no código                                                                       | Arquivo:linha                                                                                                                                                               |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DynamoDB Stream                                      | Exige `event.Records`; para cada record usa `record.dynamodb.OldImage`                    | `carbon-support-create-lead/app-abandoned-quotation/index.js:7-8`; `carbon-support-create-lead/app-abandoned-quotation/src/controller/abandonedQuotationController.js:9-11` |
| Formato de resposta de API Gateway (sem ramificação) | Retorno `{ isBase64Encoded, headers, statusCode, body }` tanto no sucesso quanto no catch | `carbon-support-create-lead/app-abandoned-quotation/index.js:11-16` e `22-29`                                                                                               |

**Ramificação por tipo de evento no handler?** Não. Só rejeita ausência de `Records` (`if (!event?.Records) throw ...`). Não há `else` para HTTP/SQS.

## Divergências Terraform × Código

- Terraform configura `function_response_types = ["ReportBatchItemFailures"]` (`lambda-abandoned-quotation-event-source/main.tf:16`), mas o handler não retorna `batchItemFailures`. Em erro, captura a exceção e devolve `{ statusCode }` sem relançar (`index.js:16-29`), então a invocação tende a ser tratada como sucesso e o retry/bisect do stream não dispara.
- O retorno imita API Gateway, mas não há integração HTTP ligada a esta função.

## Problemas encontrados

1. **Média** — `ReportBatchItemFailures` não é honrado pelo código; falhas de item são engolidas no `catch` e a lambda retorna objeto com `statusCode` em vez de falhar ou reportar item. Evidência: `index.js:16-29` e `lambda-abandoned-quotation-event-source/main.tf:16`.
2. **Baixa** — Resposta no formato API Gateway em consumidor de stream (código morto de contrato HTTP, sem ramificação). Evidência: `index.js:11-16`.
3. **Baixa** — `Promise.all` em `Records` sem isolar falha por item. Evidência: `abandonedQuotationController.js:8-35`.

## Recomendação

Manter um único consumidor de DynamoDB Stream. Ajustar o handler para reportar `batchItemFailures` (ou relançar o erro) em linha com o event source mapping. Não há necessidade de separar API e fila: esta função não está ligada aos dois.

## Débitos técnicos

| Item                                   | Evidência                                                                                                                                               | Efeito                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Contrato de stream incompleto          | Terraform pede `ReportBatchItemFailures` (`lambda-abandoned-quotation-event-source/main.tf:16`) e o handler devolve `{ statusCode }` (`index.js:11-29`) | Débito de confiabilidade: retry/bisect não disparam |
| Formato de API em consumidor de stream | `index.js:11-16`                                                                                                                                        | Contrato morto, confunde quem lê o handler          |
| `Promise.all` no lote                  | `abandonedQuotationController.js:8-35`                                                                                                                  | Uma falha rejeita o lote inteiro, sem item isolado  |

## Erros que acontecem ou podem acontecer

| Situação                | O que ocorre                                                                                                                             | Evidência                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Falha ao atualizar lead | O `catch` loga e devolve `statusCode` 500. A invocação é sucesso para o DynamoDB Stream. O registro expirado não volta a ser processado. | `index.js:16-29`                     |
| Evento sem `Records`    | Lança `ValidationError`, cai no mesmo `catch` e também não falha a invocação.                                                            | `index.js:7-8` e `16-29`             |
| `OldImage` ausente      | `record.dynamodb.OldImage` sem guarda. Pode estourar dentro do `Promise.all` e ser engolido pelo `catch` do handler.                     | `abandonedQuotationController.js:11` |

## Oportunidades

- Alinhar o retorno ao `ReportBatchItemFailures` ou remover essa opção do Terraform e passar a relançar o erro.
- Não há segunda função sistêmica: não separar em lambda de API e lambda de fila.

## Melhorias identificadas

- Devolver `batchItemFailures` (ou relançar o erro) para o DynamoDB Stream honrar `ReportBatchItemFailures`.
- Isolar falha por registro em vez de `Promise.all` no lote inteiro.
- Remover o contrato HTTP (`statusCode`) deste consumidor de stream.
- Guardar `OldImage` ausente antes de ler o registro expirado.

## Observações

- A pasta indicada na lista (`carbon-support-quotation`) não existe. Procurei na raiz do workspace e por `abandoned-quotation` / `support-quotation` em `.tf`, `.js`, `.json` e `.md`. O pacote npm é `@porto-seguro/hub-vendas.carbon-support-abandoned-quotation` (`app-abandoned-quotation/package.json:2`).
- Não encontrado gatilho SQS nem `aws_lambda_permission` / método de API Gateway referenciando `module.lambda-abandoned-quotation`. Procurei em `carbon-support-create-lead/infra/**/*.tf`.
- `lambda_timeout` não tem default no `variables.tf`; valor 60 vem dos tfvars (`dev.tfvars:13`, também hml/poc/prd).

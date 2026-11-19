# carbon-acquisition-travel-proposal

> **Atualização de código — item 3, 18/11/2026:** falha no enqueue de update-lead agora termina o workflow em `FAILED`; o mapping de StartSyncExecution devolve HTTP 500 com mensagem sanitizada. Os 22 testes locais de ASL/VTL passaram. Validação do stack e execução real pendentes na VDI/HML. [Detalhes](../../docs/fixes/03-travel-proposal-sqs-failure.md).
>
> O diagnóstico abaixo e seus caminhos antigos são históricos. A pasta atual do workflow é `carbon-acquisition-travel-proposal`.

> **Leitura rápida**
>
> |                                          |                                                                 |
> | ---------------------------------------- | --------------------------------------------------------------- |
> | Classificação                            | ❓ INCONCLUSIVO                                                 |
> | Função AWS                               | Não encontrado (`aws_lambda_function` ausente)                  |
> | Código                                   | Não encontrado. A pasta só tem Step Function + API Gateway      |
> | Função sistêmica                         | O fluxo (não lambda) faz API e envio SQS no mesmo state machine |
> | Retorno                                  | Step Function. Fallback de SQS engole o erro                    |
> | DLQ da fila `carbon-support-update-lead` | Não encontrado neste stack (só `sendMessage`)                   |
> | Quebrar?                                 | Não é lambda. O state machine mistura proposta e update-lead    |

**Caminho do código:** Não encontrado. Pasta `carbon-acquisition-travel-proposal-workflow` não tem `app/` nem handler Node.
**Nome da função na AWS (Terraform):** Não encontrado
**Classificação:** ❓ INCONCLUSIVO

## Resumo

Não há lambda neste diretório. O que existe é a Step Function Express `carbon-acq-travel-proposal-workflow`, disparada por `POST` no API Gateway (custom domain `proposal/travel`), e que publica na fila `carbon-support-update-lead` quando `updateLead` não é nulo. Não dá para classificar gatilho de lambda.

## Gatilhos no Terraform

| Tipo                           | Recurso / Detalhe                                                                                                                     | Arquivo:linha                                                                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Não é lambda                   | Nenhum `aws_lambda_function` nos módulos `api-gateway`, `api-mapping`, `iam-role`, `step-function`                                    | `carbon-acquisition-travel-proposal-workflow/infra/main.tf:16-64`                                                                                                          |
| API Gateway (na Step Function) | `POST` no root da API `${project_name}-gateway`, path de domínio `proposal/travel`, stage `v1`                                        | `carbon-acquisition-travel-proposal-workflow/infra/variables.tf:12-28`; `carbon-acquisition-travel-proposal-workflow/infra/modules/api-gateway/main.tf:5-40`               |
| SQS (saída da Step Function)   | task `sqs:sendMessage` para `https://sqs.${region}.amazonaws.com/${account}/${queue_name}`, fila default `carbon-support-update-lead` | `carbon-acquisition-travel-proposal-workflow/infra/variables.tf:18-20`; `carbon-acquisition-travel-proposal-workflow/infra/modules/step-function/step-function.json:40-46` |

## Eventos tratados no handler

| Tipo de evento | Evidência no código               | Arquivo:linha                               |
| -------------- | --------------------------------- | ------------------------------------------- |
| Não encontrado | Sem `index.js` de lambda na pasta | listagem da pasta: só `infra/`, `README.md` |

**Ramificação por tipo de evento no handler?** Não encontrado.

## Divergências Terraform × Código

Não aplicável a lambda. O state machine tem dois papéis (proposta e update-lead) no mesmo fluxo, mas não é o anti-padrão “uma lambda na API e na fila”.

## Problemas encontrados

1. **Média** — Nome da lista não corresponde a uma lambda. Evidência: ausência de `aws_lambda_function` e de pasta `app`.
2. **Média** — Se o `sendMessage` falha, o estado `Fallback SQS Update Lead` faz `Pass` com `"Hello, Erro ao enviar"` e `End: true`. O erro não é relançado. Evidência: `step-function.json:48-64`.
3. **Baixa** — DLQ da fila `carbon-support-update-lead` não está neste stack. Procurei `redrive_policy` na pasta: não encontrado.

## Recomendação

Não criar uma lambda híbrida. Se o update-lead precisar de consumidor, manter lambda só de fila, separada do endpoint. Corrigir o fallback da Step Function para falhar de verdade em vez de encerrar com texto fixo.

## Débitos técnicos

| Item                                 | Evidência                                                                       | Efeito                                                |
| ------------------------------------ | ------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Fluxo mistura proposta e update-lead | `step-function.json` estados `Do Update Lead` e proposta no mesmo state machine | Duas funções sistêmicas, mas não é uma lambda híbrida |
| Fallback engole erro de SQS          | `step-function.json:48-64` texto `Hello, Erro ao enviar` e `End: true`          | Chamador acha que terminou bem                        |
| DLQ de `carbon-support-update-lead`  | `redrive_policy` não encontrado nesta pasta                                     | Fila de saída sem DLQ auditável aqui                  |

## Erros que acontecem ou podem acontecer

| Situação            | O que ocorre                                  | Evidência                  |
| ------------------- | --------------------------------------------- | -------------------------- |
| `sendMessage` falha | Cai no fallback e encerra. Não relança.       | `step-function.json:48-64` |
| `updateLead` nulo   | Choice segue para `Success` e não envia fila. | `step-function.json:32-38` |

## Oportunidades

Falhar o estado quando o SQS falhar. Manter consumidor de `carbon-support-update-lead` em lambda só de fila, separado do POST `proposal/travel`.

## Melhorias identificadas

- O estado `Fallback SQS Update Lead` deve falhar de verdade, não encerrar com o texto `Hello, Erro ao enviar`.
- Manter o POST `proposal/travel` separado de qualquer consumidor da fila `carbon-support-update-lead`.
- Documentar a DLQ dessa fila no stack que a cria.

## Observações

Procurei handler em `carbon-acquisition-travel-proposal-workflow`: não há código de lambda.

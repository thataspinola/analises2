# carbon-acq-life-proposal-confirmation

> **Atualização de segurança — item 4, 18/11/2026:** nos três fluxos de Vida, logs de payload e erros completos foram substituídos por metadados; Pino recebeu normalização segura de erros e redação defensiva; data tracing de payload foi desativado no API Gateway. Os 54 testes locais de privacidade passaram. [Escopo e limites](../../docs/fixes/04-life-log-privacy.md). O diagnóstico abaixo é histórico e o selo de gatilho não certifica segurança global.

> **Leitura rápida**
>
> |                          |                                                     |
> | ------------------------ | --------------------------------------------------- |
> | Classificação            | ✅ OK                                               |
> | Função AWS               | `carbon-acq-life-proposal-confirmation`             |
> | Código                   | `carbon-acquisition-life-proposal-confirmation/app` |
> | Função sistêmica         | Uma: API Gateway                                    |
> | Retorno do handler       | Sempre objeto HTTP                                  |
> | DLQ                      | Não se aplica                                       |
> | Quebrar em duas lambdas? | Não                                                 |

**Caminho do código:** `carbon-acquisition-life-proposal-confirmation/app`
**Nome da função na AWS (Terraform):** `carbon-acq-life-proposal-confirmation`
**Classificação:** ✅ OK

## Resumo

A lambda trata `POST` no root da API, custom domain `proposal-confirmation/life`. Lê `event.body` e devolve status HTTP no sucesso e no erro.

## Gatilhos no Terraform

| Tipo             | Recurso / Detalhe                                                                               | Arquivo:linha                                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway REST | `POST /`, stage `v1`, permission `apigateway.amazonaws.com`. Path `proposal-confirmation/life`. | `carbon-acquisition-life-proposal-confirmation/infra/variables.tf:6-23`; `carbon-acquisition-life-proposal-confirmation/infra/modules/lambda-event-source/main.tf:5-10` |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                   | Arquivo:linha                                                                |
| -------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| API Gateway    | `event.body`; retorno `{ statusCode, body, headers }` | `carbon-acquisition-life-proposal-confirmation/app/index.js:15-22` e `61-66` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma.

## Problemas encontrados

Nenhum de gatilho, retorno nulo ou DLQ.

## Recomendação

Nenhuma ação necessária.

## Débitos técnicos

| Item                             | Evidência                        | Efeito                                                                        |
| -------------------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `source_arn` sem barra explícita | `lambda-event-source/main.tf:10` | Permissão pode não casar com o método, se o execution ARN não terminar em `/` |

## Erros que acontecem ou podem acontecer

| Situação      | O que ocorre                                             | Evidência                                                          |
| ------------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| Body inválido | `ValidationError` e resposta 400.                        | `app/index.js:15-17` e `catch` com `ex.name === 'ValidationError'` |
| Outro erro    | Resposta de erro com `statusCode`. Há `return response`. | `app/index.js:61-66`                                               |

## Oportunidades

Conferir o ARN da permission. Não separar fila: não há SQS.

## Melhorias identificadas

- Conferir o `source_arn` da permission: hoje concatena execution ARN e stage sem barra explícita.
- Não criar consumidor SQS nesta função.

## Observações

Não encontrado event source de fila. `source_arn` da permission concatena execution ARN e stage sem barra explícita (`lambda-event-source/main.tf:10`). Não muda o tipo de gatilho.

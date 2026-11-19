# carbon-acq-life-proposal-opening

> **Atualização de segurança — item 4, 18/11/2026:** nos três fluxos de Vida, logs de payload e erros completos foram substituídos por metadados; Pino recebeu normalização segura de erros e redação defensiva; data tracing de payload foi desativado no API Gateway. Os 54 testes locais de privacidade passaram. [Escopo e limites](../../docs/fixes/04-life-log-privacy.md). O diagnóstico abaixo é histórico e o selo de gatilho não certifica segurança global.

> **Leitura rápida**
>
> |                          |                                                                             |
> | ------------------------ | --------------------------------------------------------------------------- |
> | Classificação            | ✅ OK                                                                       |
> | Função AWS               | `carbon-acq-life-proposal-opening`                                          |
> | Código                   | `carbon-acquisition-life-proposal-opening/app`                              |
> | Função sistêmica         | Uma: API Gateway                                                            |
> | Retorno do handler       | Comentário do código promete 204; o contrato visto no início é `event.body` |
> | DLQ                      | Não se aplica                                                               |
> | Quebrar em duas lambdas? | Não                                                                         |

**Caminho do código:** `carbon-acquisition-life-proposal-opening/app`
**Nome da função na AWS (Terraform):** `carbon-acq-life-proposal-opening`
**Classificação:** ✅ OK

## Resumo

A lambda trata `POST` da API de abertura de proposta de vida (path de domínio `proposal-opening/life` e path part `proposal-opening`). O handler valida `event.body`. Não há SQS.

## Gatilhos no Terraform

| Tipo             | Recurso / Detalhe                                                                                                                      | Arquivo:linha                                                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway REST | `POST`, stage `v1`, path part default `proposal-opening`, custom domain `proposal-opening/life`, permission `apigateway.amazonaws.com` | `carbon-acquisition-life-proposal-opening/infra/variables.tf:6-32`; `carbon-acquisition-life-proposal-opening/infra/modules/lambda-event-source/main.tf:5-10` |

## Eventos tratados no handler

| Tipo de evento | Evidência no código               | Arquivo:linha                                                 |
| -------------- | --------------------------------- | ------------------------------------------------------------- |
| API Gateway    | `event.body` deve ser string JSON | `carbon-acquisition-life-proposal-opening/app/index.js:27-32` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma de tipo. Há path part `proposal-opening` e também custom domain `proposal-opening/life`. Os dois são API, não fila.

## Problemas encontrados

Nenhum de gatilho duplo ou DLQ.

## Recomendação

Nenhuma separação.

## Débitos técnicos

| Item                                          | Evidência                                                         | Efeito                                                                     |
| --------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Dois paths de API (path part e custom domain) | `variables.tf:24-28` `proposal-opening` e `proposal-opening/life` | Não é dois gatilhos de tipos diferentes; pode confundir o contrato público |
| `source_arn` sem barra                        | `lambda-event-source/main.tf:10`                                  | Mesmo risco de permission das outras lambdas deste padrão                  |

## Erros que acontecem ou podem acontecer

| Situação        | O que ocorre                                                       | Evidência            |
| --------------- | ------------------------------------------------------------------ | -------------------- |
| Body não string | `ValidationError`. O comentário do handler promete status de erro. | `app/index.js:27-30` |

## Oportunidades

Documentar qual path é o público. Não criar consumidor SQS nesta função.

## Melhorias identificadas

- Documentar qual path é o público (`proposal-opening` ou `proposal-opening/life`).
- Conferir a barra do `source_arn` da permission.
- Não criar consumidor de fila nesta lambda.

## Observações

Permission `source_arn` sem barra entre execution ARN e stage (`lambda-event-source/main.tf:10`). Não encontrado SQS.

# carbon-acquisition-life-quotation

> **Atualização de segurança — item 4, 18/11/2026:** nos três fluxos de Vida, logs de payload e erros completos foram substituídos por metadados; Pino recebeu normalização segura de erros e redação defensiva; data tracing de payload foi desativado no API Gateway. Os 54 testes locais de privacidade passaram. [Escopo e limites](../../docs/fixes/04-life-log-privacy.md). O diagnóstico abaixo é histórico e o selo de gatilho não certifica segurança global.

> **Leitura rápida**
>
> |                          |                                                                                      |
> | ------------------------ | ------------------------------------------------------------------------------------ |
> | Classificação            | ⚠️ ATENÇÃO                                                                           |
> | Função AWS               | `carbon-acquisition-life-quotation`                                                  |
> | Código                   | `carbon-acquisition-life-quotation/app`                                              |
> | Função sistêmica         | Uma: API Gateway                                                                     |
> | Retorno do handler       | Há `return` no fim, mas body inválido estoura `ReferenceError` antes do `catch` útil |
> | DLQ                      | Não se aplica                                                                        |
> | Quebrar em duas lambdas? | Não                                                                                  |

**Caminho do código:** `carbon-acquisition-life-quotation/app`
**Nome da função na AWS (Terraform):** `carbon-acquisition-life-quotation`
**Classificação:** ⚠️ ATENÇÃO

## Resumo

A lambda trata `POST` no custom domain `quotation/life`. O Terraform liga só API Gateway e o código lê `event.body`. Há bug: `error` não é importado, então validação de body vira exceção não tratada e a lambda pode não devolver `{ statusCode }`.

## Gatilhos no Terraform

| Tipo             | Recurso / Detalhe                                                                  | Arquivo:linha                                                                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway REST | `POST /`, stage `v1`, path `quotation/life`, permission `apigateway.amazonaws.com` | `carbon-acquisition-life-quotation/infra/variables.tf:6-23`; `carbon-acquisition-life-quotation/infra/modules/lambda-event-source/main.tf:5-10` |

## Eventos tratados no handler

| Tipo de evento | Evidência no código                                                        | Arquivo:linha                                                    |
| -------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| API Gateway    | `event.body`; retorno `{ statusCode, body }` no caminho feliz e no `catch` | `carbon-acquisition-life-quotation/app/index.js:11-16` e `48-53` |

**Ramificação por tipo de evento no handler?** Não.

## Divergências Terraform × Código

Nenhuma de gatilho.

## Problemas encontrados

1. **Alta** — `throw new error.ValidationError(...)` usa `error` sem `require`. Body que não é string gera `ReferenceError` fora do tratamento de `ValidationError`. O API Gateway recebe falha da lambda em vez de 400. Evidência: `app/index.js:1-13` (imports não incluem `error`; uso na linha 13).
2. **Média** — Depois do 200, o código lê `event?.lifeinsurance?.date_of_birth` em vez do body parseado (`inputData`). Campo morto / dado errado. Evidência: `app/index.js:20-24`.

## Recomendação

Não separar gatilhos. Importar o módulo de erro e ler a data de nascimento do body já parseado, para o handler sempre devolver status HTTP.

## Débitos técnicos

| Item                             | Evidência            | Efeito                                              |
| -------------------------------- | -------------------- | --------------------------------------------------- |
| `error` usado sem import         | `app/index.js:1-13`  | Validação de body quebrada                          |
| Leitura de `event.lifeinsurance` | `app/index.js:20-24` | Dado de data de nascimento não vem do body parseado |

## Erros que acontecem ou podem acontecer

| Situação                                                  | O que ocorre                                                                                                                              | Evidência                                                 |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Body não é string                                         | `ReferenceError: error is not defined` antes do `catch` tratar `ValidationError`. API Gateway recebe falha da lambda, sem 400 controlado. | `app/index.js:13`                                         |
| Exceção dentro do `try` depois do import implícito falhar | Se o `ReferenceError` ocorrer dentro do `try`, o `catch` ainda devolve 500 genérico (`UnknownError`), não 400.                            | `app/index.js:13` está dentro do `try` (`index.js:10-16`) |
| Sucesso com campo errado                                  | Loga `dateOfBirth` undefined e segue com `quotation.statusCode`.                                                                          | `app/index.js:20-28`                                      |

## Oportunidades

Importar o módulo de erro e ler a data do `inputData`. Não separar gatilho.

## Melhorias identificadas

- Importar o módulo de erro usado em `throw new error.ValidationError`, para body inválido voltar 400 e não `ReferenceError`.
- Ler a data de nascimento do body já parseado (`inputData`), não de `event.lifeinsurance`.
- Não separar gatilho: só há API Gateway.

## Observações

Não encontrado SQS. Procurei `infra/modules/lambda-event-source/main.tf`.

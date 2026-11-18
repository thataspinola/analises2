# carbon-support-income-bracket-life

> **Leitura rápida**
>
> |                          |                                                                    |
> | ------------------------ | ------------------------------------------------------------------ |
> | Classificação            | ⚠️ ATENÇÃO                                                         |
> | Função AWS               | `carbon-support-income-bracket-life`                               |
> | Código                   | `carbon-support-life-income-bracket/app`                           |
> | Função sistêmica         | Uma: API Gateway GET                                               |
> | Retorno do handler       | Sucesso devolve 200. Erro faz `throw` e não monta `{ statusCode }` |
> | DLQ                      | Não se aplica                                                      |
> | Quebrar em duas lambdas? | Não                                                                |

**Caminho do código:** `carbon-support-life-income-bracket/app`
**Nome da função na AWS (Terraform):** `carbon-support-income-bracket-life`
**Classificação:** ⚠️ ATENÇÃO

## Resumo

A lambda trata `GET` no custom domain `income-bracket/life`. Não há SQS. No erro, o controller relança a exceção e o handler não tem `catch`, então a invocação falha sem corpo HTTP.

## Gatilhos no Terraform

| Tipo             | Recurso / Detalhe                                                                    | Arquivo:linha                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway REST | `GET`, stage `v1`, path `income-bracket/life`, permission `apigateway.amazonaws.com` | `carbon-support-life-income-bracket/infra/variables.tf:6-23`; `carbon-support-life-income-bracket/infra/modules/lambda-event-source/main.tf:5-10` |

## Eventos tratados no handler

| Tipo de evento         | Evidência no código                                                     | Arquivo:linha                                                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| API Gateway            | Ignora o conteúdo do event e devolve `statusCode` do factory de sucesso | `carbon-support-life-income-bracket/app/index.js:5-11`; `carbon-support-life-income-bracket/app/src/factory/responseFactory.js:1-6`           |
| Falha sem retorno HTTP | `verify` faz `throw`; o handler não captura                             | `carbon-support-life-income-bracket/app/src/controller/faixaRendaController.js:11-16`; `carbon-support-life-income-bracket/app/index.js:5-11` |

**Ramificação por tipo de evento no handler?** Não. `verify` nem usa o argumento `event`.

## Divergências Terraform × Código

Nenhuma de gatilho. O endpoint é GET e o código não lê query/body, o que é compatível se a faixa de renda não depende de parâmetro.

## Problemas encontrados

1. **Média** — Erro da API externa estoura a lambda. Não há retorno `{ statusCode, body }`. Para API Gateway o desejável é capturar e devolver 4xx/5xx. Evidência: `index.js:5-11` e `faixaRendaController.js:11-16`.

## Recomendação

Não separar. Envolver o handler em `try/catch` e devolver status HTTP. Não é caso de lambda de fila.

## Débitos técnicos

| Item                              | Evidência                      | Efeito                                                          |
| --------------------------------- | ------------------------------ | --------------------------------------------------------------- |
| Handler sem `try/catch`           | `app/index.js:5-11`            | Erro não vira HTTP                                              |
| `verify` ignora o event e relança | `faixaRendaController.js:6-16` | GET sem parâmetro está ok; falha de integração estoura a lambda |

## Erros que acontecem ou podem acontecer

| Situação          | O que ocorre                                                                                                                                         | Evidência                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| API vida-on falha | `throw` no controller. O handler não captura. A invocação falha. O cliente do API Gateway não recebe `{ statusCode, body }` montado por este código. | `faixaRendaController.js:11-16`; `index.js:5-11` |
| Sucesso           | `statusCode` 200.                                                                                                                                    | `responseFactory.js:1-6`                         |

## Oportunidades

Capturar o erro e devolver 500 com body. Não é caso de lambda de fila.

## Melhorias identificadas

- Envolver o handler em `try/catch` e devolver 500 com `{ statusCode, body }` quando a API de faixa de renda falhar.
- Não transformar esta função em consumidora de fila.

## Observações

Não encontrado SQS. Procurei `infra/modules/lambda-event-source/main.tf`.

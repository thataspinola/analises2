# P1 — Encerramento de consultas desativadas por flag

## Problema

Os handlers de eligibility, good-card e porto-pay-cards criam uma Promise por registro e aguardam Promise.allSettled. Quando a consulta estava explicitamente desativada por flag false, registravam um log, mas não chamavam resolve nem reject. O lote ficava pendente até o timeout, embora não houvesse consulta a executar.

## Correção

Adicionado resolve() após o log do ramo desativado em cada um dos três handlers:

| Aplicação | Condição que encerra sem chamar o controller |
| --- | --- |
| app-create-deals-eligibility | parsedInput.eligibility === false |
| app-create-deals-good-card | parsedInput.creditCards === false |
| app-create-deals-porto-pay-cards | parsedInput.creditCards === false |

A Promise desse registro passa a terminar com sucesso. A entrada não é incluída em batchItemFailures somente por estar desativada. Quando todas as consultas do lote estão desativadas, o handler pode concluir com a lista de falhas vazia.

Mantido o critério estrito de comparação com false. Flags ausentes, true ou o texto "false" continuam seguindo o ramo anterior de processamento. Falhas de JSON ou rejeições do controller continuam com o tratamento já existente.

A mudança elimina a espera causada pelo ramo desativado. Não garante que integrações ou outros caminhos terminem dentro do timeout.

## Escopo e verificação — 19/11/2026

- Três linhas de produção adicionadas, uma em cada handler, e este documento local.
- node --check aprovado nos três arquivos.
- Revisão do diff e whitespace, limitada aos ramos de flags desativadas.
- Testes preexistentes, fixtures, Jest, dependências, controllers e Terraform preservados.
- Os testes existentes dos handlers foram lidos. As suítes não foram executadas e não houve criação de testes ou cenários.
- Não houve acesso AWS, chamadas reais, deploy ou apply.

## Validação na VDI/HML

Verificar o encerramento de mensagens com a flag explicitamente false, sem consulta ao controller e sem timeout causado pelo ramo desativado. Conferir o retorno batchItemFailures e a preservação do processamento das mensagens habilitadas e das falhas existentes.

Consultar as versões efetivamente implantadas. As correções anteriores de propagação de falhas dos controllers e da layer têm validação e implantação próprias, descritas no [registro anterior](09-deals-failure-propagation.md).

A revisão completa de idempotência, visibilidade de filas, logs/rastreamento e alarmes permanece separada.

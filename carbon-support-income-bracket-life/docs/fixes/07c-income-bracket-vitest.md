# Item 7C — Testes da consulta de faixa de renda de Vida

## Escopo e alterações

Este lote pertence somente a carbon-support-income-bracket-life.

- Vitest 5.1.1 substitui o runner Jest da aplicação.
- Suítes em app/test/**/*.spec.mjs, fora de src, com cobertura V8.
- Os 16 casos HTTP do item 6 foram mantidos e integrados aos testes da aplicação. O pacote separado validation/http foi removido para evitar duplicidade.
- As suítes legadas de API/controller foram migradas, com Promises aguardadas e asserts sobre os módulos reais. Os antigos mocks com body serializado duas vezes foram substituídos por verificações da resposta proxy real.
- Há testes adicionais para factory, configuração por ambiente, logger e resposta sem dados.
- O executor manual foi movido para app/scripts/localRunner.cjs e mantém NODE_ENV local. Nodemon e a dependência privada de token para desenvolvimento foram preservados.
- Os comandos de teste não dependem de export do Bash.

## Defeitos demonstrados pelos testes

1. O logger usava CONSTANT.ENV, que não existe nas constantes desta aplicação. O campo environment era emitido como a string undefined. Foi corrigido para NODE_ENV.
2. Uma resposta upstream com status 200 e sem data retornava undefined para o handler, gerando body ausente no contrato proxy. A API agora rejeita esse retorno e o handler mantém a resposta genérica HTTP 500. Uma lista vazia continua sendo uma resposta válida.

Nenhum endpoint, regra de faixa de renda, formato de sucesso ou contrato de erro público anterior foi alterado. A validação nova cobre apenas ausência de data; não inventa novas regras de schema para o catálogo upstream.

## Resultados — 19/11/2026

Node 24.22.3, npm 11.9.0, Vitest e @vitest/coverage-v8 5.1.1:

- **7 suítes, 41 testes passaram**.
- **100% statements, branches, funções e linhas**, nos nove arquivos de produção: handler, config/logger e todos os arquivos de src.
- Gates anteriores de 95% nas quatro métricas preservados. Nenhum arquivo de produção foi excluído da coleta.
- Regressão comprovada: usando logger e API anteriores, três testes falham. Com as correções, todos passam.
- O lockfile completo, incluindo a dependência privada, foi regenerado offline. npm ls --package-lock-only --all passou.
- As 21 entradas de dependências de produção mantêm suas versões e integridades.
- A camada privada @porto-seguro/hub-vendas.carbon-token 2.9.2 e o registry Nexus padrão foram mantidos.
- Sintaxe Node e git diff --cached --check passaram.

## Limite da instalação validada

A instalação completa do manifesto publicado requer a dependência privada disponível pelo Nexus. Ela **não foi executada fora da VDI**.

Para executar as suítes neste ambiente, foi usada uma instalação temporária de desenvolvimento público sem a camada privada. npm ci --ignore-scripts e npm ls --all passaram nessa instalação temporária. O manifesto e o lockfile publicados foram restaurados com a dependência privada preservada. As versões e integridades das dependências de produção conferem entre os dois grafos.

Isso comprova os testes com colaboradores simulados, não uma instalação completa pelo registry corporativo.

## Como executar na VDI

A partir da pasta deste miniprojeto:

```bash
cd app
npm ci
npm test
npm run coverage
```

Para watch: npm run tdd. O modo npm run dev é manual, exige os recursos corporativos e pode chamar serviços reais; não é executado pela suíte.

## Isolamento e pendências

Os testes usam createRequire e mock-require 3.0.3 apenas em desenvolvimento. Handler, controller, API, factories, configuração e logger são carregados dos fontes CommonJS reais, sem VM. Axios e a camada de token são simulados. Dotenv é simulado para evitar leitura de arquivos .env reais nos testes. Os cenários de configuração usam variáveis controladas e restauradas após cada caso.

O helper limpa o cache de fontes desta aplicação e remove os mocks após os testes. Não há import de outro miniprojeto.

Continuam pendentes a instalação completa na VDI, as chamadas reais de integração, E2E, Windows e implantação. A cobertura não representa certificação de toda a operação em HML nem dos demais projetos.

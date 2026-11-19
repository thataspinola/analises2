# Item 7B — Migração do abandono de cotação para Vitest

## Escopo

Somente `app-abandoned-quotation` deste miniprojeto. O código de produção e suas dependências permanecem iguais. A migração dos demais pacotes continua pendente.

## Organização e execução

- Vitest 5.1.1 é o único runner instalado nesta aplicação.
- Removidos Jest, jest.config.js e os overrides que pertenciam à árvore legada.
- As nove suítes ficam em `test/**/*.spec.mjs`, fora de src.
- Fixtures e helper de CommonJS ficam em test/fixtures e test/helpers.
- O executor manual foi movido para scripts/localRunner.cjs. Ele continua sendo uma execução manual com integração real, não é chamado pelos testes.
- npm test executa Vitest uma vez, npm run tdd inicia watch e npm run coverage executa a suíte com V8.
- Os comandos de teste e cobertura não dependem de export do Bash.

A partir de app-abandoned-quotation, na VDI:

```bash
npm ci
npm test
npm run coverage
```

Fora da VDI, para usar somente pacotes públicos:

```bash
npm ci --ignore-scripts --registry=https://registry.npmjs.org
npm test
npm run coverage
```

O .npmrc corporativo foi preservado. A validação pelo Nexus ainda depende da VDI. A execução comprovada usou Node 24.22.3; os metadados existentes de engines da aplicação foram preservados.

## Mocks de CommonJS

O código de produção continua usando require e exports. Os testes usam createRequire e mock-require 3.0.3, somente como dependência de desenvolvimento, para registrar colaboradores antes da captura de exports desestruturados.

O helper elimina apenas o cache de index.js e src desta aplicação. Os mocks são removidos após cada teste e os forks do Vitest mantêm isolamento entre arquivos. Não há helper compartilhado com outro miniprojeto. A cobertura é capturada pelo V8 sobre os módulos CommonJS reais, sem um executor de código por VM.

## Validação — 18/11/2026

- npm ci --ignore-scripts com registry público: passou.
- npm ls --all: passou.
- **9 suítes e 39 testes passaram**, mantendo todos os casos anteriores.
- Cobertura V8: **100% statements, branches, funções e linhas**.
- Gates preservados: statements 92%, branches 90%, funções 93% e linhas 92%.
- Comparação dos lcov: os mesmos **13 arquivos de produção** são medidos no Jest anterior e no Vitest. A exclusão anterior de src/property foi preservada.
- Todas as 40 entradas de dependências de produção mantêm versão e integridade do lockfile anterior.
- Ausência do pacote runner Jest no lockfile confirmada.
- Regressões controladas na cópia de validação: a suíte rejeitou um código de status incorreto no payload e o uso de eventID como checkpoint em lugar do SequenceNumber. Os fontes foram restaurados após essas verificações.
- Sintaxe Node e git diff --cached --check: passaram.

As respostas de stream, as regras de negócio, os endpoints e o Terraform não mudam. Não foram realizadas chamadas AWS/corporativas, deploy, E2E ou teste efetivo em Windows. Cobertura do código não comprova todos os cenários operacionais em HML.

## Continuidade

A migração desta aplicação está concluída no código. Continuam pendentes a instalação pelo Nexus, as validações corporativas e a migração dos demais pacotes. O documento 7A fica como histórico da etapa de regularização anterior.

Referências: [Vitest — mocking](https://vitest.dev/guide/mocking/modules.html) e [Vitest — cobertura](https://vitest.dev/guide/coverage.html).

# Item 7A — Instalação e cobertura do abandono de cotação

> Atualização: esta etapa é histórica. A migração para Vitest desta aplicação foi concluída no item 7B. Consulte [comandos e evidências atuais](07b-abandoned-quotation-vitest.md).

## Escopo

Correção restrita à aplicação `app-abandoned-quotation` deste miniprojeto. Nenhum arquivo é compartilhado com outro miniprojeto e a aplicação pode executar seus testes sem carregar `app-create-lead`.

## Correções

- Lockfile regenerado para corrigir a posição das dependências transitivas de brace-expansion e balanced-match.
- URLs dos pacotes públicos normalizadas para registry.npmjs.org. Esse domínio tem semântica especial no npm: representa o registry configurado. O arquivo .npmrc corporativo permanece intacto, com Nexus como padrão. Nesta execução local foi usado override explícito de registry na linha de comando.
- Removidos overrides obsoletos de glob e test-exclude/minimatch, incluindo a regra transitiva antiga de brace-expansion nos reporters. test-exclude 7.0.2 exige minimatch 10, mas a configuração forçava 3.1.5 e quebrava a instrumentação com "minimatch is not a function".
- Fixture passou a usar um timestamp sintético fixo, sem importar constantes de app-create-lead. Removidas estruturas de mock sem uso.
- Comandos de teste deixam de depender de export do Bash. test, tdd e coverage chamam diretamente o runner. O código da aplicação já usa NODE_ENV local por padrão quando a variável não está definida.
- Teste do contrato operacional de log captura JSON real do Pino e verifica metadados, severidade, mensagem e timestamp. Isso cobre os callbacks antes não exercitados.

As versões e integridades de todas as dependências de produção foram preservadas. O código de produção, o contrato de stream e a infraestrutura não mudam.

## Resultado — 18/11/2026

Node 24.22.3, npm 11.9.0 e Jest 30.5.2:

- npm ci --ignore-scripts com registry público explícito: passou.
- npm ls --all: passou, sem árvore inválida.
- 9 suítes, **39 testes passaram**.
- Cobertura do escopo configurado: **100% statements, branches, funções e linhas**.
- Gates preservados: statements 92%, branches 90%, funções 93% e linhas 92%.
- Sintaxe Node dos arquivos alterados e git diff --cached --check: passaram.

A primeira execução demonstrou os problemas: import da fixture impedia duas suítes de carregar e a configuração de minimatch impedia a cobertura. Após as correções, a cobertura chegou a ser medida em 75% de funções, abaixo de 93%. O teste de logs agora cobre os callbacks reais e faz o gate passar, sem excluir novos arquivos nem reduzir os limites.

## Como executar

A partir de app-abandoned-quotation, na VDI com acesso ao registry corporativo:

```bash
npm ci
npm test
npm run coverage
```

Para reproduzir exclusivamente com pacotes públicos fora da VDI:

```bash
npm ci --ignore-scripts --registry=https://registry.npmjs.org
npm test
npm run coverage
```

O comando corporativo padrão ainda precisa ser executado na VDI para confirmar disponibilidade no Nexus. A validação foi em Linux; a retirada do export elimina essa dependência de Bash, mas não representa teste efetivo em Windows.

## Pendências do item 7

Jest era o runner legado durante esta etapa histórica. Ele foi removido desta aplicação no item 7B, com testes em test e gates preservados. A expansão aos demais pacotes e as validações corporativas continuam pendentes. Esta etapa não encerra o item 7 em todos os projetos.

Não foram executados chamadas corporativas/AWS, deploy, testes de carga ou ponta a ponta. A cobertura mede o escopo já configurado no Jest, com as exclusões anteriores preservadas. Ela não comprova todos os comportamentos em ambiente real nem sanitização global dos logs.

Referência: [npm — formato e semântica do package-lock.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json/).

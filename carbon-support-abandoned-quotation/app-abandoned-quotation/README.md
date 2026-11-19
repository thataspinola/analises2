# Testes do abandono de cotação

Runner: Vitest. Suítes em `test/**/*.spec.mjs`, fixtures locais e cobertura V8.

Na VDI, a partir desta pasta:

```bash
npm ci
npm test
npm run coverage
```

Para watch: `npm run tdd`. Gates: 92% statements, 90% branches, 93% funções e 92% linhas.

A instalação fora da VDI pode usar explicitamente `npm ci --ignore-scripts --registry=https://registry.npmjs.org`. O Nexus continua como registry padrão no .npmrc.

Os testes simulam os colaboradores externos. `npm run dev` é o executor manual de integração e pode chamar serviços reais; não faz parte da suíte automatizada.

[Escopo, resultados e limites da migração](../docs/fixes/07b-abandoned-quotation-vitest.md).

# Testes locais de privacidade dos logs

Escopo exclusivo: `carbon-acquisition-life-quotation`.

A partir da pasta deste miniprojeto:

```bash
cd validation/logging
npm ci
npm test
```

Requisitos: Node.js >=24 e npm. Pacote privado com lockfile próprio; não usa arquivos de projetos vizinhos. O manifesto/lock original de validação foi preservado, incluindo os aliases de Pino; esta suíte importa apenas `pino6`, correspondente à aplicação.

Os testes carregam os fontes CommonJS locais e capturam saída real do Pino. APIs, layers privadas, validação e transformação de entrada são simuladas. Não acessam AWS nem serviços corporativos. Não substituem as suítes legadas nem comprovam cobertura global.

A suíte foi separada da validação original conjunta de 54 testes. Em 18/11/2026, após a correção HTTP do item 6, os 18 testes locais desta aplicação passaram com Node 24.22.3 e Vitest 5.1.1.

Detalhes: [correção de privacidade](../../docs/fixes/04-life-log-privacy.md).

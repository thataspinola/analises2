# Testes de contrato HTTP

Escopo exclusivo: `carbon-support-income-bracket-life`.

Requisitos: Node >=24 e npm. A partir desta pasta:

```bash
npm ci
npm test
```

Vitest carrega os fontes locais em um loader CommonJS com colaboradores externos simulados, sem AWS nem APIs corporativas. O logger Pino é real.

Este pacote é privado e possui manifesto e lockfile próprios. Não modifica dependências da Lambda, não acessa projetos vizinhos e não substitui a suíte legada nem sua cobertura global.

[Escopo, resultados e limites](../../docs/fixes/06-http-errors.md).

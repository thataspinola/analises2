# Testes locais de privacidade dos logs

Escopo exclusivo: `carbon-acq-life-proposal-opening`.

A partir da pasta deste miniprojeto:

```bash
cd validation/logging
npm ci
npm test
```

Requisitos: Node.js >=24 e npm. Pacote privado com lockfile próprio; não usa arquivos de projetos vizinhos. O manifesto/lock original de validação foi preservado, incluindo os aliases de Pino; esta suíte importa apenas `pino10`, correspondente à aplicação.

Os testes carregam os fontes CommonJS locais e capturam saída real do Pino. APIs, layers privadas, validação e transformação de entrada são simuladas. Não acessam AWS nem serviços corporativos. Não substituem as suítes legadas nem comprovam cobertura global.

A suíte foi separada da validação original de 54 testes; esta reorganização ainda não foi executada, pois o ambiente de execução está indisponível.

Detalhes: [correção de privacidade](../../docs/fixes/04-life-log-privacy.md).

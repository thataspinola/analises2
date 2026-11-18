# Life flow logging privacy regression tests

Escopo: cotação, abertura e confirmação de propostas de Vida.

```bash
cd validation/logging
npm ci
npm test
```

Requisitos: Node.js >=24 e npm. Os testes usam Vitest e capturam as linhas
JSON emitidas pelas versões Pino 6.4.1, 8.15.1 e 10.3.1 presentes nos manifests
dos três serviços. São dependências somente de desenvolvimento deste pacote
privado; os manifests das Lambdas não são alterados.

Os módulos CommonJS são carregados diretamente dos fontes. O sink Pino é real;
as integrações externas, validação de entrada e a transformação de payload
de abertura são substituídas por colaboradores locais. Nenhuma chamada sai
para AWS, APIs corporativas ou layers privadas.

Os testes não substituem a validação funcional completa ou as suítes legadas.
Documentação do lote: [item 4](../../docs/fixes/04-life-log-privacy.md).

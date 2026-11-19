# Consulta de faixa de renda de Vida

API de suporte que consulta as faixas de renda do produto Vida. A aplicação usa integração HTTP e uma camada privada de token. O handler retorna o contrato proxy de API Gateway.

## Testes

Requisito validado: Node 24.22.3. A partir desta pasta, na VDI com acesso ao Nexus:

```bash
cd app
npm ci
npm test
npm run coverage
```

Vitest é o único runner da aplicação. Suítes em app/test/*.spec.mjs e subpastas. Gates de cobertura: 95% em statements, branches, funções e linhas.

A dependência privada de token permanece no manifesto. Não há garantia de instalação completa fora da VDI. Os testes simulam Axios/token e não chamam AWS ou APIs corporativas.

npm run tdd executa watch. npm run dev, a partir de app, é o modo manual de integração e pode chamar serviços reais.

[Detalhes dos testes e limites](docs/fixes/07c-income-bracket-vitest.md).

[Correção do contrato HTTP](docs/fixes/06-http-errors.md).

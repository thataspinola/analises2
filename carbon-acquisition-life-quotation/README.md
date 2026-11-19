# Cotação de seguro de Vida

Lambda responsável por validar a entrada, consultar ofertas de Vida e montar as cotações. `app` contém a aplicação Node.js e seus testes; `infra` contém a infraestrutura Terraform. Este miniprojeto é independente das demais pastas do repositório.

## Instalação e testes

Validado com Node 24.22.3 e npm 11.9.0. Na VDI, com acesso e autenticação corporativa no Nexus:

```bash
cd app
npm ci
npm test
npm run coverage
```

`@porto-seguro/hub-vendas.carbon-token@2.9.2` é uma dependência privada existente. O lockfile mantém sua origem Nexus; configure o registry/autenticação conforme o ambiente corporativo, sem versionar credenciais.

Vitest é o único runner. `npm run tdd` acompanha alterações. Os testes ficam em `app/test`, usam dados fictícios e simulam token e Axios. A cobertura inclui handler, logger e todos os módulos de `src`, com mínimo global de 90% para linhas, statements, branches e funções. Resultados em `app/coverage`.

Os antigos pacotes `validation/http` e `validation/logging` foram consolidados na suíte da aplicação. Não há imports de outros miniprojetos.

## Execução manual

`npm run dev` executa `scripts/localRunner.cjs` com `NODE_ENV=local`; `npm run prd` preserva a opção manual com `NODE_ENV=production`. Esses comandos fazem chamadas reais e exigem as configurações, credenciais e conectividade do ambiente autorizado. Não fazem parte dos testes automatizados.

O evento do API Gateway deve conter `body` como string JSON. Exemplo de entrada fictícia:

```json
{
  "body": "{\"lifeinsurance\":{\"date_of_birth\":\"1988-03-27\",\"susep\":\"synthetic\",\"salesMedium\":\"synthetic\"}}"
}
```

A validação e o tratamento HTTP estão descritos no [item 6](docs/fixes/06-http-validation.md). A proteção dos logs está descrita no [item 4](docs/fixes/04-life-log-privacy.md). Consulte o [item 7D](docs/fixes/07d-life-quotation-vitest.md) para escopo, resultados e limites desta migração.

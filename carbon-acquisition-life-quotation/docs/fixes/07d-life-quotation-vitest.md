# Item 7D — Vitest na cotação de Vida

## Alteração

Migração exclusiva de `carbon-acquisition-life-quotation`. Jest foi removido do manifesto e sua configuração foi substituída por Vitest 5.1.1 e cobertura V8. Os testes ficam em `app/test`, com sufixo `.spec.mjs`. Fixtures CommonJS são carregadas pelo mecanismo nativo do Node, incluindo a vinculação de `this` usada nos fixtures legados; não há execução de fontes em VM.

Os 44 cenários da suíte legada, os 54 testes HTTP e os 18 testes de privacidade foram migrados. Os pacotes duplicados `validation/http` e `validation/logging` foram removidos. Foram acrescentados 11 cenários para configuração por ambiente, lista vazia de ofertas, ordenação/recomendação de planos, agrupamento dos pagamentos e contrato de mensagens opcionais de erro. Dois fixtures não utilizados foram removidos.

A suíte usa Ajv, schema, factories e Pino reais. Nos testes HTTP e de privacidade, a transformação de sucesso é um colaborador simulado; os testes legados de handler/factory e os novos contratos exercitam a transformação real. Token privado e Axios são sempre simulados; dotenv não lê arquivos de ambiente durante os testes. O teste estático do API Gateway continua conferindo o Terraform deste próprio miniprojeto.

Não houve alteração no handler, logger, controllers, APIs, schema, factories ou Terraform. O runner manual mudou para `app/scripts/localRunner.cjs`; `dev` e `prd` preservam os respectivos ambientes sem depender do comando shell `export`.

## Cobertura e execução — 19/11/2026

Node 24.22.3, npm 11.9.0:

- **10 suítes / 127 testes aprovados**.
- Linhas: **98,83%**; statements: **98,47%**; branches: **96,8%**; funções: **100%**.
- Incluídos os 18 arquivos de produção: `index.js`, `logger/**/*.js` e `src/**/*.js`, sem exclusões dentro desses conjuntos.
- Mínimo global elevado de 85/84/85/85 para **90% nas quatro métricas**.
- Instalação pública reproduzível com `npm ci --ignore-scripts` e `npm ls --all`: aprovados, usando manifesto temporário de validação sem o pacote privado. Manifesto e lockfile finais foram restaurados após a execução.
- As 46 entradas da árvore de produção têm as mesmas versões e integridades nos lockfiles público de validação e final.
- Lockfile final completo regenerado offline e árvore virtual verificada com `npm ls --package-lock-only --all`.

O projeto não tinha `app/package-lock.json`. A exceção local no `.gitignore` permite versionar o lockfile da aplicação. O novo lockfile fixa o grafo resolvido para as faixas já declaradas das dependências de produção; essas faixas não foram alteradas. Não é possível comparar esse grafo com um lockfile de produção anterior inexistente no repositório.

O pacote privado mantém versão 2.9.2, origem Nexus e integridade já registrada no repositório para essa versão. Sua subárvore de dependências está incluída no lockfile final. Não houve download do pacote privado neste ambiente. O manifesto temporário foi usado apenas na validação e não faz parte do commit.

## Validação pendente na VDI

O `npm ci` do manifesto final, com a dependência privada, **não foi executado** aqui. Na VDI, com Nexus autorizado, executar:

```bash
cd app
npm ci
npm test
npm run coverage
```

Não foram feitas chamadas reais a APIs corporativas, AWS, deploy ou plano/apply Terraform. Execução manual, layer real, comportamento em Windows e integração real continuam pendentes. A sintaxe dos scripts foi tornada independente do `export`, mas isso não certifica uma execução Windows.

A cobertura é global para os fontes incluídos e não significa certificação de todas as regras de produto. Os demais miniprojetos seguem com suas próprias dependências, configuração e migrações.

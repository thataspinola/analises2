# Item 6 — Erros HTTP na consulta de faixa de renda

> Atualização de 19/11/2026: os casos HTTP foram integrados à suíte da aplicação no item 7C. O pacote validation/http foi removido. Consulte [comandos e evidências atuais](07c-income-bracket-vitest.md).

## Comportamento corrigido

O handler GET não capturava falhas e o controller dependia de logger global para registrar uma exceção com detalhes upstream. Isso podia falhar novamente com ReferenceError quando o controller era carregado isoladamente.

Agora o controller propaga a falha original, sem depender de logger global. O handler usa um logger local, captura falhas assíncronas/síncronas e de serialização e retorna o contrato proxy:

| Situação | HTTP | Corpo |
| --- | ---: | --- |
| Consulta bem-sucedida | 200 | Dados upstream existentes |
| Falha de token, API ou serialização | 500 | `{"status":"error","message":"Unable to retrieve income brackets"}` |

O log de falha usa mensagem fixa e metadado de operação. Não recebe erro bruto, stack, mensagem externa, headers ou payloads. O carregamento do handler deixa de alterar `global.logger`.

O GET continua sem parâmetros obrigatórios. Não foram introduzidas regras de validação sem respaldo no contrato existente. Não houve alteração de infraestrutura, endpoints ou dependências de produção. O teste legado do controller foi ajustado para aguardar as Promises e conferir a exceção original; a migração global de Jest não faz parte deste item.

## Testes — 18/11/2026

Node 24.22.3, Vitest 5.1.1 e Pino 6.4.1 real no pacote privado `validation/http` usado à época:

- `npm ci --ignore-scripts` com registry público: passou.
- **16 testes HTTP passaram**.
- Cobertos sucesso, token, resposta de erro upstream, ausência de resposta, erro inesperado, rejeição nula, resposta inválida e falha de serialização.
- Conferidos formato proxy, preservação do payload de sucesso e header de token.
- Conferidas ausência de dados sensíveis fictícios em logs/resposta, uma emissão por falha e ausência de mutação do logger global.
- Controller isolado preserva a identidade do erro original.
- Regressão: com os três arquivos de produção anteriores, 15 dos 16 casos falham; com a correção, os 16 passam.
- Sintaxe Node dos arquivos materializados e `git diff --cached --check`: passaram.

A partir desta pasta de miniprojeto:

```bash
cd app
npm ci
npm test
```

Os módulos de handler, controller, API, factory e logger são carregados dos fontes locais. Axios e a layer privada de token são simulados. Na etapa 7C, as verificações foram consolidadas na aplicação com dependências locais, sem acesso a miniprojetos vizinhos. O teste não faz chamadas a serviços reais.

## Limites e validação corporativa

Não foram executados deploy, chamadas AWS/corporativas ou plano/apply Terraform. As suítes Jest completas e a cobertura global não foram executadas; nenhum threshold foi reduzido.

Na VDI/HML, conferir sucesso, falha controlada de token/API e HTTP 500 com corpo estático através do API Gateway. O tracing do Gateway e as layers externas não são certificados por estes testes; a revisão de privacidade deste lote é do tratamento de falhas alterado.

Este documento cobre exclusivamente este miniprojeto.

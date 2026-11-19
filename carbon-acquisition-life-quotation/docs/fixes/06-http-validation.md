# Item 6 — Validação HTTP da cotação de Vida

> Atualização de escopo — 19/11/2026: os testes acrescentados durante estas correções foram removidos. As suítes preexistentes e suas configurações Jest foram restauradas. Os números de testes/cobertura abaixo são históricos e não certificam a suíte atual. As correções de produção descritas neste registro foram preservadas. A validação corporativa continua pendente.


> Atualização de 19/11/2026: os testes deste registro foram consolidados em `app/test`, no [item 7D](07d-life-quotation-vitest.md). Os pacotes `validation/http` e `validation/logging` foram removidos. Os resultados anteriores abaixo são históricos.


## Comportamento corrigido

O handler usava `error.ValidationError` sem importar `error`, e o controller convertia falhas de validação em 500. Agora a aplicação retorna:

| Situação | HTTP | Comportamento |
| --- | ---: | --- |
| Evento/body ausente ou body que não é string | 400 | Sem chamada de token/API |
| JSON malformado, nulo, array ou primitivo | 400 | Sem chamada do controller para JSON que não é objeto |
| Objeto incompatível com o schema existente | 400 | Ajv real rejeita antes do token/API |
| Entrada válida e integração bem-sucedida | 200 | Contrato e payload existentes |
| Falha interna, token ou integração | 500 | Tratamento genérico existente |
| Códigos de negócio upstream | Existente | Mapeamento de mensagens/status preservado |

A nova resposta 400 contém `{"status":"error","custom":false,"message":"Invalid request body"}`. Não expõe mensagens de exceção, valores rejeitados ou detalhes do schema. Somente a classe local ValidationError é classificada como erro de entrada; atribuir esse nome a um erro upstream não o transforma em 400. SyntaxError externo à conversão do body continua sendo falha interna.

A etapa de processamento passa a usar a constante existente PROCESSING_QUOTATION. Os catches do controller usam instanceof, sem acessar propriedades de rejeições nulas.

O schema de negócio não foi ampliado: por exemplo, ele exige data de nascimento como string, mas não certifica formato de calendário ou regras de idade. Os códigos de erro do produto continuam com o tratamento anterior, inclusive status 500 já existentes. Não houve mudança de infraestrutura ou dependências de produção.

## Testes — 18/11/2026

Node 24.22.3 e Vitest 5.1.1, em pacote privado local `validation/http`:

- `npm ci --ignore-scripts` com registry público: passou.
- **54 testes HTTP passaram**.
- Validação com Ajv 8.12.0, ajv-formats 2.1.1 e schema da aplicação reais.
- Logger Pino 6.4.1 real, com saída capturada em memória.
- Casos de entrada inválida comprovam ausência de chamadas externas.
- Conferidos payload de integração, data repassada ao factory e códigos de negócio existentes.
- Falhas ricas, SyntaxError interno, rejeição nula e erro upstream chamado ValidationError não expõem dados sensíveis fictícios.
- **18 testes de privacidade existentes passaram**, a partir do pacote local `validation/logging`.
- Regressão: com os três arquivos de produção anteriores, 23 dos 54 casos HTTP falham; com a correção, os 54 passam.
- Sintaxe Node dos arquivos materializados e `git diff --cached --check`: passaram.

Comandos a partir desta pasta de miniprojeto:

Execução da suíte adicional retirada do escopo atual. Use somente os testes preexistentes do miniprojeto.

A suíte atual inclui privacidade no mesmo comando; não há mais instalação separada.

Os testes carregam os módulos CommonJS locais. Token privado e Axios são colaboradores simulados, e o factory de sucesso de cotação é simulado; não certificam precificação, todas as regras de produto ou serviços externos. O schema, a validação, o controller, o factory de erros e o logger são reais. Dependências e lockfile pertencem a esta pasta, sem acesso a miniprojetos vizinhos.

## Limites e validação corporativa

Não houve deploy, acesso AWS/corporativo ou plano/apply Terraform. As suítes Jest completas e sua cobertura global não foram executadas; os thresholds existentes não foram reduzidos.

Na VDI/HML, validar o endpoint com JSON inválido, campos obrigatórios ausentes, sucesso e códigos de negócio. A mudança intencional de 500 para 400 em entradas inválidas deve ser conferida com os consumidores da API. Confirmar que logs e respostas não contêm payloads privados.

Este documento cobre exclusivamente a correção HTTP deste miniprojeto.

# carbon-support-create-lead

- Repositório: `support-create-lead/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app-create-lead/`
- Classificação: ATENÇÃO
- Funções sistêmicas: 1 (endpoint `POST /create-lead`)

## Resumo

A função cria o lead no Dynamics. Ela obtém ou atualiza o cadastro da pessoa, gera os tokens de acesso, chama a layer de integração com o Dynamics e, quando a origem é o simulador, grava o lead como "em andamento" numa tabela DynamoDB. Tem uma única responsabilidade e é acionada apenas pelo API Gateway. Todos os fluxos devolvem uma resposta HTTP. O ponto de atenção é que o status HTTP de erro vem do campo `code` do erro, inclusive para erros que chegam de componentes externos sem esse campo garantido.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| API Gateway REST | API `carbon-support-create-lead-gateway` | `POST /create-lead`, integração proxy | `infra/modules/api-gateway/main.tf:22-56` |

O repositório também tem um stream DynamoDB, mas ele aciona a lambda vizinha `carbon-support-abandoned-quotation` (pasta `app-abandoned-quotation/`), não esta. Não há outros gatilhos para esta função no Terraform.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Requisição HTTP do API Gateway | Lê `event.body` e faz `JSON.parse` | `app-create-lead/index.js:9-14` |

Ramificação por tipo de evento: Não. A escolha entre atualizar o cadastro por SNS ou pela API de cadastro é regra de negócio sobre a mesma requisição.

## Fluxos de retorno

O handler tem um único `try/catch` (`app-create-lead/index.js:7-48`). No sucesso devolve 200 com o lead criado; em erro devolve `statusCode: error.code || 500`.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Lead criado | 200 com os dados do lead | Correto |
| Corpo ausente ou dados inválidos | 400 | Correto |
| Falha na API de cadastro | Status da API ou 500 | Correto |
| Falha no SNS de atualização de cadastro | 500 | Correto |
| Falha nas layers de token ou Dynamics, ou no DynamoDB | Status vindo de `error.code` | Problema 1 |
| Falha no DynamoDB depois de criar o lead | 500, com o lead já criado | Problema 2 |

## Dead Letter Queue

Não se aplica. A função não consome fila.

## Divergências Terraform x Código

Nenhuma. O Terraform declara só o `POST /create-lead`, e o código trata só requisições HTTP.

## Problemas encontrados

### 1. Status HTTP vindo de `error.code` sem validação (Média)

- O que acontece: erros das layers de token e de Dynamics e do SDK do DynamoDB chegam ao handler sem tratamento, e o campo `code` deles vira o status da resposta.
- Por que é um problema: o código dessas layers não está neste repositório. Para o Dynamics, o próprio código compara o `code` com 422 (`app-create-lead/src/factory/errorCodeFactory.js:12`), o que indica um valor numérico. Para o token e para o SDK, não há essa garantia; se o `code` vier como texto, a resposta fica inválida e o cliente recebe 502.
- Como corrigir: aceitar `error.code` somente quando for um inteiro entre 400 e 599 e usar 500 nos demais casos.
- Onde: `app-create-lead/index.js:40`

### 2. Falha no DynamoDB depois de criar o lead devolve erro (Baixa)

- O que acontece: na origem do simulador, o lead é criado no Dynamics e só depois gravado no DynamoDB. Se a gravação falhar, a resposta é 500.
- Por que é um problema: o cliente entende que o lead não foi criado e pode tentar de novo, gerando lead duplicado ou erro de duplicidade.
- Como corrigir: tratar a falha nessa gravação como aviso, ou devolver o identificador do lead criado junto com o erro.
- Onde: `app-create-lead/src/controller/createLeadController.js:53-79`

### 3. Timeout da função maior que o limite do API Gateway (Baixa)

- O que acontece: a função tem timeout de 60 s, mas a integração do API Gateway espera no máximo 29 s.
- Por que é um problema: acima de 29 s o cliente recebe 504, enquanto a função pode continuar e criar o lead.
- Como corrigir: reduzir o timeout para no máximo 29 s.
- Onde: `infra/prd.tfvars:13`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Validar o status HTTP de erro (problema 1).

## Observações

- O arquivo `app-create-lead/src/api/governancaDados/dadosPessoaApi/v1/pessoa/documentoIdentificacaoEndpoint.js` não é usado pelo fluxo atual.

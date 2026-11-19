# carbon-support-auto-vehicle-search

- Repositório: `vehicle-search/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: ATENÇÃO
- Funções sistêmicas: 1 (endpoint `GET /auto-vehicle-search`)

## Resumo

A função consulta dados de veículos na API do produto Auto, por placa ou por descrição e ano-modelo, e devolve a lista de versões encontradas. Tem uma única responsabilidade e é acionada apenas pelo API Gateway, então não precisa ser dividida. Os erros viram respostas HTTP corretas. O ponto de atenção é um fluxo em que a função responde 200 sem corpo, porque o dado retornado fica `undefined`.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| API Gateway REST | API `carbon-support-auto-vehicle-search-gateway` | `GET /auto-vehicle-search`, integração proxy | `infra/modules/api-gateway/main.tf:42-67` |

A API é privada e é acessada pelo endpoint `execute-api`, sem path em domínio customizado. Não há outros gatilhos para esta função no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Requisição HTTP do API Gateway | Lê `plate`, `description` e `yearModel` de `queryStringParameters` | `app/index.js:6-8` |

Ramificação por tipo de evento: Não. A escolha entre busca por placa e busca por descrição é regra de negócio sobre a mesma requisição.

## Fluxos de retorno

O handler tem um único `try/catch` (`app/index.js:4-38`). No sucesso devolve 200 com a lista serializada; em erro devolve `error.code` ou 500. Os erros possíveis têm código numérico: validação (400), API do produto (status da API ou 500) e token (500, porque o erro é recriado sem código).

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Veículos encontrados | 200 com a lista | Correto |
| Parâmetros ausentes ou inválidos | 400 | Correto |
| Falha na API do produto ou no token | Status da API ou 500 | Correto |
| API do produto responde sem corpo | 200 sem `body` | Problema 1 |

## Dead Letter Queue

Não se aplica. A função não consome fila.

## Divergências Terraform x Código

Nenhuma. O Terraform declara só o `GET` do API Gateway, e o código trata só requisições HTTP.

## Problemas encontrados

### 1. Resposta 200 sem corpo quando a API do produto não devolve dados (Média)

- O que acontece: se a API do produto responde sem conteúdo, a função que formata os dados devolve `undefined`. O handler faz `JSON.stringify(undefined)`, que também resulta em `undefined`, e a resposta sai 200 sem `body`.

Trecho de `app/src/factory/vehicleDataFactory.js:14-15`:

```js
exports.parseDescriptionsPerPlate = (data) => {
	if (!data) return
```

- Por que é um problema: o cliente recebe sucesso sem lista nenhuma e pode quebrar ao tentar ler o corpo, ou interpretar a ausência como erro de rede.
- Como corrigir: devolver lista vazia (`[]`) ou uma resposta 404 explícita quando não houver dados. O mesmo vale para a busca por descrição (linha 39).
- Onde: `app/src/factory/vehicleDataFactory.js:15` e `:39`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Tratar o caso de resposta vazia da API do produto (problema 1).

## Observações

- A validação é feita sobre a placa sem caracteres especiais, mas a chamada à API envia a placa original (`app/src/controller/vehicleController.js:24-30`). A descrição também vai na URL sem codificação (`app/src/api/vehicleApi.js:32`); um `&` no valor altera os parâmetros enviados.

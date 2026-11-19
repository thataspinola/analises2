# carbon-acquisition-auto-quotation

- Repositório: `auto-quotation/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: ATENÇÃO
- Funções sistêmicas: 1 (endpoint `POST acquisition/auto/quotation`)

## Resumo

A função calcula a cotação de seguro auto. Ela recebe a requisição HTTP, valida os dados, pede a cotação à API do produto e, na nova jornada, cria o carrinho de compras. Tem uma única responsabilidade e é acionada apenas pelo API Gateway, então não precisa ser dividida. Os erros de negócio e de integração viram respostas HTTP corretas. Os pontos de atenção são um envio para fila que não é aguardado e o uso de `error.code` como status HTTP sem validação.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| API Gateway REST | API `carbon-acq-auto-quotation` | `POST` no recurso raiz, integração proxy | `infra/modules/api-gateway/main.tf:21` |

A API é privada e publicada no domínio interno com o path `acquisition/auto/quotation` (`infra/modules/api-mapping/variables.tf:9`). Não há outros gatilhos para esta função no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Requisição HTTP do API Gateway | Lê `event.body` e faz `JSON.parse` | `app/index.js:11-15` |

Ramificação por tipo de evento: Não. O handler trata apenas requisições HTTP.

A função também publica mensagens nas filas de atualização e de negação de lead, mas isso é uma saída do processamento, não um gatilho.

## Fluxos de retorno

O handler tem um único `try/catch` (`app/index.js:5-44`). No sucesso devolve 201 com a cotação; em qualquer erro devolve `{ statusCode, body }`, usando `error.code` como status. Todos os caminhos devolvem uma resposta; não há fluxo que termine sem `return`.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Cotação calculada | 201 com a cotação | Correto |
| Dados inválidos | 400 | Correto |
| Cotação recusada ou com erro de negócio | 400 ou 409 | Correto |
| Falha nas APIs de cotação ou carrinho | Status da API ou 500 | Correto |
| Falha ao obter o token | Status vindo de `error.code` | Problema 2 |
| Cotação sem status | 400, com envio para fila não aguardado | Problema 1 |
| Erro inesperado ao montar a resposta | 201 sem a lista de cotações | Problema 3 |

## Dead Letter Queue

Não se aplica. A função não consome fila.

## Divergências Terraform x Código

Nenhuma. O Terraform declara só o `POST` do API Gateway, e o código trata só requisições HTTP.

## Problemas encontrados

### 1. Envio para a fila de atualização de lead sem `await` (Média)

- O que acontece: quando a API do produto devolve a cotação sem status, a função manda uma mensagem para a fila de atualização de lead e, logo em seguida, responde 400. O envio não é aguardado.
- Por que é um problema: a Lambda congela o ambiente assim que o handler responde. O envio pode não ser concluído, e, se falhar, o erro fica sem tratamento. O lead pode deixar de ser atualizado sem nenhum registro.
- Como corrigir: usar `await sendMessageToUpdateLead(...)`, como já é feito nos outros ramos do mesmo `switch` (linhas 71 e 78).
- Onde: `app/src/controller/quotationController.js:55`

### 2. Status HTTP vindo de `error.code` sem validação (Média)

- O que acontece: o handler responde com `statusCode: error.code || 500`. As classes de erro do próprio código usam números (400, 409, 500), mas os erros da layer de token e do SDK da AWS chegam sem tratamento, e o campo `code` deles não é garantido.
- Por que é um problema: se o `code` vier como texto (erros de rede do Node, por exemplo, usam valores como `ECONNRESET`), a resposta fica em formato inválido e o API Gateway devolve 502 ao cliente. O catch de `getToken`, que deveria padronizar o erro do token, não funciona: a Promise é retornada sem `await` dentro do `try`, então a rejeição passa direto.
- Como corrigir: aceitar `error.code` somente quando for um inteiro entre 400 e 599 e usar 500 nos demais casos. Em `getToken`, usar `return await` dentro do `try`.
- Onde: `app/index.js:36` e `app/src/controller/quotationController.js:90-98`

### 3. Resposta 201 sem cotações quando o mapeamento falha (Baixa)

- O que acontece: a função que monta a lista de cotações só relança erros do tipo `TypeError`. Qualquer outro erro é descartado e a função devolve `undefined`.
- Por que é um problema: o cliente recebe 201 (sucesso) sem o campo `quotations`, sem indicação de falha.
- Como corrigir: relançar todos os erros no catch, e não só o `TypeError`.
- Onde: `app/src/factory/responseFactory.js:99-117`

### 4. Timeout da função maior que o limite do API Gateway (Baixa)

- O que acontece: a função tem timeout de 60 s, mas a integração do API Gateway espera no máximo 29 s.
- Por que é um problema: acima de 29 s o cliente recebe 504, enquanto a função continua executando, inclusive os envios para as filas.
- Como corrigir: reduzir o timeout para no máximo 29 s ou limitar o tempo das chamadas externas.
- Onde: `infra/prd.tfvars:12`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Corrigir, em ordem: o `await` do envio para a fila (problema 1) e a validação do status HTTP (problema 2).

## Observações

- O comportamento da layer `carbon-token` não está neste repositório. A análise considera apenas como o código trata o erro que ela devolve.

# carbon-acq-shopping-cart-manage-cart

- Repositório: `manage-cart/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: PROBLEMA
- Funções sistêmicas: 3 (endpoints `POST`, `GET` e `DELETE` em `acquisition/shopping-cart/manage-cart`, atendidos pela mesma lambda)

## Resumo

A função gerencia o carrinho de compras no Commerce (Magento). No mesmo endereço, atende três operações diferentes, escolhidas pelo método HTTP: `POST` cria ou atualiza o carrinho, `GET` consulta e `DELETE` remove um item. O API Gateway declara um único método `ANY`, que aceita qualquer método e entrega tudo à mesma função. São três endpoints distintos numa só lambda, e por isso a recomendação é dividi-la. Os fluxos de retorno estão corretos: todo erro vira uma resposta HTTP válida.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| API Gateway REST | API `carbon-acq-shopping-cart-manage-cart-gateway` | Método `ANY` no recurso raiz, integração proxy | `infra/modules/api-gateway/main.tf:22-45` |

A API é privada e publicada no domínio interno com o path `acquisition/shopping-cart/manage-cart` (`infra/variables.tf:33`). A função de cotação auto (`carbon-acquisition-auto-quotation`) usa esta API para criar o carrinho. Não há outros gatilhos no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| `POST`: criar ou atualizar carrinho | `event.httpMethod`; lê query string e `body` | `app/src/controller/requestController.js:26-38` |
| `GET`: consultar carrinho | `event.httpMethod`; lê query string | `app/src/controller/requestController.js:39-51` |
| `DELETE`: remover item | `event.httpMethod`; lê query string | `app/src/controller/requestController.js:52-67` |
| Outros métodos | Qualquer outro valor | `app/src/controller/requestController.js:68-73` |

Ramificação por tipo de evento: Sim, pelo método HTTP. O handler monta a entrada conforme o método (`app/index.js:40-51`) e o controller escolhe a operação com um `switch`.

## Fluxos de retorno

O controller converte todos os erros em resposta HTTP e o handler serializa o corpo. O status é sempre definido no código (200, 400 ou 500), e não copiado do erro.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Operação concluída | 200 com o carrinho | Correto |
| Corpo inválido ou dados inválidos | 400 | Correto |
| Método não suportado (`PUT`, `PATCH` e outros) | 400 | Correto, mas veja o problema 2 |
| Falha no Commerce | 500 | Correto |

Não foram encontrados fluxos sem retorno ou com retorno vazio.

## Dead Letter Queue

Não se aplica. A função não consome fila.

## Divergências Terraform x Código

O Terraform declara um único método `ANY`, enquanto o código implementa só `POST`, `GET` e `DELETE`. Os endpoints reais não aparecem no Terraform, e métodos não implementados chegam à função.

## Problemas encontrados

### 1. Três funções sistêmicas na mesma lambda (Média)

- O que acontece: criação, consulta e remoção de item do carrinho são três endpoints diferentes, atendidos pela mesma função e separados por um `switch` no método HTTP.
- Por que é um problema: as três operações compartilham configuração (timeout, memória, permissões) e ciclo de deploy; uma mudança numa afeta as outras. O risco é menor que o de misturar HTTP e fila, porque os três endpoints têm o mesmo formato de entrada e de resposta.
- Como corrigir: dividir em três lambdas (ver Recomendação).
- Onde: `app/src/controller/requestController.js:25-74`

### 2. Métodos não implementados chegam à função (Baixa)

- O que acontece: o método `ANY` aceita qualquer método HTTP e invoca a função, que responde 400 para os que não conhece.
- Por que é um problema: requisições inválidas consomem execuções da função, e a lista de operações suportadas não fica visível na infraestrutura.
- Como corrigir: declarar no API Gateway apenas os métodos implementados; o próprio API Gateway passa a recusar os demais.
- Onde: `infra/variables.tf:7-11`

## Recomendação

Hoje existe uma única lambda, `carbon-acq-shopping-cart-manage-cart` (pasta `app/`), que atende os três métodos. A proposta é substituí-la por três lambdas novas, que ainda não existem, cada uma com um único endpoint:

1. `carbon-acq-shopping-cart-create-cart-request` (pasta `app-create-cart-request`): `POST`, cria ou atualiza o carrinho a partir do `body`.
2. `carbon-acq-shopping-cart-get-cart-request` (pasta `app-get-cart-request`): `GET`, consulta o carrinho pela query string.
3. `carbon-acq-shopping-cart-remove-cart-item-request` (pasta `app-remove-cart-item-request`): `DELETE`, remove um item do carrinho.

Todas recebem a requisição HTTP e devolvem `{ statusCode, headers, body }`, como hoje. A validação, o cliente GraphQL do Commerce e as factories podem ir para uma layer compartilhada, como já é feito em `lead/app-common`. No Terraform, o método `ANY` é substituído por três métodos (`POST`, `GET`, `DELETE`), cada um com sua integração e sua permissão de invocação. O path público continua o mesmo, então a lambda de cotação auto não precisa mudar.

## Observações

- O timeout da função é 29 s, igual ao limite da integração do API Gateway (`infra/prd.tfvars:10`). Chamadas no limite recebem 504 do API Gateway.

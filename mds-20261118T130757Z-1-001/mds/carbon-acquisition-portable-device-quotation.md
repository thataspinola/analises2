# carbon-acquisition-portable-device-quotation

- Repositório: `portable-device-quotation/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: ATENÇÃO
- Funções sistêmicas: 1 (endpoint `POST acquisition/portable-device/quotation`)

## Resumo

A função calcula a cotação de seguro para aparelhos portáteis. Ela cria o lead, valida o cupom, pede o cálculo à API do produto e consulta o resultado repetidas vezes até ele ficar pronto. Tem uma única responsabilidade e é acionada apenas pelo API Gateway. Os erros viram respostas HTTP corretas. O ponto de atenção é o tempo: a consulta repetida pode passar do limite do API Gateway e, em casos extremos, do timeout da própria função, e o cliente recebe erro sem a resposta prevista.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| API Gateway REST | API `carbon-acquisition-portable-device-quotation-gateway` | `POST` no recurso raiz, integração proxy | `infra/modules/api-gateway/main.tf:22-45` |

A API é privada e publicada no domínio interno com o path `acquisition/portable-device/quotation` (`infra/variables.tf:33`). A permissão de invocação fica dentro do módulo da função (`infra/modules/lambda/main.tf:88-94`). Não há outros gatilhos no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Requisição HTTP do API Gateway | Lê `event.body` e faz `JSON.parse` | `app/index.js:9-16` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O controller converte todos os erros em resposta HTTP (400 para validação, 500 para os demais) e o handler serializa o corpo. Para uma função HTTP, esse é o comportamento esperado. O status é sempre definido no código, e não copiado do erro.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Cotação calculada | 200 com a cotação | Correto |
| Cupom inválido | 200 indicando cupom inválido | Correto, com ressalva (problema 2) |
| Dados inválidos | 400 | Correto |
| Falha no token, no lead, no cupom ou na API | 500 | Correto |
| Cotação não fica pronta a tempo | 504 do API Gateway ou nenhuma resposta | Problema 1 |

## Dead Letter Queue

Não se aplica. A função não consome fila.

## Divergências Terraform x Código

Nenhuma. O Terraform declara só o `POST` do API Gateway, e o código trata só requisições HTTP.

## Problemas encontrados

### 1. Consulta repetida pode estourar o tempo de resposta (Média)

- O que acontece: depois de criar o lead, obter o token e pedir o cálculo, a função consulta o resultado repetidas vezes por até 25 s, com pausa de 4 s entre as consultas (0,7 s em prd). Nenhuma chamada HTTP tem timeout definido. A integração do API Gateway espera no máximo 29 s, e a função tem timeout de 35 s.
- Por que é um problema: se as etapas anteriores levarem mais de 4 s, o API Gateway desiste antes e o cliente recebe 504, enquanto a função continua executando. Se alguma chamada travar, a função é encerrada pela AWS sem devolver resposta. O erro de tempo esgotado previsto no código (504) também é convertido em 500 pelo controller.
- Como corrigir: limitar a consulta pelo tempo restante da execução (`context.getRemainingTimeInMillis()`), com margem para os 29 s do API Gateway, definir `timeout` nas chamadas axios e devolver 504 quando o tempo acabar.
- Onde: `app/src/controller/activity/portableDeviceActions/getQuotationActivity.js:12-38`

### 2. Lead criado antes de validar o cupom (Baixa)

- O que acontece: a criação do lead, a obtenção do token e a validação do cupom rodam em paralelo.
- Por que é um problema: se o cupom for inválido ou outra etapa falhar, o cliente recebe erro, mas o lead já foi criado.
- Como corrigir: validar o cupom antes de criar o lead, ou tratar o lead criado quando o fluxo falhar.
- Onde: `app/src/controller/quotationController.js:11-29`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Controlar o tempo da consulta repetida (problema 1) e reduzir o timeout da função para no máximo 29 s.

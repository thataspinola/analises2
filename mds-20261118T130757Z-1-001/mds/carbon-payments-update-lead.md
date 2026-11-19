# carbon-payments-update-lead

- Repositório: `payments-update-lead/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: ATENÇÃO
- Funções sistêmicas: 1 (fila SQS `carbon-payments-update-lead`)

## Resumo

A função atualiza o lead quando um pagamento é aprovado ou rejeitado. Ela consome a fila `carbon-payments-update-lead`, que recebe os eventos de dois tópicos SNS (pagamentos aprovados e rejeitados), e chama a API interna de atualização de lead. O tratamento de erro está correto: toda falha volta para a fila e, depois das tentativas configuradas, vai para a DLQ. O único ponto de atenção é o visibility timeout abaixo do recomendado fora de prd.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-payments-update-lead` | Lote de 10, falha parcial ativa | `infra/modules/lambda-event-source/main.tf:5-14` |

A fila é assinante dos tópicos `carbon-approved-payments` e `carbon-rejected-payments`, com filtro por produto (`infra/modules/payments-update-lead-queue/main.tf:30-49`). Os dois tópicos entregam no mesmo formato e seguem o mesmo fluxo; a função só recebe eventos SQS. Não há outros gatilhos no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app/index.js:16-29` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O handler processa cada mensagem e devolve `{ batchItemFailures }` com as que falharam. A chamada à API tem um `catch` que parece engolir o erro, mas ele chama uma função auxiliar que lança a exceção, então a falha chega ao handler (`app/src/api/carbonInternalApi.js:7-16` e `:34-35`).

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Lead atualizado | Lista de falhas vazia | Correto |
| JSON inválido, dados inválidos ou falha na API | Mensagem marcada como falha | Correto |

Não foram encontrados fluxos sem retorno, com retorno vazio ou com erro descartado. Com lote de 10 e falha parcial ativa, apenas as mensagens com erro voltam para a fila.

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-payments-update-lead-dead-letter` |
| Tentativas antes da DLQ | 10 em prd (2 em dev e poc, 5 em hml) |
| Retenção da DLQ | 14 dias em prd; 3 dias em dev e 2 em poc, menos que os 4 dias da fila |
| Visibility timeout x timeout | 120 s x 15 s em prd (8 vezes); 120 s x 25 s nos demais (4,8 vezes) |

Configuração em `infra/modules/payments-update-lead-queue/main.tf`.

## Divergências Terraform x Código

Nenhuma. O Terraform ativa a resposta de falha parcial e o handler devolve essa resposta.

## Problemas encontrados

### 1. Visibility timeout abaixo do recomendado fora de prd (Baixa)

- O que acontece: em dev, poc e hml o visibility timeout é 4,8 vezes o timeout da função. Em prd está adequado.
- Por que é um problema: a AWS recomenda pelo menos 6 vezes para evitar reprocessamento durante as retentativas internas do gatilho.
- Como corrigir: aumentar o visibility timeout para 150 s nesses ambientes.
- Onde: `infra/hml.tfvars:12`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Ajustar o visibility timeout fora de prd (problema 1). Em dev e poc, aumentar a retenção da DLQ para mais de 4 dias.

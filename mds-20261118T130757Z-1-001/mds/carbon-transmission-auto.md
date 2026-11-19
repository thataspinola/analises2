# carbon-transmission-auto

- Repositório: `transmission-auto/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: ATENÇÃO
- Funções sistêmicas: 1 (fila SQS `carbon-transmission-auto`)

## Resumo

A função confirma o pagamento de propostas de seguro auto na API do produto. Ela consome a fila `carbon-transmission-auto`, que recebe do tópico SNS `carbon-approved-payments` os pagamentos aprovados do produto auto. O tratamento de erro está correto: toda falha volta para a fila e, depois das tentativas configuradas, vai para a DLQ. O único ponto de atenção é o visibility timeout, um pouco abaixo do recomendado.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-transmission-auto` | Lote de 10, falha parcial ativa | `infra/modules/lambda-event-source/main.tf:5-14` |

A fila é assinante do tópico SNS `carbon-approved-payments`, com filtro `scope = auto` (`infra/modules/sqs/main.tf:30-38`). O SNS apenas entrega na fila; a função só recebe eventos SQS. Não há outros gatilhos no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app/index.js:5-21` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O handler processa cada mensagem e devolve `{ batchItemFailures }` com as que falharam. Todas as etapas do controller registram a atividade e relançam o erro, então toda falha chega ao handler.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Pagamento confirmado | Lista de falhas vazia | Correto |
| Dados inválidos, falha no token ou na API | Mensagem marcada como falha | Correto |

Não foram encontrados fluxos sem retorno, com retorno vazio ou com erro descartado. Com lote de 10 e falha parcial ativa, apenas as mensagens com erro voltam para a fila.

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-transmission-auto-dead-letter` |
| Tentativas antes da DLQ | 5 em prd (2 em dev e poc, 3 em hml) |
| Retenção da DLQ | 14 dias em prd; 3 dias em dev e poc, menos que os 4 dias da fila |
| Visibility timeout x timeout | 300 s x 60 s (5 vezes) |

A DLQ é consumida por uma função de tratamento de erros de pagamentos que está fora deste repositório. Configuração em `infra/modules/sqs/main.tf`.

## Divergências Terraform x Código

Nenhuma. O Terraform ativa a resposta de falha parcial e o handler devolve essa resposta.

## Problemas encontrados

### 1. Visibility timeout um pouco abaixo do recomendado (Baixa)

- O que acontece: o visibility timeout é 5 vezes o timeout da função.
- Por que é um problema: a AWS recomenda pelo menos 6 vezes para evitar que a mensagem volte a ficar visível durante as retentativas internas do gatilho.
- Como corrigir: aumentar o visibility timeout para 360 s.
- Onde: `infra/prd.tfvars:12`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Ajustar o visibility timeout (problema 1). Em dev e poc, aumentar a retenção da DLQ para mais de 4 dias.

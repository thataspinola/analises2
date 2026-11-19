# carbon-inspection-request-auto

- Repositório: `inspection-request-auto/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: ATENÇÃO
- Funções sistêmicas: 1 (fila SQS `carbon-inspection-request-auto`)

## Resumo

A função trata propostas de seguro auto que exigem vistoria. Para cada mensagem, transmite a proposta ao produto, grava os dados de pagamento, agenda a verificação da vistoria (fila `carbon-check-inspection-request-auto`) e atualiza o lead. Ela consome a fila `carbon-inspection-request-auto`, alimentada pelo tópico SNS `carbon-inspection-ready`. O tratamento de erro está correto: toda falha volta para a fila. Os pontos de atenção são o visibility timeout curto e o reprocessamento, que repete etapas já concluídas.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-inspection-request-auto` | Lote de 1, falha parcial ativa | `infra/modules/lambda-event-source/main.tf:5-14` |

A fila é assinante do tópico SNS `carbon-inspection-ready`, com filtro `scope = auto` (`infra/modules/sqs-queue/main.tf:107-115`). O SNS apenas entrega na fila. Não há outros gatilhos no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app/index.js:5-15` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O handler processa cada mensagem e devolve `{ batchItemFailures }` com as que falharam. O controller registra a etapa em que o erro ocorreu e relança, então toda falha chega ao handler.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Todas as etapas concluídas | Lista de falhas vazia | Correto |
| Falha em qualquer etapa | Mensagem marcada como falha | Correto |
| Proposta já em emissão (produto responde 400 específico) | Tratado como transmissão concluída | Correto, evita duplicar a proposta |

Não foram encontrados fluxos sem retorno, com retorno vazio ou com erro descartado.

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-inspection-request-auto-dead-letter` |
| Tentativas antes da DLQ | 8 |
| Retenção da DLQ | 14 dias em prd; 3 dias em dev e 2 em poc, menos que os 4 dias da fila |
| Visibility timeout x timeout | 120 s x 60 s em prd, hml e poc (2 vezes); 30 s x 60 s em dev |

Configuração em `infra/modules/sqs-queue/main.tf`.

## Divergências Terraform x Código

Nenhuma. O Terraform ativa a resposta de falha parcial e o handler devolve essa resposta.

## Problemas encontrados

### 1. Visibility timeout abaixo do recomendado (Média)

- O que acontece: em prd, a mensagem fica invisível por 120 s e a função pode executar por até 60 s. Em dev, a mensagem fica invisível por apenas 30 s, menos que o tempo de execução.
- Por que é um problema: se a execução se aproximar do visibility timeout, a mensagem volta para a fila durante o processamento e é tratada de novo. Em dev isso acontece em qualquer execução acima de 30 s. A AWS recomenda visibility de pelo menos 6 vezes o timeout.
- Como corrigir: aumentar o visibility timeout para 360 s em todos os ambientes.
- Onde: `infra/prd.tfvars:11` e `infra/dev.tfvars:11`

### 2. Reprocessamento repete etapas já concluídas (Baixa)

- O que acontece: se a última etapa (atualização do lead) falhar, a mensagem volta para a fila e o fluxo recomeça do início. A transmissão da proposta é protegida (o produto informa que já está em emissão), mas os dados de pagamento são gravados de novo e uma nova mensagem é publicada na fila de verificação da vistoria.
- Por que é um problema: a mesma vistoria passa a ser verificada mais de uma vez.
- Como corrigir: registrar por `idTransaction` as etapas já concluídas, ou publicar na fila de verificação só depois da atualização do lead.
- Onde: `app/src/controller/inspectionController.js:53-72`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Ajustar o visibility timeout (problema 1). Em dev e poc, aumentar a retenção da DLQ para mais de 4 dias.

## Observações

- O comportamento da layer `carbon-postponed-payment-data`, que grava os dados de pagamento, não está neste repositório. O código considera que ela lança erro em caso de falha e relança esse erro.

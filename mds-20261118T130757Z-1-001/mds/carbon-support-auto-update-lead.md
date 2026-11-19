# carbon-support-auto-update-lead

- Repositório: `auto-update-lead/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: ATENÇÃO
- Funções sistêmicas: 1 (fila SQS `carbon-support-auto-update-lead`)

## Resumo

A função consome a fila `carbon-support-auto-update-lead` e, para cada mensagem, chama a API interna de atualização de lead (`PUT /update-lead`). A fila recebe mensagens das lambdas de cotação auto e de solicitação de vistoria auto. O tratamento de erro está correto: qualquer falha volta para a fila e, depois de 10 tentativas, vai para a DLQ. O ponto de atenção é de configuração da fila: o visibility timeout está abaixo do recomendado.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-support-auto-update-lead` | Lote de 1, falha parcial ativa | `infra/modules/lambda-event-source/main.tf:5-14` |

Não há outros gatilhos para esta função no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app/index.js:5-15` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O handler processa cada mensagem e devolve `{ batchItemFailures }` com as que falharam. O controller e a chamada à API relançam os erros, então toda falha chega ao handler e é marcada corretamente.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Lead atualizado | Lista de falhas vazia | Correto |
| JSON inválido, dados inválidos ou falha na API | Mensagem marcada como falha | Correto |

Não foram encontrados fluxos sem retorno, com retorno vazio ou com erro descartado.

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-support-auto-update-lead-dead-letter` |
| Tentativas antes da DLQ | 10 |
| Retenção da DLQ | 14 dias em prd; 3 dias em dev e 2 em poc, menos que os 4 dias da fila |
| Visibility timeout x timeout | 120 s x 60 s (2 vezes) |

Configuração em `infra/modules/sqs-queue/main.tf`.

## Divergências Terraform x Código

Nenhuma. O Terraform ativa a resposta de falha parcial e o handler devolve essa resposta.

## Problemas encontrados

### 1. Visibility timeout abaixo do recomendado (Média)

- O que acontece: a mensagem fica invisível por 120 s e a função pode executar por até 60 s.
- Por que é um problema: com margem pequena, uma execução lenta ou uma retentativa interna da AWS pode deixar a mensagem visível de novo durante o processamento, gerando atualização duplicada. A AWS recomenda visibility de pelo menos 6 vezes o timeout.
- Como corrigir: aumentar o visibility timeout para 360 s.
- Onde: `infra/prd.tfvars:11`

### 2. Mensagens inválidas repetidas 10 vezes (Baixa)

- O que acontece: uma mensagem com dados inválidos falha na validação e volta para a fila como se fosse um erro temporário.
- Por que é um problema: ela é reprocessada 10 vezes antes de chegar à DLQ, sem chance de dar certo.
- Como corrigir: tratar erro de validação separadamente, enviando a mensagem direto para a DLQ.
- Onde: `infra/modules/sqs-queue/main.tf:9`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Ajustar o visibility timeout (problema 1). Em dev e poc, aumentar a retenção da DLQ para mais de 4 dias.

## Observações

- A API chamada (`PUT /update-lead`) pertence ao repositório `support-update-lead`, que envia a requisição direto para outra fila. Falhas nessa integração estão descritas no relatório `carbon-support-update-lead`.

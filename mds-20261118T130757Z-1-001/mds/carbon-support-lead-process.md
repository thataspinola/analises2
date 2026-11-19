# carbon-support-lead-process

- Repositório: `lead/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app-process/`
- Classificação: ATENÇÃO
- Funções sistêmicas: 1 (fila SQS `carbon-support-lead`)

## Resumo

A função cria leads no Dynamics a partir da fila `carbon-support-lead`. A fila é alimentada pela lambda HTTP vizinha `carbon-support-lead-request-async`, que recebe a requisição e só publica a mensagem. Esse par de lambdas separadas (uma HTTP que publica, outra SQS que processa) é a separação que se espera das demais lambdas. O tratamento de erro está correto. O ponto de atenção está na fila: o visibility timeout é igual ao tempo de execução.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-support-lead` | Lote de 1, falha parcial ativa | `infra/modules/process-lambda-event-source/main.tf:5-14` |

O API Gateway do repositório (`POST`, path `support/lead-async`) aciona a lambda vizinha `app/`, que publica na fila. Não é gatilho desta função.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app-process/index.js:6-18` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O handler processa a mensagem e devolve `{ batchItemFailures }`. O controller registra a etapa em que o erro ocorreu e relança; as etapas de token convertem o erro da layer em um erro próprio e também relançam.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Lead criado | Lista de falhas vazia | Correto |
| JSON inválido ou dados inválidos | Mensagem marcada como falha | Correto |
| Falha no token, certificado ou Dynamics | Mensagem marcada como falha | Correto |

Não foram encontrados fluxos sem retorno, com retorno vazio ou com erro descartado.

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-support-lead-dead-letter` |
| Tentativas antes da DLQ | 3 |
| Retenção da DLQ | 14 dias em prd; 3 dias em dev, menos que os 4 dias da fila |
| Visibility timeout x timeout | 60 s x 60 s em todos os ambientes |

Configuração em `infra/modules/lead-queue/main.tf`.

## Divergências Terraform x Código

Nenhuma. O Terraform ativa a resposta de falha parcial e o handler devolve essa resposta.

## Problemas encontrados

### 1. Visibility timeout igual ao timeout da função (Alta)

- O que acontece: a mensagem fica invisível na fila por 60 s, o mesmo tempo máximo de execução da função.
- Por que é um problema: se a chamada ao Dynamics demorar perto do limite, a mensagem volta a ficar visível enquanto ainda está sendo processada, e outra execução pode criar o mesmo lead. A AWS recomenda visibility de pelo menos 6 vezes o timeout.
- Como corrigir: aumentar o visibility timeout para 360 s.
- Onde: `infra/prd.tfvars:23`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Ajustar o visibility timeout (problema 1). Em dev, aumentar a retenção da DLQ para mais de 4 dias.

## Observações

- O código da layer de Dynamics não está neste repositório. O código desta função relança qualquer erro que ela devolver; erros de negócio do Dynamics (como lead duplicado) também são repetidos até a DLQ.

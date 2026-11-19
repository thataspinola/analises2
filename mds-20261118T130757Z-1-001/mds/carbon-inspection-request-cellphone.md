# carbon-inspection-request-cellphone

- Repositório: `inspection-request-cellphone/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app-request/`
- Classificação: ATENÇÃO
- Funções sistêmicas: 1 (fila SQS `carbon-inspection-request-cellphone`)

## Resumo

A função trata propostas de seguro celular que exigem vistoria. Para cada mensagem, envia a proposta ao produto, grava os dados de pagamento e, quando há dados de tagueamento, publica na fila do Google Analytics. Ela consome a fila `carbon-inspection-request-cellphone`, alimentada pelo tópico SNS `carbon-inspection-ready`. O tratamento de erro está correto. Os pontos de atenção estão na fila: após 6 falhas as mensagens vão para outra fila de trabalho (a de fail), e não para uma DLQ, e o visibility timeout está abaixo do recomendado.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-inspection-request-cellphone` | Lote de 10, falha parcial ativa | `infra/modules/sqs-inspection-request/main.tf:48-60` |

A fila é assinante do tópico SNS `carbon-inspection-ready`, com filtro `scope = phone` (`infra/modules/sqs-inspection-request/main.tf:31-42`). O vínculo com o código é feito pelo módulo `lambda-inspection-request`, que empacota a pasta `app-request/`. Não há outros gatilhos no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app-request/index.js:5-16` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O handler processa cada mensagem e devolve `{ batchItemFailures }` com as que falharam. O controller relança os erros das etapas principais, então toda falha chega ao handler.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| Proposta enviada e dados gravados | Lista de falhas vazia | Correto |
| Falha na validação, no token, na API ou na gravação | Mensagem marcada como falha | Correto |
| Falha no envio ao Google Analytics | Sucesso, erro só registrado em log | Aceitável: etapa secundária |

O envio ao Google Analytics é tratado como etapa opcional (`app-request/src/controller/inspectionController.js:80-85`). Perder esse envio afeta só o tagueamento; a proposta já foi registrada.

## Dead Letter Queue

As mensagens de vistoria de celular passam por esta cadeia:

1. Fila `carbon-inspection-request-cellphone` (esta função): após 6 falhas, vão para a fila `carbon-inspection-fail-cellphone`.
2. Fila de fail: a função `carbon-inspection-fail-cellphone` envia um e-mail de erro e grava a mensagem, por código, em `carbon-inspection-request-cellphone-dead-letter`.
3. Se a lambda de fail falhar 10 vezes, a mensagem vai para `carbon-inspection-fail-cellphone-dead-letter`.

| Item | Valor |
|------|-------|
| Destino após 6 falhas | Fila de trabalho `carbon-inspection-fail-cellphone` |
| DLQ de mesmo nome da fila | `carbon-inspection-request-cellphone-dead-letter`, alimentada só por código |
| Visibility timeout x timeout | 120 s x 30 s (4 vezes) |

Configuração em `infra/modules/sqs-inspection-request/main.tf`.

## Divergências Terraform x Código

Nenhuma. O Terraform ativa a resposta de falha parcial e o handler devolve essa resposta.

## Problemas encontrados

### 1. A DLQ da fila depende de código com erro ignorado (Média)

- O que acontece: a DLQ `carbon-inspection-request-cellphone-dead-letter` existe, mas não é o destino do redrive. As mensagens que falham vão para a fila de fail, e só chegam a essa DLQ se a lambda de fail conseguir gravá-las.
- Por que é um problema: a lambda de fail ignora o erro dessa gravação (ver relatório `carbon-inspection-fail-cellphone`). Se ela falhar, a mensagem some da cadeia sem cópia.
- Como corrigir: corrigir o tratamento de erro da lambda de fail. Uma alternativa mais simples é apontar o redrive para a DLQ e deixar o envio do e-mail para uma função que consome a DLQ.
- Onde: `infra/modules/sqs-inspection-request/main.tf:9-12`

### 2. Visibility timeout abaixo do recomendado (Média)

- O que acontece: a mensagem fica invisível por 120 s e a função pode executar por até 30 s (4 vezes).
- Por que é um problema: com margem pequena, a mensagem pode voltar para a fila durante as retentativas internas do gatilho e ser processada de novo, reenviando a proposta. A AWS recomenda pelo menos 6 vezes o timeout.
- Como corrigir: aumentar o visibility timeout para 180 s.
- Onde: `infra/modules/sqs-inspection-request/main.tf:7`

### 3. Reprocessamento pode reenviar a proposta (Baixa)

- O que acontece: se a gravação dos dados de pagamento falhar depois do envio da proposta, a mensagem volta para a fila e a proposta é enviada de novo.
- Por que é um problema: o produto pode receber a mesma proposta mais de uma vez.
- Como corrigir: registrar a proposta enviada antes das etapas seguintes, ou verificar se ela já existe antes de reenviar.
- Onde: `app-request/src/controller/inspectionController.js:20-28`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Rever a cadeia de falha (problema 1) e ajustar o visibility timeout (problema 2).

## Observações

- O comportamento da layer `carbon-postponed-payment-data`, que grava os dados de pagamento, não está neste repositório. O código relança o erro que ela devolver.

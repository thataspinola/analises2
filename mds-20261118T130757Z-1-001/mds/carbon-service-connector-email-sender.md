# carbon-service-connector-email-sender

- Repositório: `email-sender/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app/`
- Classificação: PROBLEMA
- Funções sistêmicas: 1 (fila SQS `carbon-service-connector-email-sender`)

## Resumo

A função envia e-mails: consome a fila `carbon-service-connector-email-sender`, monta o corpo do e-mail a partir de um template guardado no S3 e chama a API de e-mail corporativa. O código foi escrito para informar à AWS quais mensagens falharam (resposta de falha parcial), mas o Terraform não ativa esse recurso. Como o handler nunca lança exceção, toda falha de envio é tratada pela AWS como sucesso, e a mensagem é apagada da fila sem nova tentativa e sem ir para a DLQ.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-service-connector-email-sender` | Lote de 10 (padrão da AWS), sem falha parcial | `infra/modules/lambda/main.tf:75-79` |

A fila pode receber mensagens de qualquer função `carbon-*` da conta; os produtores não estão neste repositório. Não há outros gatilhos no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app/index.js:6-31` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O handler espera todas as mensagens terminarem, monta a lista `batchItemFailures` com as que falharam e termina normalmente. O controller e a chamada à API relançam os erros corretamente; o problema está na combinação do handler com o Terraform.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| E-mail enviado | Lista de falhas vazia | Correto |
| Falha na validação, no template, no token ou na API | Lista com a mensagem, ignorada pela AWS | Problema 1 |
| Mensagem com corpo vazio (`{}`) | Sucesso sem processar | Problema 3 |

## Dead Letter Queue

| Item | Valor |
|------|-------|
| DLQ da fila | `carbon-service-connector-email-sender-dead-letter` |
| Tentativas antes da DLQ | 10 |
| Retenção da DLQ | 14 dias em prd; 3 dias em dev e 2 em poc |
| Visibility timeout x timeout | 120 s x 60 s (2 vezes) |

A DLQ está configurada, mas, pelo problema 1, quase nenhuma mensagem com falha chega a ela: as falhas são confirmadas como sucesso antes de atingir as 10 tentativas. Configuração em `infra/modules/sqs/main.tf`.

## Divergências Terraform x Código

O handler devolve a resposta de falha parcial (`batchItemFailures`), mas o mapeamento da fila não declara `function_response_types = ["ReportBatchItemFailures"]`. Sem essa configuração, a AWS ignora a lista.

## Problemas encontrados

### 1. Falhas de envio são apagadas da fila (Alta)

- O que acontece: o mapeamento da fila não ativa a resposta de falha parcial.

Trecho de `infra/modules/lambda/main.tf:75-79`:

```hcl
resource "aws_lambda_event_source_mapping" "lambda_event_source" {
  event_source_arn = var.email_sender_queue_arn
  enabled          = true
  function_name    = aws_lambda_function.carbon_lambda.arn
}
```

- Por que é um problema: sem `ReportBatchItemFailures`, a AWS só considera falha quando o handler lança exceção. Como o handler sempre termina normalmente, o lote inteiro é tratado como sucesso e apagado da fila. Os e-mails que falharam não são reenviados e não chegam à DLQ.
- Como corrigir: adicionar `function_response_types = ["ReportBatchItemFailures"]` e um `batch_size` explícito ao mapeamento, como nos demais repositórios (por exemplo, `auto-update-lead/infra/modules/lambda-event-source/main.tf`).
- Onde: `infra/modules/lambda/main.tf:75-79`

### 2. Visibility timeout abaixo do recomendado (Média)

- O que acontece: a mensagem fica invisível por 120 s e a função pode executar por até 60 s.
- Por que é um problema: com o lote de 10 mensagens, uma execução lenta pode deixar mensagens visíveis de novo durante o processamento, gerando e-mail duplicado. A AWS recomenda pelo menos 6 vezes o timeout.
- Como corrigir: aumentar o visibility timeout para 360 s.
- Onde: `infra/prd.tfvars:13`

### 3. Mensagem vazia descartada sem erro (Baixa)

- O que acontece: se a mensagem chegar com corpo vazio, o controller registra o erro em log e termina sem lançar exceção.
- Por que é um problema: a mensagem inválida é apagada da fila sem passar pela DLQ, e não fica registro fora do log.
- Como corrigir: lançar um erro de validação para que a mensagem siga para a DLQ.
- Onde: `app/src/controller/emailSenderController.js:10-15`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. A correção prioritária é ativar a resposta de falha parcial no mapeamento (problema 1); sem ela, os e-mails que falham são perdidos. Em seguida, ajustar o visibility timeout (problema 2). A permissão de invocação para `sqs.amazonaws.com` (`infra/modules/lambda/main.tf:81-87`) é desnecessária com o mapeamento e pode ser removida.

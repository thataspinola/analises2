# Configuração de Retry e DLQ para Garantia de Cancelamento de Crédito

## Parâmetros Críticos (terraform/variables.tf)

```terraform
# Timeout de visibilidade da mensagem na fila
variable "queue_message_visibility_timeout_seconds" {
  type        = string
  description = "AWS SQS queue message visibility timeout in seconds"
  # Valor configurado no ambiente: Deve ser >= ao timeout da Lambda
}

# Número máximo de tentativas antes de ir para DLQ
variable "queue_message_redrive_policy_max_receive_count" {
  type        = number
  description = "AWS SQS queue dead-letter message redrive policy max receive count"
  # Valor recomendado: 3 (3 tentativas antes de DLQ)
}

# Retenção de mensagens na DLQ
variable "dead_letter_message_retention_days" {
  type        = string
  description = "AWS SQS queue dead-letter message rentention in days"
  # Valor recomendado: 14 dias (permite investigação)
}
```

## Fluxo de Reprocessamento Automático

```
Tentativa 1:
├─ Tempo: 0s (recebimento imediato)
├─ Status: API CMS retorna erro (503, timeout, etc)
└─ Ação: Lambda falha → SQS recoloca na fila

Tentativa 2:
├─ Tempo: visibility_timeout_seconds depois
├─ Status: API CMS AINDA fora
└─ Ação: Lambda falha novamente → SQS recoloca

Tentativa 3:
├─ Tempo: visibility_timeout_seconds depois (desde última tentativa)
├─ Status: API CMS AINDA fora
└─ Ação: Lambda falha pela 3ª vez → MOVE PARA DLQ

Dead Letter Queue (failed-request-queue):
├─ Mensagem preservada com:
│  ├─ transactionId (para cancelar crédito)
│  ├─ externalId (para rastrear cliente)
│  ├─ carbonTraceId (para correlação de logs)
│  └─ paymentData (informações de pagamento)
│
└─ app-failed-request processa:
   ├─ Salva erro em DynamoDB
   ├─ CANCELA RESERVA DE CRÉDITO ✅
   ├─ Notifica cliente via email
   └─ Registra tudo em logs (CloudWatch)
```

## Valores Recomendados por Ambiente

### Desenvolvimento (dev.tfvars)

```terraform
queue_message_visibility_timeout_seconds     = "180"  # 3 minutos
queue_message_redrive_policy_max_receive_count = 3      # 3 tentativas
dead_letter_message_retention_days           = "7"     # 7 dias
lambda_timeout                                = 60     # 60 segundos
```

### Homologação (hml.tfvars)

```terraform
queue_message_visibility_timeout_seconds     = "180"  # 3 minutos
queue_message_redrive_policy_max_receive_count = 3      # 3 tentativas
dead_letter_message_retention_days           = "14"    # 14 dias
lambda_timeout                                = 60     # 60 segundos
```

### Produção (prd.tfvars)

```terraform
queue_message_visibility_timeout_seconds     = "300"  # 5 minutos
queue_message_redrive_policy_max_receive_count = 5      # 5 tentativas
dead_letter_message_retention_days           = "30"    # 30 dias
lambda_timeout                                = 90     # 90 segundos
```

## Cálculo de Tempo Total até DLQ

```
Total = (visibility_timeout × max_receive_count)

Desenvolvimento:
  180s × 3 = 540s = 9 minutos até mover para DLQ

Produção:
  300s × 5 = 1500s = 25 minutos até mover para DLQ
```

## Garantias por Componente

### SQS (AWS Nativo)

- ✅ Preservação de mensagem original
- ✅ Retry automático baseado em visibility timeout
- ✅ Dead Letter Queue automática
- ✅ Sem perda de dados na transição

### app-process (Lambda)

- ✅ Logging de tentativa e falha
- ✅ carbonTraceId rastreado
- ✅ Falha de forma limpa (lança exceção)
- ✅ Retorna batchItemFailures para SQS reprocessar

### app-failed-request (Lambda)

- ✅ Lê mensagem intacta da DLQ
- ✅ Promise.allSettled garante execução completa
- ✅ Cancela crédito mesmo com falhas parciais
- ✅ Persiste todos os dados em DynamoDB

## Monitoramento Recomendado

### CloudWatch Alarms

```
1. DLQ Not Empty
   - Métrica: ApproximateNumberOfMessagesVisible (failed-request-queue)
   - Threshold: > 0
   - Ação: Notificar time ops

2. High Reprocessing Rate
   - Métrica: ApproximateNumberOfMessagesVisible (request-queue)
   - Threshold: > 10 mensagens por minuto
   - Ação: Investigar API CMS

3. Lambda Errors
   - Métrica: Errors (request-lambda)
   - Threshold: > 5% de falha
   - Ação: Escalate
```

### Logs para Buscar

```
CloudWatch Logs (app-process):
- "statusCode=503"           → API CMS fora
- "Timeout"                   → API respondendo lentamente
- "Será reenviada para fila"  → Mensagem em retry

CloudWatch Logs (app-failed-request):
- "Cancelamento iniciado"     → Começou cancelamento
- "Resposta recebida da API"  → Cancelamento bem-sucedido
- "Payment credit-lock cancelling error" → Falhou cancelamento
```

## Testes Recomendados

### Teste 1: API Fora por 5 minutos

```
1. Simular API CMS offline (port block ou 503)
2. Enviar mensagem SQS
3. Observar retries em app-process
4. Validar que chega em app-failed-request após N tentativas
5. Confirmar cancelamento de crédito logado
```

### Teste 2: Falha no Cancelamento

```
1. Simular que API de cancelamento retorna 500
2. Enviar mensagem SQS
3. Validar que aparece em DLQ
4. Simular recuperação da API
5. Reprocessar manualmente
6. Confirmar cancelamento sucesso
```

## Referências

- [AWS SQS Dead Letter Queue](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html)
- [SQS Visibility Timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
- Terraform: `/infra/modules/request-queue/main.tf`
- Terraform: `/infra/modules/failed-request-queue/main.tf`

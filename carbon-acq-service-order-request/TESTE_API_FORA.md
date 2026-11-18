# Teste de Garantia: API Fora → Cancelamento de Crédito

## 🧪 Teste Prático: Simular API CMS Fora

### Objetivo

Validar que quando a API de criação de OS está fora, o cancelamento de crédito é feito automaticamente via DLQ.

---

## 📋 Pré-requisitos

- [ ] Acesso ao console AWS (CloudWatch, SQS, Lambda)
- [ ] Acesso aos logs de app-process e app-failed-request
- [ ] Acesso ao DynamoDB (verificar erro armazenado)
- [ ] Email de teste configurado
- [ ] Teste ambiente: DEV ou HML (NUNCA PRD sem aprovação)

---

## 🚀 Teste 1: Simulação de API Fora por 5 Minutos

### Passo 1: Preparar a Simulação

```bash
# 1. Abrir CloudWatch Logs em 3 abas:
#    - app-process (request-lambda)
#    - app-failed-request (failed-request-lambda)
#    - SQS (monitorar mensagens)

# 2. Registrar valores iniciais:
QUEUE_NAME="carbon-acq-service-order-request-queue"
DLQ_NAME="carbon-acq-service-order-failed-request-queue"

# Verificar contagem de mensagens
aws sqs get-queue-attributes \
  --queue-url "https://sqs.ca-central-1.amazonaws.com/XXX/${QUEUE_NAME}" \
  --attribute-names ApproximateNumberOfMessages
```

### Passo 2: Simular API CMS Fora

**Opção A: Via Security Group (Mais realista)**

```bash
# Bloquear porta 443 para a API CMS
aws ec2 authorize-security-group-ingress \
  --group-id sg-XXXXXX \
  --protocol tcp \
  --port 443 \
  --cidr 10.0.0.0/8 \
  --rule-description "Block CMS API - TEST"

# Aguardar efeito (1-2 minutos)
```

**Opção B: Via Lambda Environment (Mais rápido)**

```bash
# Editar variável de ambiente do request-lambda
# NODE_ENV_DISABLE_CREATE_SERVICE_ORDER=true
# Colocar condição no código para simular erro

# Ou editar o código diretamente:
# if (process.env.TEST_MODE === 'API_DOWN') {
#   throw new Error('Simulated API Down')
# }
```

### Passo 3: Enviar Mensagem SQS de Teste

```bash
# Preparar mensagem com transactionId obrigatório
MENSAGEM='{
  "carbonTraceId": "teste-api-fora-'$(date +%s)'",
  "eCommercePlatform": {
    "orderNumber": "TEST-001",
    "loggedCPF": "12345678900"
  },
  "externalId": "cliente-123",
  "transactionId": "txn-teste-'$(date +%s)'",
  "itemId": "item-456",
  "contactEmail": "teste@exemplo.com",
  "installments": 1,
  "productCode": "PROD-001",
  "amount": 99.99,
  "leadIdentifier": "lead-789",
  "paymentData": {
    "externo": true,
    "empresa": "001",
    "filial": "0001"
  },
  "integrationData": {
    "serviceOrder": {
      "schedule": {
        "startDateTime": "2025-12-31T10:00:00Z",
        "endDateTime": "2025-12-31T12:00:00Z",
        "openOsDateTime": "2025-12-31T09:00:00Z",
        "key": "KEY-123"
      },
      "siebelIntegrationId": "SIEBEL-001",
      "serviceId": "SVC-001",
      "sku": "SKU-001",
      "specialtyCode": "SPEC-001",
      "originCode": "ORIGIN-001",
      "companyCode": "CMP-001",
      "sourceSystemCode": "SRC-001",
      "problem": "Teste",
      "subject": "Teste de API Fora"
    },
    "customer": {
      "name": "Cliente Teste",
      "socialName": "CT",
      "email": "teste@exemplo.com",
      "cellphone": "11999999999",
      "documentNumber": "12345678900"
    },
    "serviceAddress": {
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01310100",
      "street": "Rua Teste"
    }
  }
}'

# Enviar para a fila
aws sqs send-message \
  --queue-url "https://sqs.ca-central-1.amazonaws.com/XXX/carbon-acq-service-order-request-queue" \
  --message-body "$MENSAGEM"

echo "Mensagem enviada: $(date)"
```

### Passo 4: Observar Comportamento em Tempo Real

**T+0-60s: Tentativa 1 (FALHA)**

```
[app-process]
INFO: "Iniciando processamento da mensagem SQS:
       messageId=ABC123,
       carbonTraceId=teste-api-fora-1234567,
       transactionId=txn-teste-1234567"

ERROR: "statusCode=503 | apiUrl=https://sensedia... |
        carbonTraceId=teste-api-fora-1234567 |
        transactionId=txn-teste-1234567"

ERROR: "Mensagem será reenviada para a fila
        (reprocessamento automático).
        messageId=ABC123, erro=Connection Timeout"

[SQS]
✓ Mensagem retorna à fila
✓ ApproximateNumberOfMessages = 1
```

**T+60-120s: Tentativa 2 (FALHA)**

```
[app-process]
INFO: "Iniciando processamento da mensagem SQS:
       messageId=ABC123,
       carbonTraceId=teste-api-fora-1234567"

ERROR: "statusCode=503 | apiUrl=https://sensedia... |
        carbonTraceId=teste-api-fora-1234567 |
        transactionId=txn-teste-1234567"

[SQS]
✓ Mensagem retorna à fila NOVAMENTE
```

**T+120-180s: Tentativa 3 (FALHA - ÚLTIMA)**

```
[app-process]
INFO: "Iniciando processamento da mensagem SQS:
       messageId=ABC123,
       carbonTraceId=teste-api-fora-1234567"

ERROR: "statusCode=503 | apiUrl=https://sensedia..."

[SQS]
⚠️ MOVE PARA DEAD LETTER QUEUE
✓ request-queue: ApproximateNumberOfMessages = 0
✓ failed-request-queue: ApproximateNumberOfMessages = 1
```

**T+180-240s: DLQ Processado**

```
[app-failed-request]
INFO: "Processando SQS message:
       {...carbonTraceId: teste-api-fora-1234567,
           transactionId: txn-teste-1234567,
           externalId: cliente-123...}"

INFO: "DynamoDB data save success"

INFO: "Retorno da chamada da API service-order-checkout:
       {payment_reservation_cancelled: true}"

INFO: "Email enviado com sucesso"

[DynamoDB - Table: carbon-acq-service-order-failed-request]
✓ Nova entrada com:
  - transactionId: txn-teste-1234567
  - externalId: cliente-123
  - errorMessage: "Falha ao criar OS"
  - status: "CREDIT_CANCELLED"
  - timestamp: 2025-12-30T15:30:00Z
```

### Passo 5: Validar Resultado Final

```bash
# 1. Verificar fila vazia
aws sqs get-queue-attributes \
  --queue-url "https://sqs.ca-central-1.amazonaws.com/XXX/carbon-acq-service-order-request-queue" \
  --attribute-names ApproximateNumberOfMessages
# Resultado esperado: 0

# 2. Verificar DLQ vazia (já processada)
aws sqs get-queue-attributes \
  --queue-url "https://sqs.ca-central-1.amazonaws.com/XXX/carbon-acq-service-order-failed-request-queue" \
  --attribute-names ApproximateNumberOfMessages
# Resultado esperado: 0 (já processada por app-failed-request)

# 3. Verificar DynamoDB
aws dynamodb get-item \
  --table-name "carbon-acq-service-order-failed-request" \
  --key '{"externalId": {"S": "cliente-123"}}'
# Resultado esperado: Encontrar entrada com status CREDIT_CANCELLED

# 4. Verificar email recebido
# Checar inbox de teste@exemplo.com
# Esperado: Email com assunto sobre cancelamento de crédito
```

### Passo 6: Recuperar a Simulação

```bash
# Se usou Security Group:
aws ec2 revoke-security-group-ingress \
  --group-id sg-XXXXXX \
  --protocol tcp \
  --port 443 \
  --cidr 10.0.0.0/8

# Se usou Lambda environment:
# Remover TEST_MODE ou NODE_ENV_DISABLE_CREATE_SERVICE_ORDER
```

---

## ✅ Critérios de Sucesso

| Critério                    | Esperado                  | Status |
| --------------------------- | ------------------------- | ------ |
| Tentativas em app-process   | 3-5 (conforme config)     | ✓      |
| Mensagem em DLQ             | SIM                       | ✓      |
| app-failed-request processa | SIM                       | ✓      |
| DynamoDB salva erro         | SIM, com transactionId    | ✓      |
| Crédito cancelado           | SIM, logado na API        | ✓      |
| Email enviado               | SIM, para cliente         | ✓      |
| carbonTraceId rastreável    | Em todos os logs          | ✓      |
| Fila limpa                  | Sim, sem mensagens presas | ✓      |

---

## 🔍 Logs Para Buscar

### App-Process (Request Lambda)

```bash
# Buscar todas as tentativas
aws logs filter-log-events \
  --log-group-name "/aws/lambda/carbon-acq-service-order-request" \
  --start-time $(date -d '10 minutes ago' +%s)000 \
  --filter-pattern "carbonTraceId=teste-api-fora"

# Esperado: 3-5 linhas de tentativa, todas com erro 503
```

### App-Failed-Request (Failed Request Lambda)

```bash
# Buscar processamento da DLQ
aws logs filter-log-events \
  --log-group-name "/aws/lambda/carbon-acq-service-order-failed-request" \
  --start-time $(date -d '10 minutes ago' +%s)000 \
  --filter-pattern "transactionId=txn-teste"

# Esperado: 1 entrada mostrando sucesso
```

---

## 📊 Dashboard CloudWatch Recomendado

```
Criar Dashboard com:

1. Métricas de request-queue
   - ApproximateNumberOfMessages
   - ApproximateNumberOfMessagesNotVisible
   - NumberOfMessagesSent
   - NumberOfMessageReceived

2. Métricas de failed-request-queue (DLQ)
   - ApproximateNumberOfMessages
   - NumberOfMessagesSent (deve aumentar)

3. Erros de request-lambda
   - Errors (deve aumentar durante teste)
   - Duration (deve se manter < timeout)

4. Sucesso de failed-request-lambda
   - Invocations (deve processar DLQ)
   - Errors (deve ser 0)
```

---

## 🐛 Troubleshooting

### Problema: Mensagem não vai para DLQ

**Causa 1:** maxReceiveCount está muito alto

```bash
# Verificar configuração
aws sqs get-queue-attributes \
  --queue-url "..." \
  --attribute-names RedrivePolicy

# Ajustar se necessário no Terraform
variable "queue_message_redrive_policy_max_receive_count" {
  default = 3  # Aumentar para 5 se estiver em 3
}
```

**Causa 2:** Lambda timeout menor que visibility_timeout

```bash
# Verificar
lambda_timeout = 60
visibility_timeout = 300  # ❌ ERRADO

# Corrigir
lambda_timeout = 300
visibility_timeout = 180  # OK (timeout > visibility)
```

### Problema: app-failed-request não processa DLQ

```bash
# Verificar event source
aws lambda list-event-source-mappings \
  --function-name "carbon-acq-service-order-failed-request" \
  --query 'EventSourceMappings[*].[UUID,State,EventSourceArn]'

# Verificar permissão
aws lambda get-policy \
  --function-name "carbon-acq-service-order-failed-request"

# Se vazio, reapliar Terraform:
terraform apply -target=module.failed_request_lambda_event_source
```

### Problema: Email não chegou

```bash
# Verificar chave SendGrid
aws lambda get-environment-variables \
  --function-name "carbon-acq-service-order-failed-request" \
  --query 'Environment.Variables.PORTOSERVICO_SENDGRID_AUTH_TOKEN'

# Se vazio ou inválido, atualizar secrets manager
```

# GARANTIA DE CANCELAMENTO DE CRÉDITO - Resumo Executivo

## 🔄 Como Funciona

### Cenário: API de Criação de OS Cai

```
SQS Queue (request-queue)
       ↓
   [Mensagem: transactionId, externalId, carbonTraceId]
       ↓
   app-process (Lambda)
       ↓
   [Tenta criar OS na API CMS]
       ↓
   [API está FORA/503/Timeout]
       ↓
   [Lambda FALHA]
       ↓
   [SQS Retry Automático] ← Tenta novamente 3-5x
       ↓
   [Após todas as tentativas FALHAREM]
       ↓
   Dead Letter Queue (failed-request-queue)
       ↓
   [Mensagem chega INTACTA com todos os dados originais]
       ↓
   app-failed-request (Lambda)
       ↓
   [CANCELA RESERVA DE CRÉDITO] ✅
   [Salva no DynamoDB]
   [Envia email para cliente]
```

---

## 🎯 Cenários Cobertos

### ✅ Cenário 1: API CMS Fora (Timeout/503)

- **Resultado:** Crédito SERÁ cancelado via DLQ
- **Rastreamento:** Completo via carbonTraceId

### ✅ Cenário 2: API CMS Intermitente

- **Resultado:** Retries automáticos até 5x
- **Se recuperar:** OS criada normalmente
- **Se não recuperar:** Crédito cancelado

### ✅ Cenário 3: Falha em app-failed-request

- **Status:** Parcial (crédito não cancelado)
- **Local:** DLQ fica com mensagem
- **Ação:** Reprocessamento manual disponível

### ❌ Cenário 4: Validação Falha (sem transactionId)

- **Status:** Rejeitado antes de enviar para API
- **Local:** app-process
- **Crédito:** Não é afetado (OS não foi criada)

---

## 📈 Métricas para Monitorar

### CloudWatch Alarms Recomendadas

1. **DLQ Não Vazia**

   - Se mais de 0 mensagens por 5+ minutos → Investigar API

2. **Taxa de Erro Alta**

   - Se mais de 5% de falha em app-process → Verificar disponibilidade API

3. **Tempo de Reprocessamento**
   - Se mais de 25 minutos → Ajustar configurações

### Logs Para Buscar

```
app-process:
- "statusCode=503" → API fora
- "Timeout" → API lenta
- "será reenviada" → Em retry

app-failed-request:
- "Cancelamento iniciado" → Começou processo
- "Resposta recebida" → Sucesso
- "cancelling error" → Falhou
```

---

## 📚 Documentação

Arquivos criados:

- `FLUXO_GARANTIA_CANCELAMENTO_CREDITO.md` - Detalhes técnicos do fluxo
- `CONFIGURACAO_RETRY_DLQ.md` - Configurações de retry e valores recomendados

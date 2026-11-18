# Carbon Acquisition - Service Order Request

Projeto que agrupa AWS Lambdas para lidar com requisição de ordem de serviço e tratamento de falhas.

## 📚 Documentação

### 🚀 Comece por Aqui

- **[RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md)** - Resposta rápida sobre garantia de cancelamento de crédito
- **[INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md)** - Mapa completo com planos de aprendizado

### 📖 Documentação Detalhada

#### Para Desenvolvedores

- **[FLUXO_GARANTIA_CANCELAMENTO_CREDITO.md](FLUXO_GARANTIA_CANCELAMENTO_CREDITO.md)** - Fluxo técnico completo com diagramas

#### Para QA/Testes

- **[TESTE_API_FORA.md](TESTE_API_FORA.md)** - Teste prático passo-a-passo

#### Para DevOps/SRE

- **[CONFIGURACAO_RETRY_DLQ.md](CONFIGURACAO_RETRY_DLQ.md)** - Configuração, parametrização e monitoramento

---

## 🏗️ Arquitetura

### Componentes

- **app-process**: Lambda que cria ordem de serviço via API
- **app-failed-request**: Lambda que cancela crédito quando criação falha
- **SQS + DLQ**: Fila com Dead Letter Queue para garantir reprocessamento

### Fluxo de Falha

```
API Cai → SQS Retry (3-5x) → DLQ → app-failed-request → CANCELA CRÉDITO ✅
```

---

## 🚀 Quick Start

### Entender a Garantia

```bash
# Leia o resumo executivo
cat RESUMO_EXECUTIVO.md
```

### Entender a Implementação

```bash
# Leia nessa ordem:
cat RESUMO_EXECUTIVO.md
cat FLUXO_GARANTIA_CANCELAMENTO_CREDITO.md
```

### Testar na Prática

```bash
# Siga o guia de teste
cat TESTE_API_FORA.md
# Depois execute os passos
```

---

## 📊 Estrutura do Projeto

```
service-order-request/
├── README.md (este arquivo)
├── RESUMO_EXECUTIVO.md (⭐ COMECE AQUI)
├── INDICE_DOCUMENTACAO.md
├── FLUXO_GARANTIA_CANCELAMENTO_CREDITO.md
├── CONFIGURACAO_RETRY_DLQ.md
├── TESTE_API_FORA.md
│
├── app-process/
│   ├── index.js (handler principal - com logging melhorado)
│   ├── src/api/.../index.js (API de criar OS - com logging melhorado)
│   ├── src/controller/processSqsMessageController.js (com rastreamento)
│   └── ...
│
├── app-failed-request/
│   ├── index.js
│   ├── src/controller/failedRequestController.js (processa DLQ)
│   ├── src/api/.../paymentCheckoutApi.js (com logging de resposta)
│   └── ...
│
├── app-common/
│   └── ... (lib compartilhada)
│
└── infra/
    ├── main.tf
    ├── modules/
    │   ├── request-queue/ (SQS principal)
    │   ├── failed-request-queue/ (DLQ)
    │   ├── request-lambda/ (app-process)
    │   ├── failed-request-lambda/ (app-failed-request)
    │   └── ...
    └── ...
```

---

## 📞 Suporte

### Tenho uma dúvida rápida

→ [RESUMO_EXECUTIVO.md](RESUMO_EXECUTIVO.md) (seção "Pergunta Principal")

### Quero entender tudo

→ [INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md) (Planos de Aprendizado)

### Quero testar

→ [TESTE_API_FORA.md](TESTE_API_FORA.md)

### Preciso configurar algo

→ [CONFIGURACAO_RETRY_DLQ.md](CONFIGURACAO_RETRY_DLQ.md)

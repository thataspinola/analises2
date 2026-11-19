# carbon-inspection-fail-portable-device

- Repositório: `inspection-request-portable-device/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app-fail/`
- Classificação: PROBLEMA
- Funções sistêmicas: 1 (fila SQS `carbon-inspection-fail-portable-device`)

## Resumo

A função trata as solicitações de vistoria de aparelhos portáteis que não puderam ser processadas. Ela consome a fila `carbon-inspection-fail-portable-device`, que recebe as mensagens que falharam 6 vezes na fila de solicitação (`carbon-inspection-request-portable-device`). Para cada mensagem, envia um e-mail de erro e guarda a mensagem na fila `carbon-inspection-request-portable-device-dead-letter`, que funciona como destino final. O problema principal é que, se essa gravação falhar, o erro é ignorado e a mensagem some sem cópia. Além disso, o visibility timeout da fila é igual ao tempo de execução da função.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-inspection-fail-portable-device` | Lote de 10, falha parcial ativa | `infra/modules/sqs-inspection-fail/main.tf:31-44` |

A fila recebe mensagens pelo redrive da fila de solicitação (`infra/modules/sqs-inspection-request/main.tf:9-12`). O vínculo com o código é feito pelo módulo `lambda-inspection-fail`, que empacota a pasta `app-fail/`. Não há outros gatilhos no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app-fail/index.js:5-21` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O handler processa cada mensagem e devolve `{ batchItemFailures }` com as que falharam. Erros de validação e da API de e-mail são relançados e marcados corretamente. A gravação na fila final, porém, tem um `catch` que só registra aviso.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| E-mail enviado e mensagem guardada | Lista de falhas vazia | Correto |
| Dados inválidos ou falha no e-mail | Mensagem marcada como falha | Correto |
| Falha ao guardar a mensagem na fila final | Sucesso, erro ignorado | Problema 1 |

## Dead Letter Queue

As mensagens de vistoria de aparelhos portáteis passam por esta cadeia:

1. Fila `carbon-inspection-request-portable-device`: após 6 falhas, vão para a fila de fail (não para uma DLQ).
2. Fila `carbon-inspection-fail-portable-device` (esta função): processa e grava cada mensagem, por código, em `carbon-inspection-request-portable-device-dead-letter`.
3. Se esta função falhar 10 vezes, a mensagem vai para `carbon-inspection-fail-portable-device-dead-letter`.

| Item | Valor |
|------|-------|
| DLQ da fila de fail | `carbon-inspection-fail-portable-device-dead-letter`, após 10 tentativas |
| Retenção das DLQs | 14 dias em prd; 3 dias em dev e 2 em poc |
| Visibility timeout x timeout | 60 s x 60 s em todos os ambientes |

Configuração em `infra/modules/sqs-inspection-fail/main.tf` e `infra/modules/sqs-inspection-request-policy/main.tf`.

## Divergências Terraform x Código

Nenhuma. O Terraform ativa a resposta de falha parcial e o handler devolve essa resposta.

## Problemas encontrados

### 1. Erro ao guardar a mensagem na fila final é ignorado (Alta)

- O que acontece: depois de enviar o e-mail, a função grava a mensagem na fila `carbon-inspection-request-portable-device-dead-letter`. Se a gravação falhar, o erro só é registrado como aviso.

Trecho simplificado de `app-fail/src/controller/inspectionFailController.js:6-15`:

```js
async function sendMessageToDLQ(message) {
	try {
		await service.sqs.queue.sendMessage(message)
	} catch (error) {
		service.logger.warn(...)
	}
}
```

- Por que é um problema: a mensagem é confirmada como processada e removida da fila de fail. Se a gravação falhou, não sobra nenhuma cópia da solicitação para reprocessamento.
- Como corrigir: relançar o erro no `catch`. Para não reenviar o e-mail a cada nova tentativa, gravar a mensagem na fila final antes de enviar o e-mail, ou registrar que o e-mail já foi enviado.
- Onde: `app-fail/src/controller/inspectionFailController.js:6-15`

### 2. Visibility timeout igual ao timeout da função (Alta)

- O que acontece: a mensagem fica invisível na fila de fail por 60 s, o mesmo tempo máximo de execução da função.
- Por que é um problema: se a execução chegar perto do limite, a mensagem volta a ficar visível durante o processamento e é tratada de novo, enviando o e-mail de erro em duplicidade. A AWS recomenda visibility de pelo menos 6 vezes o timeout.
- Como corrigir: aumentar o visibility timeout da fila de fail para 360 s.
- Onde: `infra/modules/sqs-inspection-fail/main.tf:7`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Relançar o erro da gravação na fila final (problema 1) e ajustar o visibility timeout (problema 2). Em dev e poc, aumentar a retenção das DLQs para mais de 4 dias.

## Observações

- Em poc, a URL da API de e-mail está vazia (`infra/poc.tfvars:23`) e o código usa, no lugar, a URL de hml definida como padrão (`app-fail/src/property/index.js:5-7`).
- A função é executada por meio do wrapper de segurança Twistlock, que não está no repositório; considerou-se que ele repassa evento e resposta sem alteração.

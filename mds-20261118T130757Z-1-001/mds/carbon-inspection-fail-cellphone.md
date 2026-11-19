# carbon-inspection-fail-cellphone

- Repositório: `inspection-request-cellphone/` (os caminhos citados são relativos a esta pasta)
- Código da função: `app-fail/`
- Classificação: PROBLEMA
- Funções sistêmicas: 1 (fila SQS `carbon-inspection-fail-cellphone`)

## Resumo

A função trata as solicitações de vistoria de celular que não puderam ser processadas. Ela consome a fila `carbon-inspection-fail-cellphone`, que recebe as mensagens que falharam 6 vezes na fila de solicitação (`carbon-inspection-request-cellphone`). Para cada mensagem, envia um e-mail de erro e guarda a mensagem na fila `carbon-inspection-request-cellphone-dead-letter`, que funciona como destino final. O problema principal é que, se essa gravação falhar, o erro é ignorado e a mensagem some sem cópia. Também há uma divergência no timeout configurado para a função.

## Gatilhos no Terraform

| Tipo | Origem | Configuração | Arquivo |
|------|--------|--------------|---------|
| SQS | Fila `carbon-inspection-fail-cellphone` | Lote de 10, falha parcial ativa | `infra/modules/sqs-inspection-fail/main.tf:31-44` |

A fila recebe mensagens pelo redrive da fila de solicitação (`infra/modules/sqs-inspection-request/main.tf:9-12`). O vínculo com o código é feito pelo módulo `lambda-inspection-fail`, que empacota a pasta `app-fail/`. Não há outros gatilhos no Terraform do repositório.

## Eventos tratados no handler

| Evento | Como o código identifica | Arquivo |
|--------|--------------------------|---------|
| Mensagem SQS | Percorre `event.Records` e lê `record.body` | `app-fail/index.js:4-19` |

Ramificação por tipo de evento: Não.

## Fluxos de retorno

O handler processa cada mensagem e devolve `{ batchItemFailures }` com as que falharam. Erros de validação e da API de e-mail são relançados e marcados corretamente. A gravação na fila final, porém, tem um `catch` que só registra aviso.

| Fluxo | Retorno | Situação |
|-------|---------|----------|
| E-mail enviado e mensagem guardada | Lista de falhas vazia | Correto |
| Dados inválidos ou falha no e-mail | Mensagem marcada como falha | Correto |
| Falha ao guardar a mensagem na fila final | Sucesso, erro ignorado | Problema 1 |

## Dead Letter Queue

As mensagens de vistoria de celular passam por esta cadeia:

1. Fila `carbon-inspection-request-cellphone`: após 6 falhas, vão para a fila de fail (não para uma DLQ).
2. Fila `carbon-inspection-fail-cellphone` (esta função): processa e grava cada mensagem, por código, em `carbon-inspection-request-cellphone-dead-letter`.
3. Se esta função falhar 10 vezes, a mensagem vai para `carbon-inspection-fail-cellphone-dead-letter`.

| Item | Valor |
|------|-------|
| DLQ da fila de fail | `carbon-inspection-fail-cellphone-dead-letter`, após 10 tentativas |
| Retenção das DLQs | 14 dias em prd; 3 dias em dev e 2 em poc |
| Visibility timeout x timeout | 60 s x 30 s (2 vezes) |

Configuração em `infra/modules/sqs-inspection-fail/main.tf` e `infra/modules/sqs-inspection-request-policy/main.tf`.

## Divergências Terraform x Código

O Terraform define `fail_lambda_timeout` (60 s) para esta função, mas o módulo recebe `request_lambda_timeout` (30 s). O timeout real da função é 30 s em todos os ambientes (`infra/main.tf:49`).

## Problemas encontrados

### 1. Erro ao guardar a mensagem na fila final é ignorado (Alta)

- O que acontece: depois de enviar o e-mail, a função grava a mensagem na fila `carbon-inspection-request-cellphone-dead-letter`. Se a gravação falhar, o erro só é registrado como aviso.

Trecho simplificado de `app-fail/src/controller/inspectionFailController.js:15-24`:

```js
async function sendMessageToDLQ(inputData) {
	try {
		await integration.sqs.send(inputData)
	} catch (error) {
		service.logger.warn(...)
	}
}
```

- Por que é um problema: a mensagem é confirmada como processada e removida da fila de fail. Se a gravação falhou, não sobra nenhuma cópia da solicitação para reprocessamento.
- Como corrigir: relançar o erro no `catch`. Para não reenviar o e-mail a cada nova tentativa, gravar a mensagem na fila final antes de enviar o e-mail, ou registrar que o e-mail já foi enviado.
- Onde: `app-fail/src/controller/inspectionFailController.js:15-24`

### 2. Timeout configurado para a função não é aplicado (Média)

- O que acontece: o Terraform passa o timeout da função de solicitação (30 s) para esta função, e a variável própria dela (60 s) não é usada.
- Por que é um problema: quem lê os `tfvars` espera 60 s. Se a variável correta for aplicada sem ajustar a fila, o visibility timeout (60 s) fica igual ao timeout e a mesma mensagem pode ser processada duas vezes, com e-mail duplicado.
- Como corrigir: passar `var.fail_lambda_timeout` ao módulo e, junto, aumentar o visibility timeout da fila de fail para 6 vezes o timeout escolhido.
- Onde: `infra/main.tf:49`

## Recomendação

A função tem uma única função sistêmica e não precisa ser dividida. Relançar o erro da gravação na fila final (problema 1) e passar o timeout correto à função, junto com o visibility timeout (problema 2). Em dev e poc, aumentar a retenção das DLQs para mais de 4 dias.

## Observações

- Em poc, a URL da API de e-mail está vazia (`infra/poc.tfvars:17`) e o código mantém o valor vazio, então todas as mensagens falham nesse ambiente.

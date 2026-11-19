# Visibilidade da fila de falhas — equipamentos portáteis

## Evidência e ajuste
dev.tfvars, hml.tfvars, poc.tfvars e prd.tfvars definem fail_lambda_timeout = 60. A função utiliza esse valor, mas a fila de falhas tinha visibility_timeout_seconds = 60 fixo.
O módulo SQS passa a receber lambda_timeout = var.fail_lambda_timeout e calcula visibilidade como 6 * var.lambda_timeout: 360 segundos nos quatro ambientes versionados. Não há janela de lote configurada; o default SQS/Lambda é zero. Se uma janela for adicionada, somar seu valor ao cálculo.

Referências oficiais:
- https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html
- https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-parameters.html

## Escopo e efeitos
Preservados timeout da função, código da aplicação, testes/Jest, payloads, redrive maxReceiveCount = 10, DLQ, batch_size = 10, concorrência = 5 e respostas parciais. Sem dependência de outro miniprojeto.
Aumentar a visibilidade reduz o risco de reentrega durante processamento/throttling; não torna o fluxo idempotente. Novas tentativas após falha podem esperar mais tempo (360 s em vez de 60 s). O tempo até redrive pode aumentar, sem equivaler a um SLA fixo de dez vezes esse valor. O risco de repetir e-mail permanece em AC-300.

## Verificação e implantação
Revisão estática do único consumidor deste módulo e da ligação da variável nos quatro tfvars: 60 * 6 = 360. Terraform/OpenTofu não estão disponíveis neste ambiente; fmt, validate e plan não foram executados. Nenhum teste criado, nenhuma API AWS, init, apply ou deploy executado.
Na VDI: executar fmt/validate e plan com backend, providers e variáveis corporativos; confirmar alteração esperada de visibilidade 60 → 360 sem substituição da fila ou alteração de outros recursos. Conferir estado efetivo da função, janela de lote e fila para detectar drift.
Na HML: avaliar duração, throttling, falhas parciais, nova tentativa, redrive, idade/backlog, risco de notificação duplicada e latência de recuperação. Confirmar alarmes e procedimento operacional. Registrar merge, implantação e homologação separadamente.

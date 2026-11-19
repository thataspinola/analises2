# Visibilidade da fila de processamento de lead (AC-193)

## Evidência e correção
DEV, HML e PRD versionam lambda_timeout = 60 e queue_visibility_timeout_seconds = 60. Não há tfvars POC nesta pasta. A consumidora process_lambda usa o mesmo lambda_timeout, e seu event source SQS não configura janela de lote (default zero).
A chamada do módulo da fila passa max(tonumber(var.queue_visibility_timeout_seconds), 6 * var.lambda_timeout), resultando em360 s nos três ambientes. Overrides maiores prevalecem; interface string e tfvars preservados. A descrição da variável esclarece o mínimo efetivo.
Se for adicionada janela de lote, somar sua duração à margem calculada.
Referências: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html e https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-parameters.html

## Escopo e efeitos
Preservados aplicação, API, cache/layer, timeout das funções, redrive configurado, DLQ, batch1, concorrência2, ReportBatchItemFailures, testes, Jest e dependências. Sem imports ou recursos compartilhados entre miniprojetos.
A margem para processamento/throttling aumenta; a espera de reentrega/redrive também pode aumentar. Não há garantia de processamento exatamente uma vez; confirmar idempotência e conciliação de leads antes de reprocessar.
Monitoração, alarmes e runbook dependem de inventário do ambiente; não presumir ausência por não estarem no módulo da fila. Nenhum alarme foi criado ou alterado.

## Verificação e implantação
Revisão estática da ligação entre timeout, consumidora, fila/event source e cálculo nos três tfvars: max(60,6×60)=360. Terraform/OpenTofu indisponíveis; fmt/validate/plan não executados. Suítes não executadas, nenhum teste novo.
Na VDI, executar fmt/validate/plan com backend/providers corporativos; confirmar alteração de visibilidade60 →360 sem substituir fila e sem alterações inesperadas. Conferir drift, overrides e janela efetiva.
Na HML, avaliar duração/throttling, falhas parciais, retry/redrive, backlog/idade, latência de recuperação, efeitos duplicados e conciliação dos leads. Confirmar alarmes, canal/responsável e runbook.
Sem AWS, API de negócio, init/apply/deploy ou alteração de dados. Merge, implantação e homologação separados.

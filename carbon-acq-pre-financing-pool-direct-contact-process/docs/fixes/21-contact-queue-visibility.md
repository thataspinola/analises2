# Visibilidade de contato de pré-financiamento (AC-130)

## Evidência e ajuste
DEV/HML: timeout da função60 s e visibilidade30 s. PRD:60/60 s. POC:25/30 s. A função process_lambda usa var.lambda_timeout; o event source SQS não configura janela de lote (default zero).
A fila passa a receber max(tonumber(var.queue_visibility_timeout_seconds), 6 * var.lambda_timeout). tonumber preserva a interface string existente convertendo para o cálculo. A descrição esclarece que o valor configurado é mínimo; overrides maiores prevalecem. Resultado atual: DEV/HML/PRD360 s, POC150 s. Tfvars e timeout das funções preservados.
Se for adicionada uma janela de lote, somar sua duração à margem calculada.
Referências: https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html e https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-parameters.html

## Escopo e efeitos
Preservados código, payloads, API de entrada, tabela/cache, redrive configurado, DLQ, batch1, concorrência2, ReportBatchItemFailures, dependências, testes e Jest. Sem dependência de outro miniprojeto.
Aumenta a margem para processamento/throttling e a espera de reentrega/redrive. Não fornece idempotência nem impede todos os efeitos duplicados.
Há alarme versionado de mensagens visíveis na DLQ com threshold20, período600 s e evaluation_periods parametrizado; sem alarm_actions no recurso. Validar acionamento externo, limiares e runbook separadamente. Nenhum alarme alterado.

## Verificação e implantação
Revisão estática da ligação de variáveis, módulo da função, fila/event source e cálculo nos quatro tfvars. Terraform/OpenTofu indisponíveis; fmt/validate/plan não executados. Suítes não executadas; nenhum teste novo.
Na VDI, executar fmt/validate/plan com backend/providers corporativos; confirmar somente visibilidade30 →360 em DEV/HML,60 →360 em PRD ou30 →150 em POC, sem substituir fila e preservando overrides maiores. Conferir drift e janela efetiva.
Na HML, avaliar duração, throttling, falhas parciais, retry/redrive, backlog/idade, latência de recuperação e efeitos duplicados no processamento de contato. Confirmar responsável, alarmes e reconciliação.
Sem AWS, API de negócio, init/apply/deploy ou alteração de dados. Merge, implantação e homologação separados.

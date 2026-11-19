# Visibilidade SQS — inspeção auto (AC-167)

## Evidência
HML/PRD versionam lambda_timeout = 60; DEV/POC usam 29. Os quatro ambientes configuram check_inspection_request_queue_visibility_timeout_seconds = 60. A janela de lote do event source SQS não é configurada (default zero).

## Ajuste
A chamada do módulo da fila passa max(visibilidade_configurada, 6 * lambda_timeout). O valor configurado continua como mínimo, preservando overrides maiores e sem duplicar o timeout. A descrição da variável esclarece o comportamento.
Valores efetivos dos tfvars atuais: DEV/POC 174 s; HML/PRD 360 s. Nenhum tfvars foi alterado. Se uma janela de lote for adicionada, somar sua duração à margem calculada.

Referências:
- https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html
- https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-parameters.html

## Escopo e impacto
Preservados timeout da Lambda, delay da fila, DLQ, redrive maxReceiveCount = 1, batch_size = 1, concorrência = 5, respostas parciais, stream DynamoDB, aplicação, testes/Jest e dependências. Não há dependência entre miniprojetos.
Aumentar visibilidade dá margem ao processamento e throttling; não fornece idempotência nem impede toda duplicação de pagamento. Falhas podem aguardar mais para nova entrega/redrive. A política atual maxReceiveCount = 1 foi mantida e deve ser considerada na recuperação operacional, sem presumir várias retentativas da fila.
Há alarme versionado de mensagens visíveis na DLQ, sem alarm_actions no recurso; inventário de destinos externos, limiares e recuperação permanece em AC-249. Nenhum alarme alterado.

## Verificação e pendências
Revisão estática de origem da variável, ligação do timeout à Lambda, cálculo nos quatro tfvars e parâmetros do event source. Terraform/OpenTofu indisponíveis: fmt, validate e plan não executados. Nenhum teste novo ou suíte executada.
Na VDI, conferir drift e estado real; executar fmt/validate/plan com providers/backend corporativos e confirmar somente visibilidade 60 → 174 em DEV/POC ou 60 → 360 em HML/PRD, sem substituição de fila. Overrides maiores devem prevalecer.
Na HML, verificar duração/throttling, falhas parciais, eventual reentrega/redrive, backlog/idade, latência de recuperação e idempotência/conciliação de pagamento. Confirmar monitoração e responsável.
Sem init/apply/deploy, AWS ou APIs de negócio. Merge, implantação e homologação separados.

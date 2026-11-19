# Workflow de proposta de Viagem

Workflow Express exposto por API Gateway e integrado à Lambda de proposta e à fila de atualização de lead.

Quando existe updateLead e o envio SQS falha, a execução termina em FAILED com UpdateLeadEnqueueFailed. A integração HTTP retorna 500 com mensagem genérica. Sem updateLead, o ramo permanece opcional. O mapping avalia o status da execução, pois o transporte de StartSyncExecution pode responder 200 mesmo quando o workflow falha.

O pacote e os testes locais acrescentados para validar ASL/VTL foram removidos por revisão do escopo em 19/11/2026. A correção do workflow e do template foi preservada.

Validar o plano Terraform e o fluxo real na VDI/HML. [Registro da correção](docs/fixes/03-travel-proposal-sqs-failure.md).

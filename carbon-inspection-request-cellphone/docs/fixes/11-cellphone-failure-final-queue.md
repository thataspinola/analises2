# P1 — Propagação de falha na fila final de vistoria de celular

## Problema e correção

A aplicação app-fail notifica o erro de vistoria por e-mail e depois aguarda o envio da mensagem à fila final, configurada em INSPECTION_CELLPHONE_DLQ. A integração SQS já rejeita quando o envio falha, mas sendMessageToDLQ capturava a exceção e apenas registrava um aviso. O controller concluía normalmente e o handler não incluía o registro em batchItemFailures.

O catch agora registra uma mensagem fixa em nível error e relança o erro recebido. O handler e o mapeamento Terraform existentes podem, assim, reconhecer a falha pelo messageId e permitir nova tentativa.

A integração, o payload e a ordem validação → montagem da notificação → envio do e-mail → envio à fila final permanecem iguais.

## Filas envolvidas

- A fila principal de solicitação encaminha falhas para a fila de trabalho de falhas, conforme o redrive existente de 6 recebimentos.
- app-fail é consumidora dessa fila de trabalho. O mapeamento já declara ReportBatchItemFailures, com lote de 10.
- A fila final usada pelo código é INSPECTION_CELLPHONE_DLQ, cujo padrão local é carbon-inspection-request-cellphone-dead-letter.
- A fila de trabalho de falhas também tem seu próprio redrive, maxReceiveCount = 10, para a DLQ com sufixo -dead-letter do próprio fluxo de falhas. Confirmar o nome e a URL efetivos na configuração implantada.

A correção não altera essa topologia nem equivale a substituir a cadeia por uma única DLQ.

## Escopo e verificação — 19/11/2026

- Alterado somente o catch de sendMessageToDLQ em app-fail/src/controller/inspectionFailController.js e este documento local.
- node --check aprovado no arquivo alterado.
- Revisados controller, handler, integração SQS, API de e-mail e mapeamentos/redrive Terraform.
- Diff e whitespace conferidos.
- Testes, fixtures, Jest, dependências, infraestrutura e demais aplicações preservados. Nenhum teste ou cenário novo foi criado.
- As suítes existentes não foram executadas. O teste legado que espera apenas warn e conclusão após falha SQS descreve o comportamento anterior; essa expectativa precisa ser revisada no processo corporativo, mantendo o cenário existente.
- Não houve envio real de mensagens ou e-mails, acesso AWS, deploy ou apply.

## Validação na VDI/HML e recuperação

Confirmar a propagação da falha SQS até batchItemFailures com o messageId do registro. Conferir o retorno à fila para nova tentativa, o redrive persistente e a recuperação a partir da DLQ. Conferir também o fluxo de sucesso e o destino efetivo da fila final.

A ordem atual foi preservada: o e-mail pode já ter sido enviado quando a gravação na fila final falha. A nova tentativa pode repetir a notificação. Validar esse risco no ambiente autorizado e revisar idempotência/reconciliação antes de ampliar reprocessamentos. Esta correção impede a confirmação silenciosa especificamente nessa falha; não oferece garantia de entrega única.

A mensagem fixa no catch não copia payload, stack ou mensagem livre de exceção. O handler e outras etapas ainda têm logs próprios e precisam da revisão separada de observabilidade/privacidade.

Permanecem separados os ajustes de timeout/visibilidade, alarmes, idempotência e a correção análoga de equipamentos portáteis. Código em main não comprova implantação nem homologação.

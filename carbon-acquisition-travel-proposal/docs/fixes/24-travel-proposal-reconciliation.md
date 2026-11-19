# Reconciliação de proposta de viagem e lead (AC-011)

## Evidência
Base revisada: fc5f9533b672de98ff63fb76824da082f18c07eb.
A máquina EXPRESS executa em paralelo envio SQS de updateLead e invocação de carbon-acquisition-travel-proposal:$LATEST. A Lambda é referenciada por ARN, mas sua implementação e o contrato do produto não estão nesta pasta.
O Fail UpdateLeadEnqueueFailed do ramo SQS e a resposta HTTP500 revelam falha do workflow, não rollback da proposta. A Lambda já invocada pode continuar após falha do Parallel.
Não há neste stack registro durável de etapa concluída, chave de idempotência de negócio ou recuperação seletiva implementada. Nome da execução não substitui chave de idempotência do produto.

## Matriz de decisão operacional
Antes de qualquer escrita, confirmar que a execução/Lambda encerrou e obter evidência autoritativa do produto e do consumidor. Um erro500, timeout ou falta de log não prova ausência de efeito.

| Proposta no produto | Atualização do lead | Tratamento após conferência autorizada |
| --- | --- | --- |
| Confirmada, com identificador | Confirmada no consumidor | Registrar convergência; não reenviar |
| Confirmada, com identificador | Pendente/não enviada comprovadamente | Recuperar somente atualização do lead pelo mecanismo aprovado do stack dono; não iniciar o workflow completo |
| Confirmada | Enfileirada, consumo pendente ou falho | Investigar consumidor/DLQ e recuperar mensagem existente segundo runbook dono; não adicionar cópia por padrão |
| Resultado incerto | Qualquer resultado | Consultar produto/operador antes de repetir; suspender reenvio automático |
| Ausência confirmada após término | Lead já atualizado | Definir com produto/negócio se a atualização é válida e como recuperar somente a proposta; sem presumir compensação |
| Ausência confirmada após término | Ausência confirmada | Reexecução completa só após confirmar semântica/idempotência e efeitos de todos os participantes |

## Evidência mínima e responsabilidades
Registrar em chamado restrito: ambiente, intervalo, execution ARN/correlação técnica, identificador de proposta confirmado, estado do lead, MessageId quando disponível, stack/equipe responsável e decisão de recuperação. Não copiar payloads com dados pessoais, tokens, certificados ou credenciais para este repositório.
Consultar logs existentes e sistemas autoritativos. SQS MessageId confirma aceitação, não aplicação no lead. Não usar ReceiveMessage em produção apenas para inventário, pois muda a visibilidade. Não consumir, apagar ou reenviar mensagens neste procedimento de diagnóstico.
O stack dono da fila/consumidor, DLQ e alarmes deve ser confirmado em AC-063. Contratos e operações de consulta do produto dependem do responsável pela Lambda/produto.
A máquina é Express: histórico depende de logs, cuja entrega é best effort. Ausência de log não resolve resultado incerto. RedriveExecution não é suportado para esta máquina Express; iniciar outra execução repete o fluxo, não recupera somente a etapa falhada.

## Requisitos antes de automatizar
1. Confirmar chave de negócio estável, escopo, prazo e resposta de idempotência do produto e atualização de lead.
2. Definir consulta autoritativa para resultado incerto e estados duráveis de proposta/atualização; incluir concorrência e reentregas.
3. Identificar mecanismo aprovado para recuperar somente atualização pendente; não alterar formato da mensagem sem contrato do consumidor.
4. Definir retenção, acesso, minimização de dados, alarmes e runbook com responsáveis. Aprovar infraestrutura durável ou mudança de orquestração apenas com o desenho do contrato confirmado.
5. Validar na VDI/HML proposta concluída com enqueue falho, envio aceito com timeout, consumo falho, conclusão tardia da Lambda e repetição concorrente. Recuperação seletiva deve manter uma proposta de negócio e atualização convergente.

Não inverter ramos, trocar Parallel por sequência, adicionar Retry ou considerar enqueue como confirmação de atualização para declarar idempotência. Tais mudanças isoladas não resolvem resultado incerto.

## Status e escopo
AC-011 continua A confirmar: matriz/runbook propostos, dependentes de responsáveis e validação na VDI/HML; não são um mecanismo automático implementado ou homologado.
Somente documentação. ASL, API, IAM, logs, aplicação e testes/Jest preservados. Nenhum teste novo, execução de suíte, envio SQS, chamada de produto, AWS ou deploy.
PR #3/AC-010 tratou sinalização de falha; não assegura reconciliação. Números de testes anteriores são históricos, pois os testes adicionados foram retirados no PR #12.

## Referências
- https://docs.aws.amazon.com/step-functions/latest/dg/state-parallel.html
- https://docs.aws.amazon.com/step-functions/latest/dg/cw-logs.html
- https://docs.aws.amazon.com/step-functions/latest/apireference/API_RedriveExecution.html

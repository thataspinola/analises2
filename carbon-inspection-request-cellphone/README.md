# Vistoria de celular

Miniprojeto independente com duas consumidoras SQS. Não importa código de outras pastas de analises2.

## Fluxos
- app-request: recebe eventos de vistoria com scope phone, valida entrada, cria proposta, grava dados na layer de pagamento e envia Analytics opcional.
- app-fail: recebe solicitações esgotadas, valida entrada, envia notificação de erro e grava a mensagem na fila final.

A fila principal redireciona após6 recebimentos à fila de trabalho de falhas. Esta tem redrive após10 para sua própria DLQ. A fila final escrita pela app-fail é a DLQ do fluxo de solicitações, distinta da DLQ da consumidora de falhas.

## Configuração e entrega
Cada aplicação tem seu package.json, lock e Jest. As layers privadas de token/pagamento e a instrumentação corporativa exigem ambiente autorizado. A pipeline existente GitLab/Jenkins permanece responsável pelo build/empacotamento/deploy; nenhuma pipeline nova.
Variáveis relevantes: NODE_ENV, MULE_URL, GOOGLE_ANALYTICS_COLLECT_QUEUE_URL, INTERNAL_GTW_EMAIL_NOTIFICATION_URL e INSPECTION_CELLPHONE_DLQ. Conferir também as variáveis de layers, certificados, rede, retenção e instrumentação no Terraform.
Não usar os defaults locais de endpoint como ambiente simulado: eles apontam para serviços externos. Não executar localRunner fora da VDI autorizada.

Na VDI, preparar dependências de cada aplicação com os lockfiles e registry corporativo, sem migrar runner:
- Em app-request: npm ci e npm test -- --runInBand
- Em app-fail: npm ci e npm test -- --runInBand
Os testes existentes foram preservados. A revisão não criou testes e não certificou sua aprovação: execução neste ambiente parou em jest: not found. Há expectativas antigas de log/warn que divergem das correções; registrar o resultado real antes de homologar, sem mudar testes nesta etapa.

## Situação da revisão
Ver [revisão consolidada](docs/fixes/27-cellphone-project-review.md) para commits, achados, alarmes, validação e dependências pendentes.
Logs novos usam awsRequestId/messageId e etapa; não registrar payloads, documentos pessoais, tokens ou mensagens brutas de dependências.
Timeout efetivo proposto: solicitações30 s e falhas60 s; visibilidade mínima180/360 s nos quatro tfvars. Redrive, batch10, concorrência5 e respostas parciais preservados.

Idempotência de proposta/e-mail, orçamento HTTP, IAM corporativo, alarmes e migração de runtime dependem de confirmação/validação na VDI/HML. Revisão de código e merge não equivalem a deploy ou homologação. Permanecemos nesta pasta enquanto essas pendências forem tratadas.

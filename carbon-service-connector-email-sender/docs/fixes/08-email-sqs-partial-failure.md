# P1 — Reconhecimento de falhas parciais no envio de e-mail

## Problema e correção

O handler já retorna batchItemFailures com o messageId de cada registro que falha. O controller relança falhas de validação, renderização, token e envio. Porém, o mapeamento SQS–Lambda não declarava function_response_types, deixando a resposta parcial sem efeito na configuração versionada.

O mapeamento passa a declarar:

```hcl
batch_size              = 10
function_response_types = ["ReportBatchItemFailures"]
```

Com essa configuração aplicada, os registros informados como falha permanecem sujeitos a nova tentativa, em vez de serem confirmados junto com o lote. Os registros bem-sucedidos não são incluídos na lista de falhas pelo handler. O lote explícito de 10 corresponde ao padrão documentado para SQS; confirmar eventual drift do recurso implantado no plano corporativo.

A política existente de redrive permanece com maxReceiveCount = 10 e destino na fila de dead letter deste miniprojeto.

## Escopo

Alteração exclusiva de infra/modules/lambda/main.tf e deste registro. Não houve alteração em código de aplicação, testes, Jest, dependências, filas, permissões, visibilidade ou regras de negócio. Não foram criados testes, cenários, fixtures ou pacotes de validação.

## Verificação realizada — 19/11/2026

- Revisão do handler, controller, testes preexistentes do handler e módulos Terraform de Lambda e fila.
- Conferido o contrato batchItemFailures/itemIdentifier existente e a propagação de falhas do controller.
- Revisão do diff e verificação de whitespace.
- Terraform CLI indisponível neste ambiente: fmt, validate e plano completo não foram executados.
- As suítes Jest existentes não foram executadas nesta alteração de infraestrutura.
- Não houve acesso AWS, envio de e-mails, deploy ou apply.

## Validação na VDI/HML

1. Executar a validação Terraform e gerar o plano pelo fluxo corporativo. Confirmar suporte do provider e alteração do mapeamento, mantendo os recursos e demais configurações.
2. Conferir FunctionResponseTypes = ReportBatchItemFailures e BatchSize = 10 no recurso efetivamente implantado.
3. Em ambiente autorizado, verificar sucesso e falha no mesmo lote usando o contrato existente: a falha deve voltar para tentativa e o sucesso deve ser confirmado. Confirmar a identificação pelo messageId.
4. Verificar o redrive da falha persistente para a DLQ e a recuperação operacional.

Respostas parciais não eliminam a entrega pelo menos uma vez nem a possibilidade de e-mails duplicados. Preservar idempotência e observar backlog/idade da fila e DLQ durante a validação.

## Débitos relacionados que seguem separados

- Reavaliar visibilidade da fila em relação ao timeout da Lambda e às tentativas.
- Revisar a mensagem vazia que o controller aceita sem lançar erro.
- Corrigir a leitura da correlação SQS quando o atributo chega como objeto com stringValue.
- O Terraform já declara um alarme de mensagens visíveis na DLQ, sem alarm_actions neste recurso. Confirmar roteamento externo antes de concluir que não há notificação ou criar outro alarme.

## Referências

- [AWS — falhas parciais em lotes SQS](https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html)
- [AWS — processamento de mensagens SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html)

# Exclusão do agendamento — inspeção auto (AC-169)

## Correção
O controller passa a aguardar deleteItemIfExists após sucesso do registro de pagamento. O DeleteCommand usa orderNumber#<quotationNumber>#idTransaction#<idTransaction>, igual ao PutCommand e ao GetCommand. RSK permanece inspectionRequestDate. Não há migração de chave nem remoção em lote de dados existentes.

## Comportamento preservado e limites
Mantida a consulta de existência antes da exclusão. Se o item não for encontrado, o método resolve sem DeleteCommand, inclusive quando já removido por TTL. A consulta não é fortemente consistente e existe intervalo entre leitura/exclusão; não se oferece garantia transacional nem controle de concorrência.
Falha de leitura/exclusão agora entra no catch existente do controller, que pode reagendar no DynamoDB ou enviar à DLQ conforme o prazo. Se a recuperação falhar, a rejeição chega ao handler existente. Não se afirma que toda falha de exclusão é reportada diretamente como falha de lote.
O pagamento já ocorreu antes da exclusão. Se a exclusão falhar e houver reagendamento, pode haver nova tentativa do pagamento. Avaliar idempotência/conciliação na VDI/HML; a alteração não resolve esse risco e não reverte pagamento.

O mapeamento versionado do stream filtra userIdentity.type = Service e principalId = dynamodb.amazonaws.com, usado para expiração por TTL. Exclusão explícita pela aplicação não deve ser tratada como novo agendamento nesse filtro; confirmar o estado implantado na VDI/HML. A factory do stream usa OldImage.
Payloads, TTL, filtros, redrive, pagamentos, testes/Jest e infraestrutura preservados. Nenhuma dependência entre miniprojetos. Logs preexistentes continuam na revisão AC-248.

## Verificação e implantação
node --check aprovado no controller e no serviço DynamoDB. Revisão estática de put/get/delete, sequência pagamento → exclusão, catch/recuperação e filtro do stream. Suítes não executadas; nenhum teste novo ou alteração nos existentes.
Na VDI/HML: confirmar exclusão do item exato com HPK e RSK, ausência de item, entrada por SQS e por TTL, leitura/exclusão com falha e recuperação existente, nenhuma reativação pelo delete explícito e comportamento do pagamento já efetuado. Conferir idempotência e conciliação antes da implantação.
Nenhuma operação DynamoDB/AWS/API de negócio, deploy ou limpeza de dados executada. Merge, implantação e homologação separados.

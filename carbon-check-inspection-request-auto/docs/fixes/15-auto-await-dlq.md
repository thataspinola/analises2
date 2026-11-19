# Aguardar envio à DLQ — inspeção auto (AC-166)

## Problema e correção
Dois ramos chamavam dlq.sendMessage(inputBody) sem aguardar: segunda falha de pagamento e esgotamento do prazo de reagendamento. O serviço já aguarda o SDK SQS, mas a Promise era descartada no controller. Agora ambos usam await; o log de envio existente só é alcançado após a resolução.

## Propagação e recuperação existente
Na segunda falha de pagamento, uma rejeição SQS ocorre dentro do catch do controller e propaga ao handler.
No helper putPaymentRegisterOnDb, chamado no try, uma rejeição entra no catch existente. Este pode persistir o reagendamento no DynamoDB ou tentar novamente a DLQ conforme a política atual. Se a recuperação aguardada também rejeitar, a rejeição chega ao handler. Não foi removida essa recuperação; não se afirma que toda primeira falha SQS retorna diretamente ao handler.
O handler usa Promise.allSettled e reporta messageId para SQS ou SequenceNumber para DynamoDB. Ambos os mapeamentos já declaram ReportBatchItemFailures.

## Limites preservados
Nenhuma alteração em payload, destino da DLQ, políticas de TTL/redrive, aplicação de pagamentos, infraestrutura, testes ou Jest. Nenhum recurso de outro miniprojeto.
Aguarda-se o término da operação; não há garantia de processamento exatamente uma vez. Sucesso no destino seguido de timeout pode permitir duplicação. As falhas/limites de stream e ausência de destino de falha continuam pendentes em AC-168.
A exclusão DynamoDB sem await e com chave divergente permanece mapeada em AC-169, próximo item. Logs preexistentes com payload/erros continuam na revisão de observabilidade AC-248, sem certificação de sanitização.

## Verificação
node --check no controller alterado aprovado. Revisão estática das duas chamadas, serviço SQS, handler e mapeamentos de evento. Suítes não executadas; testes/configuração Jest preservados e nenhum teste novo.
VDI/HML: confirmar mensagem na DLQ antes do retorno/log de sucesso nos dois ramos, segunda falha de pagamento, prazo esgotado, falha SQS com recuperação existente, falha persistente retornando identificador correto e sucesso de reagendamento. Avaliar duração adicional de espera e timeout, duplicações e recuperação operacional.
Nenhuma API de negócio, AWS ou deploy executado. Merge, implantação e homologação separados.

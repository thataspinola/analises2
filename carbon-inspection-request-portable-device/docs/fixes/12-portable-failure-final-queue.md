# Falha no envio à fila final — vistoria de equipamentos portáteis

## Problema e correção
O controller de app-fail aguardava o envio SQS, mas o catch somente registrava warn e encerrava com sucesso. Assim, o handler podia confirmar a mensagem recebida apesar da falha na gravação final.

O catch agora registra error com mensagem fixa, sem incluir payload ou a mensagem da exceção nesse novo log, e relança a exceção original. O catch externo continua propagando o erro; o handler já utiliza Promise.allSettled e retorna o messageId em batchItemFailures. O event source já declara ReportBatchItemFailures.

## Contratos e filas
Preservados payloads, validação, ordem e-mail → fila final, configuração, dependências, testes e Jest. Nenhum recurso de outro miniprojeto é utilizado.

A integração envia para INSPECTION_PORTABLE_DEVICE_DLQ. O default aponta à fila carbon-inspection-request-portable-device-dead-letter; o valor efetivo depende do ambiente. O redrive da fila de solicitações direciona à fila de trabalho de falhas após 6 recebimentos. Esta possui redrive próprio após 10 recebimentos para sua DLQ. A fila final usada pelo controller não deve ser confundida com essa DLQ de esgotamento do consumidor de falhas.

## Risco e observabilidade
Se o e-mail for enviado e a gravação final falhar, uma nova tentativa pode repetir a notificação. A correção não garante processamento exatamente uma vez. Avaliar deduplicação ou reconciliação separadamente, sem inverter a ordem de produção automaticamente.
Os demais logs existentes ainda necessitam revisão de privacidade e correlação. O log fixo deste catch não representa sanitização global.

## Verificação e pendências
- node --check no arquivo alterado: aprovado.
- Revisão estática: rejeição do SDK é aguardada, controller propaga e handler reporta messageId; mapeamento SQS já suporta falhas parciais.
- Testes/Jest preexistentes preservados; suítes não executadas. Dois cenários legados esperam warn e resolução após falha SQS, expectativa incompatível com a correção. Não foram alterados ou substituídos nesta etapa.
- VDI/HML: confirmar destino efetivo, falha no envio final, messageId reportado, nova tentativa, redrive e caminho de sucesso. Avaliar notificações repetidas e procedimento de reconciliação.
- Merge, deploy e homologação devem ser registrados separadamente. Nenhum deploy ou acesso AWS executado.

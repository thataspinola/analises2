exports.INFO_MESSAGE_RECEIVED_ON_PROCESS_QUEUE = () => 'Mensagem recebida da fila'

exports.INFO_MESSAGE_RECEIVED_ON_PROCESS_DYNAMODB_TTL = () => 'Mensagem recebida do dynamoDb'

exports.INFO_PAYLOAD_SENT_TO_PAYMENTREGISTER = () => 'Payload enviado para a paymentRegister'

exports.INFO_PAYMENTREGISTER_API_RESPONSE = () => 'Retorno da api paymentRegister'

exports.INFO_DATA_SENT_TO_DLQ = () => 'Dados enviados para a Dlq'

exports.INFO_DATA_SENT_TO_DB = (ttl) => `Dados enviados para o dynamoDb, o novo reprocessamento será a partir de ${ttl} minutos`

exports.ERROR_PROCESSING = () => 'Erro no processamento'

exports.ERROR_INVALID_INPUT = () => 'Mensagem com estrutura ou dado inválido.'

exports.INFO_REFUSED = () => 'Orçamento recusado, não haverá reprocessamento.'

exports.INFO_ISSUED = () => 'Orçamento emitido, não haverá reprocessamento.'

exports.INFO_PROTOCOLS_API_RESPONSE = () => 'Retorno da api de protocolos'
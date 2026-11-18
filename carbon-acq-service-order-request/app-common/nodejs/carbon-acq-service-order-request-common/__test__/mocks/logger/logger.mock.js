exports.INFO_CONTROLLER_PROCESSSQSMESSAGE_SUCCESS_MESSAGE = () => {
	return `Processamento de mensagem da fila bem sucedido. Dados resultantes: {"consentimentosRegistrados":"marketingOptInFlag,privacy.privacyPolicy","cpf":"0696******","nameArea":"Consorcio","pescod":"9226677","productId":"24","productName":"AUTOMOVEL","vertical":"Porto Bank"}`
}

exports.ERROR_VALIDATION_UNEXPECTED_ERROR_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Validação dos dados': Unexpected validation error`
}

exports.ERROR_VALIDATION_ERROR_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Validação dos dados': Validation`
}

exports.ERROR_EXCEPTION_SIMULATION_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Teste de exceção': Simulação de falha`
}

exports.ERROR_JSON_PARSE_ERROR_MESSAGE = () => {
	return `Processing JSON parse error: Unexpected end of JSON input`
}

exports.ERROR_CONTROLLER_PROCESSSQSMESSAGE_INTERNAL_ERROR_MESSAGE_BEGINNING = (
	errorMessage
) => {
	return `Erro interno no processamento de mensagem da fila. Mensagem de erro: ${errorMessage}`
}

exports.ERROR_CONTROLLER_PROCESSSQSMESSAGE_NONVALIDATION_INTERNAL_ERROR_EXCEPTIONGETDATA_BEGINNING =
	(errorMessage) => {
		return `Erro interno no processamento de mensagem da fila. Mensagem de erro: Any controller processSqsMessage non Validation error. Dados: Não foi possível exibir os dados - Mensagem de erro: ${errorMessage}`
	}

exports.ERROR_GENERIC_MESSAGE_BEGINNING = () =>
	'Erro no processamento da mensagem SQS:'

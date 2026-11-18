exports.INPUT_TOKEN = () => {
	return {
		traceId: 'traceId',
		numeroOrcamentoExterno: '1234'
	}
}

exports.VALID_RESPONSE_DATA = () => {
	return 'token_commerce_integration_carbon'
}

exports.TOKEN_MESSAGE_ERROR = () => {
	return 'Erro ao obter token'
}

exports.LOG_ERROR_TOKEN = () => {
	const errorReporting = JSON.stringify({
		rawError: new Error(this.TOKEN_MESSAGE_ERROR()),
		carbonErrorData: {
			identifiers: `carbon-trace-id: ${this.INPUT_TOKEN().traceId}`, 
			layer: "ConsentsController",
			currentActivity: "Erro identificado durante a atividade: 'Obtendo o token Sensedia'", 
			errorMessage: this.TOKEN_MESSAGE_ERROR(), 
		}
	})

	return errorReporting
}
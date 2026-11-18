exports.INPUT_CERTIFICATE = () => {
	return {
		traceId: 'traceId',
		numeroOrcamentoExterno: '1234'
	}
}

exports.VALID_RESPONSE_DATA = () => {
	return 'CERTIFICATE'
}

exports.CERTIFICATE_MESSAGE_ERROR = () => {
	return 'Erro ao obter certificado'
}

exports.LOG_ERROR_CERTIFICATE = () => {
	const errorReporting = JSON.stringify({
		rawError: new Error(this.CERTIFICATE_MESSAGE_ERROR()),
		carbonErrorData: {
			identifiers: `carbon-trace-id: ${this.INPUT_CERTIFICATE().traceId}`, 
			layer: "ConsentsController",
			currentActivity: "Erro identificado durante a atividade: 'Obtendo o certificado do Sensedia'", 
			errorMessage: this.CERTIFICATE_MESSAGE_ERROR(), 
		}
	})

	return errorReporting
}

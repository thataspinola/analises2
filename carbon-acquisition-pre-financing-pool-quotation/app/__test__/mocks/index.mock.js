exports.GETERRORDATA_RESPONSE_ERROR_WITHREQUEST_VALID_INPUT = () => {
	return {
		request: {
			data: 'Lorem Ipsum',
		},
	}
}
exports.GETERRORDATA_NORESPONSE_VALID_RETURN = () => {
	return {
		status: 500,
		message: 'API não respondeu à chamada',
	}
}
exports.GETERRORDATA_RESPONSE_ERROR_UNEXPECTED_VALID_INPUT = () => {
	return {
		message: 'Unexpected',
	}
}
exports.GETERRORDATA_RESPONSE_ERROR_WITHRESPONSE_VALID_INPUT = () => {
	return {
		response: {
			status: 400,
			data: 'Request error',
		},
	}
}

exports.GETERRORDATA_UNEXPECTED_VALID_RETURN = () => {
	return {
		status: 500,
		message: `Erro inesperado recebido da chamada da API: Unexpected`,
	}
}
exports.GETERRORDATA_REQUESTERROR_VALID_RETURN = () => {
	return {
		status: 500,
		message: `Erro recebido da chamada da API: código '400' dados: '"Request error"'`,
	}
}

exports.SENSEDIA_CORP_CARBON_TOKEN = () => {
	return 'token'
}

exports.CORP_CA_CERTIFICATES = () => {
	return []
}
exports.ERROR_CONTROLLERACTIVITY_GETAPIGATEWAYCERTIFICATES_OBJECT = (
	thrownError
) => {
	return { rawError: thrownError }
}
exports.ERROR_CONTROLLERACTIVITY_GETAPIGATEWAYCERTIFICATES_MESSAGE = (
	message
) => {
	return `Erro identificado durante a atividade 'Obtenção dos certificados corporativos para comunicação com o API Gateway': ${message}`
}
exports.ERROR_CONTROLLERACTIVITY_GETAPIGATEWAYTOKENS_OBJECT = (thrownError) => {
	return { rawError: thrownError }
}
exports.ERROR_CONTROLLERACTIVITY_GETAPIGATEWAYTOKENS_MESSAGE = (message) => {
	return `Erro identificado durante a atividade 'Obtenção do token do API Gateway Sensedia Corp Cloud': ${message}`
}


exports.GETERRORDATA_RESPONSE_ERROR_WITHRESPONSE_VALID_INPUT = () => {
	return {
		response: {
			status: 500,
			data: 'Request error',
		},
	}
}

exports.GETERRORDATA_RESPONSE_BUSINESS_ERROR_WITHRESPONSE_VALID_INPUT = () => {
	return {
		response: {
			status: 400,
			data: {
				payload: {
					message: 'Algum erro de negócio simulado.',
				}
			}
		},
	}
}

exports.GETERRORDATA_RESPONSE_ERROR_WITHREQUEST_VALID_INPUT = () => {
	return {
		request: {
			data: 'Lorem Ipsum',
		},
	}
}

exports.GETERRORDATA_RESPONSE_ERROR_UNEXPECTED_VALID_INPUT = () => {
	return {
		message: 'Unexpected',
	}
}

exports.GETERRORDATA_REQUESTERROR_VALID_RETURN = () => {
	return {
		status: 500,
		message: `Erro recebido da chamada da API: código '500' dados: '"Request error"'`,
	}
}

exports.GETERRORDATA_REQUESTERROR_BUSINESS_VALID_RETURN = () => {
	return {
		status: 400,
		message: 'Algum erro de negócio simulado.',
	}
}

exports.GETERRORDATA_NORESPONSE_VALID_RETURN = () => {
	return {
		status: 500,
		message: 'API não respondeu à chamada',
	}
}

exports.GETERRORDATA_UNEXPECTED_VALID_RETURN = () => {
	return {
		status: 500,
		message: `Erro inesperado recebido da chamada da API: Unexpected`,
	}
}

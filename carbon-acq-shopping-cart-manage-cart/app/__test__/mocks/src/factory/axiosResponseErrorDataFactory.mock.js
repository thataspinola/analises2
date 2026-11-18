exports.RESPONSE_ERROR_WITHRESPONSE_VALID_INPUT = () => {
	return {
		response: {
			status: 400,
			data: 'Request error',
		},
	}
}

exports.RESPONSE_ERROR_WITHREQUEST_VALID_INPUT = () => {
	return {
		request: {
			data: 'Lorem Ipsum',
		},
	}
}

exports.RESPONSE_ERROR_UNEXPECTED_VALID_INPUT = () => {
	return {
		message: 'Unexpected',
	}
}

exports.REQUESTERROR_VALID_RETURN = () => {
	return {
		status: 500,
		message: `Erro recebido da chamada da API: código '400' dados: '"Request error"'`,
	}
}

exports.NORESPONSE_VALID_RETURN = () => {
	return {
		status: 500,
		message: 'API não respondeu à chamada',
	}
}

exports.UNEXPECTED_VALID_RETURN = () => {
	return {
		status: 500,
		message: `Erro inesperado recebido da chamada da API: Unexpected`,
	}
}

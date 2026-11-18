exports.VALID_INPUT_WITH_RESPONSE_ERROR = () => {
	return {
		response: {
			status: 400,
			data: 'Request error',
		},
	}
}

exports.VALID_INPUT_WITH_REQUEST_ERROR = () => {
	return {
		request: {
			data: 'Lorem Ipsum',
		},
	}
}

exports.VALID_INPUT_WITH_UNEXPECTED_ERROR = () => {
	return {
		message: 'Unexpected',
	}
}

exports.VALID_RETURN_WITH_REQUEST_ERROR = () => {
	return {
		status: 500,
		message: `Erro recebido da chamada da API: código '400' dados: '"Request error"'`,
	}
}

exports.VALID_RETURN_WITH_NO_RESPONSE = () => {
	return {
		status: 500,
		message: 'API não respondeu à chamada',
	}
}

exports.VALID_RETURN_WITH_UNEXPECTED_ERROR = () => {
	return {
		status: 500,
		message: `Erro inesperado recebido da chamada da API: Unexpected`,
	}
}

exports.error = (message) => {
	const response = {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}

	if (message) {
		Object.assign(response.body, { message })
	}

	return response
}

exports.badRequestError = (message) => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: message || 'O corpo da requisição fornecido é inválido',
		},
	}
}

exports.success = (data) => {
	return {
		statusCode: 200,
		body: data ? data : [],
	}
}

exports.noContent = () => {
	return {
		statusCode: 204,
		body: {},
	}
}

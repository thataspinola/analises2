exports.error = (message, code = 500) => {
	return {
		statusCode: code,
		body: {
			status: 'error',
			message,
		},
	}
}

exports.success = (body) => {
	return {
		statusCode: 200,
		body: body,
	}
}

exports.handler = (response) => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: response.statusCode,
		body: JSON.stringify(response.body),
	}
}

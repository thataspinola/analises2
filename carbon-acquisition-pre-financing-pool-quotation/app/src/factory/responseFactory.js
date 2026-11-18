exports.success = (data) => {
	return {
		Status: "SUCCEEDED",
		Output: JSON.stringify(data),
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify(data),
	}
}
exports.error = (
	message,
	code = 500
) => {
	return {
		Status : "FAILED",
		isBase64Encoded: false,
		headers: {},
		statusCode: code,
		body: message,
	}
}

exports.badRequestError = (message) => {
	return {
		Status : "FAILED",
		statusCode: 400,
		headers: { 'Content-Type': 'application/json' },
		body: {
			status: 'error',
			message: message || 'O corpo da requisição fornecido é inválido',
		},
	}
}


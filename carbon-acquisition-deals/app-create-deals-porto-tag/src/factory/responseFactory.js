const CONSTANTS = require('../property')

exports.success = (data) => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify(data),
	}
}

exports.error = (
	message = CONSTANTS.INTERNAL_SERVER_ERROR_DEFAULT_MESSAGE,
	statusCode = 500
) => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: statusCode,
		body: JSON.stringify(message),
	}
}

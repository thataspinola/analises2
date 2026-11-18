exports.updateLeadSuccess = (statusCode, statusMessage) => {
	return {
		statusCode: statusCode,
		statusMessage: statusMessage,
	}
}

exports.error = (message, code = 500) => {
	return {
		statusCode: code,
		body: {
			status: 'error',
			message,
		},
	}
}

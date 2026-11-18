exports.default = (message, status, httpCode) => {
	return {
		statusCode: httpCode,
		body: {
			status: `${status}`,
			message: message,
		},
	}
}

exports.transmissionSuccess = (message) => {
	return {
		statusCode: 200,
		body: {
			status: 'ok',
			message: message,
		},
	}
}

exports.badRequestTransmissionError = (message) => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message,
		},
	}
}

exports.error = (message) => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: message,
		},
	}
}

exports.error = (message, statusCode) => {
	const response = {
		statusCode: statusCode || 500,
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
			message: message || 'The supplied request body is invalid',
		},
	}
}

exports.success = (
	getAppointmentResponseData
) => {
	return {
		statusCode: 200,
		body: getAppointmentResponseData ?? {},
	}
}

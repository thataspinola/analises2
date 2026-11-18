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
			message,
		},
	}
}

exports.success = (response) => {
	return {
		statusCode: 200,
		body: response,
	}
}

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

exports.success = (data) => {
	return {
		statusCode: 200,
		body: data,
	}
}

exports.noContent = (message) => {
	return {
		statusCode: 204,
		body: message,
	}
}

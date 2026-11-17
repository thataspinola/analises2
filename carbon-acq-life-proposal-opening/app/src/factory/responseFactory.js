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
			message: message || 'The supplied request body is invalid',
		},
	}
}

exports.success = (successBodyContent) => {
	let successBody = {}
	let statusCode = 200
	if (successBodyContent === undefined) {
		successBody = {}
		statusCode = 204
	} else {
		successBody = successBodyContent
	}
	return {
		statusCode: statusCode,
		body: successBody,
	}
}

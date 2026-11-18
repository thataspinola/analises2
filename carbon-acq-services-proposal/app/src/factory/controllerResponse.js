exports.error = (error) => {
	const response = {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}

	if (error && error.message) {
		Object.assign(response.body, { message: error.message })
	}

	if (error && error.codeError) {
		Object.assign(response.body, { errorCode: error.codeError })
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

exports.success = (responseData) => {
	return {
		statusCode: 200,
		body: responseData,
	}
}

exports.newSchedule = (orderBookData) => {
	return {
		statusCode: 200,
		body: orderBookData,
	}
}

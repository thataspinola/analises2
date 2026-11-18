exports.ERROR_RESPONSE_WITH_MESSAGE = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: 'An error occurred',
		},
	}
}

exports.ERROR_RESPONSE_WITHOUT_MESSAGE = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}
}

exports.BAD_REQUEST_ERROR_RESPONSE = () => {
	return {
		statusCode: 400,
		body: {
			message: 'Bad request',
		},
	}
}

exports.SUCCESS_RESPONSE = () => {
	return {
		statusCode: 200,
		body: 'Operation successful',
	}
}

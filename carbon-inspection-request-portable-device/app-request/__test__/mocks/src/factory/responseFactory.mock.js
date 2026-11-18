const SUCCESS_BODY_CONTENT_VALUE = 'Successo'
const ERROR_MESSAGE_VALUE = 'Some error message'

exports.SUCCESS_BODY_CONTENT = () => SUCCESS_BODY_CONTENT_VALUE

exports.SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: SUCCESS_BODY_CONTENT_VALUE,
	}
}

exports.SUCCESS_EMPTY_BODY_RETURN = () => {
	return {
		statusCode: 200,
		body: {},
	}
}

exports.DEFAULT_ERROR_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}
}

exports.ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: ERROR_MESSAGE_VALUE,
		},
	}
}

exports.ERROR_MESSAGE = () => ERROR_MESSAGE_VALUE

const MOCKS = require('../../index.mock')
const ERROR_MESSAGE_CONTENT = 'Some error message'

exports.DEFAULT_ERROR_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}
}

exports.ERROR_MESSAGE = () => {
	return ERROR_MESSAGE_CONTENT
}

const ERROR_WITH_MESSAGE_RETURN_BODY_VALUE = {
	status: 'error',
	message: ERROR_MESSAGE_CONTENT,
}

exports.ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT = () => {
	return ERROR_WITH_MESSAGE_RETURN_BODY_VALUE
}

exports.ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: ERROR_WITH_MESSAGE_RETURN_BODY_VALUE,
	}
}

exports.DEFAULT_BAD_REQUEST_ERROR_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: 'The supplied request body is invalid',
		},
	}
}

const BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_VALUE = {
	status: 'error',
	message: ERROR_MESSAGE_CONTENT,
}

exports.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT = () => {
	return BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_VALUE
}

exports.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 400,
		body: BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_VALUE,
	}
}

exports.SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: {
			dates: MOCKS.API_SERVICO_RESOLVE_APPOINTMENT_SERVICE_V1.VALID_RETURN(),
		},
	}
}

exports.SUCCESS_EMPTY_BODY_RETURN = () => {
	return {
		statusCode: 200,
		body: {},
	}
}

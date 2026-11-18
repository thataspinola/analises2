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
	errorCode: 'ex01',
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

exports.ERROR_WITHOUT_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: { status: 'error' },
	}
}

exports.DEFAULT_BAD_REQUEST_ERROR_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			message: 'Requisição inválida',
		},
	}
}

const BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_VALUE = {
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

exports.CONTROLLER_SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: MOCKS.FACTORY_CONTROLLER_REQUEST_PROCESSEDRETURNPAYLOAD.PAYLOAD_RETURN(),
	}
}

exports.CONTROLLER_SUCCESS_NEW_SCHEDULE_RETURN = () => {
	return {
		statusCode: 200,
		body: MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_RETURN(),
	}
}

exports.SUCCESS_EMPTY_BODY_RETURN = () => {
	return {
		statusCode: 200,
		body: {},
	}
}

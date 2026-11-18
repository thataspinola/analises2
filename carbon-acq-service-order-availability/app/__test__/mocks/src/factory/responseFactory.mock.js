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

exports.SUCCESS_BODY_CONTENT = () => {
	return MOCKS.FACTORY_RESPONSE_API.GETPAYLOAD_VALID_RETURN()
}

exports.SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: MOCKS.FACTORY_RESPONSE_API.GETPAYLOAD_VALID_RETURN(),
	}
}

exports.SUCCESS_EMPTY_BODY_RETURN = () => {
	return {
		statusCode: 200,
		body: {},
	}
}

exports.NO_CONTENT_RETURN_FACTORY = () => ({
	statusCode: 500,
	body: {
		message: 'Some error message',
		status: 'error',
	},
})

exports.POSTSERVICEAPPOINTMENT_NULL_RESPONSE = () => null

exports.POSTSERVICEAPPOINTMENT_NULL_OBTERLISTASUGESTOESOUT = () => ({
	obterListaSugestoesOut: null,
})

exports.POSTSERVICEAPPOINTMENT_NULL_REGULACOESSAPS = () => ({
	obterListaSugestoesOut: {
		regulacoessaps: null,
	},
})

exports.POSTSERVICEAPPOINTMENT_EMPTY_REGULACOESSAPS = () => ({
	obterListaSugestoesOut: {
		regulacoessaps: [],
	},
})

exports.POSTSERVICEAPPOINTMENT_NULL = () => null

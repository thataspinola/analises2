exports.SERVICE_CPF = require('./src/service/cpfService.mock')
exports.SERVICE_PAYLOADSCHEMA_VALIDATOR = require('./src/service/payloadSchemaValidatorService.mock')
exports.SERVICE_CNPJ = require('./src/service/cnpjService.mock')

exports.RESPONSE_FACTORY_DEFAULT_ERROR_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}
}

const RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT = 'Some error message'

exports.RESPONSE_FACTORY_ERROR_MESSAGE = () => {
	return RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT
}

exports.RESPONSE_FACTORY_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT,
		},
	}
}

exports.RESPONSE_FACTORY_DEFAULT_BAD_REQUEST_ERROR_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: 'The supplied request body is invalid',
		},
	}
}

exports.RESPONSE_FACTORY_BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT,
		},
	}
}

const RESPONSE_FACTORY_SUCCESS_BODY_CONTENT_VALUE = {
	something: 'somevalue',
}

exports.RESPONSE_FACTORY_SUCCESS_BODY_CONTENT = () => {
	return RESPONSE_FACTORY_SUCCESS_BODY_CONTENT_VALUE
}

exports.RESPONSE_FACTORY_SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: RESPONSE_FACTORY_SUCCESS_BODY_CONTENT_VALUE,
	}
}

exports.RESPONSE_FACTORY_SUCCESS_EMPTY_BODY_RETURN = () => {
	return {
		statusCode: 200,
		body: {},
	}
}
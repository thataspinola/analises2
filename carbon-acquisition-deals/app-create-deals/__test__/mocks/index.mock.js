exports.SERVICE_SIMPLE_NOTIFICATION_MOCKS = require('./integration/simpleNotificationService.mock')

exports.SENSEDIA_CARBON_CLOUD_TOKEN = () => {
	return 'token'
}

exports.API_ELEGIBILIDADE_SEARCH_VALID_RETURN = () => {
	return { elegivel: true }
}

exports.VALID_INPUT_DATA = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		codigoCampanha: '86',
		creditCards: false,
		eligibility: false
	}
}

exports.INPUT_DATA_CODIGO_CAMPANHA_NULL = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		codigoCampanha: null,
		creditCards: false,
		eligibility: true,
	}
}

exports.INPUT_DATA_CODIGO_CAMPANHA_MISSING = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		creditCards: false,
		eligibility: true,
	}
}

exports.INPUT_DATA_CODIGO_CAMPANHA_INVALID_TYPE = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		codigoCampanha: 86,
		creditCards: false,
		eligibility: true,
	}
}

exports.INVALID_INPUT_DATA = () => {
	return {
		scope: '',
		value: '',
	}
}

exports.INVALID_INPUT_DATA_INVALID_PROPERTY = () => {
	return {
		teste: '31033230006',
	}
}

exports.INVALID_INPUT_DATA_TYPE_PROPERTY = () => {
	return {
		codigoCanal: '83',
		tipoDocumento: 'CPF',
		documento: '00000017400',
		codigoCampanha: '86',
	}
}

exports.INVALID_INPUT_DATA_CPF_INVALID = () => {
	return {
		codigoCanal: '83',
		tipoDocumento: 'CPF',
		documento: '00000000000',
		codigoCampanha: '86',
	}
}

exports.CONTROLLER_VALID_RETURN_RESPONSE = () => {
	return {
		statusCode: 200,
		body: {
			elegivel: true,
		},
	}
}

exports.CONTROLLER_REQUEST_INTERNAL_ERROR = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: 'Erro interno',
		},
	}
}

exports.CONTROLLER_REQUEST_BAD_REQUEST = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: 'Número de CPF inválido',
		},
	}
}

const CONTROLLER_SUCCESS_RETURN_BODY_VALUE = {
	body: { status: 200, message: 'success' },
	headers: {},
	isBase64Encoded: false,
	statusCode: 200,
}

exports.CONTROLLER_RESPONSE_SUCCESS = () => {
	return CONTROLLER_SUCCESS_RETURN_BODY_VALUE
}

exports.CONTROLLER_REQUEST_SUCCESS_RETURN = () => {
	return CONTROLLER_SUCCESS_RETURN_BODY_VALUE
}

exports.HANDLER_VALID_REQUEST_INPUT_DATA = () => {
	return {
		body: JSON.stringify(this.VALID_INPUT_DATA()),
	}
}

exports.HANDLER_SUCCESS_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify({
			status: 200,
			message: 'success',
		}),
	}
}

exports.HANDLER_INVALID_REQUEST_INPUT_DATA = () => {
	return {}
}

exports.HANDLER_FAIL_RETURN_WITH_INVALID_INPUT = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 500,
		body: {
			status: 'error',
			message: 'Input must be a string',
		},
	}
}

exports.HANDLER_INVALID_INPUT_REQUEST_DATA_WITH_ERROR_PARSED = () => {
	return {
		body: '{',
	}
}

exports.HANDLER_FAIL_RETURN_WITH_INPUT_ERROR_PARSED = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 500,
		body: {
			status: 'error',
			message: 'Unexpected end of JSON input',
		},
	}
}

exports.HANDLER_FAIL_RETURN_CONTROLLER_ERROR = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 500,
		body: JSON.stringify({
			status: 'error',
			message: 'Erro interno',
		}),
	}
}

exports.API_VALID_INPUT_DATA = '31033230006'

exports.API_VALID_RETURN = () => {
	return { elegivel: true }
}

exports.URL_PATH = 'URL_PATH'

const { error } = require('../../src/factory/responseFactory')

const HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE = {
	client: {
		fullName: 'Nomeir Sobrenomeson',
		cpfCnpj: '01141361060',
		cellPhone: '19988774455',
		email: 'cliente@clienteproduto.com.br',
	},
	address: {
		zipCode: '01254-985',
	},
	marketingOptOutFlag: false,
	channel: 'whatsapp',
	product: 'AUTOMOVEL',
	flag: "pre_financing_contact_request"
}

const HANDLER_VALID_POST_INPUT_REQUEST_DATA_VALUE = {
	body: JSON.stringify(HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE),
}

exports.HANDLER_VALID_POST_INPUT_REQUEST_DATA = () => {
	return HANDLER_VALID_POST_INPUT_REQUEST_DATA_VALUE
}

const HANDLER_INVALID_POST_INPUT_REQUEST_DATA_VALUE_WITH_ERROR_PARSED = {
	body: '{',
}

exports.HANDLER_VALID_POST_INPUT_REQUEST_DATA = () => {
	return HANDLER_VALID_POST_INPUT_REQUEST_DATA_VALUE
}

exports.HANDLER_INVALID_POST_INPUT_REQUEST_DATA_WITH_ERROR_PARSED = () => {
	return HANDLER_INVALID_POST_INPUT_REQUEST_DATA_VALUE_WITH_ERROR_PARSED
}

exports.HANDLER_INVALID_POST_NULL_INPUT_REQUEST_DATA = () => {
	return {}
}

exports.HANDLER_SUCCESS_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify(
			CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_SUCCESS_RETURN_BODY_VALUE
		),
	}
}

exports.HANDLER_FAIL_RETURN_WITH_INPUT_NULL = () => {
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

exports.HANDLER_FAIL_RETURN_WITH_INPUT_ERROR_PARSED = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 500,
		body: {
			status: 'error',
			message: "Expected property name or '}' in JSON at position 1 (line 1 column 2)",
		},
	}
}

const CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_VALID_INPUT_VALUE =
	HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE

const CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_SUCCESS_RETURN_BODY_VALUE = {
	directContactRequestQueueMessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866',
}

exports.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_SUCCESS_RETURN_BODY_VALUE,
	}
}

exports.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_VALID_INPUT = () => {
	return CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_VALID_INPUT_VALUE
}

const CONTROLLER_DIRECTCONTACT_VALID_SQS_RESPONSE_VALUE = {
	MessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866',
}

exports.CONTROLLER_DIRECTCONTACT_VALID_SQS_RESPONSE = () => {
	return CONTROLLER_DIRECTCONTACT_VALID_SQS_RESPONSE_VALUE
}

exports.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_INVALID_TYPE_INPUT_INTERNAL_ERROR =
	() => {
		return {
			statusCode: 500,
			body: {
				status: 'error',
				message: 'Erro interno ao registrar solicitação de contato direto',
			},
		}
	}

exports.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_INVALID_JSON_FORMAT_INTERNAL_ERROR =
	() => {
		return {
			statusCode: 500,
			body: {
				status: 'error',
				message: 'Erro interno ao registrar solicitação de contato direto',
			},
		}
	}

exports.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_INVALID_JSON_INPUT = () => {
	return {
		justAnUnexpectedProperty: 'And not include any expected ones',
	}
}

exports.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_INVALID_JSON_INPUT_INTERNAL_ERROR =
	() => {
		return {
			statusCode: 500,
			body: {
				status: 'error',
				message: 'Erro interno ao registrar solicitação de contato direto',
			},
		}
	}

exports.CONTROLLER_DIRECTCONTACT_UPDATE_PROCESSREQUEST_INVALID_JSON_INPUT_INTERNAL_ERROR =
	() => {
		return {
			statusCode: 500,
			body: {
				status: 'error',
				message: 'Direct contact Update request error: Invalid payload',
			},
		}
	}

exports.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_VALID_JSON_INVALID_CPFCNPJ_INPUT =
	() => {
		return {
			...HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE,
			client: {
				...HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE.client,
				cpfCnpj: '12345678901',
			},
		}
	}

exports.CONTROLLER_DIRECTCONTACT_PROCESSREQUEST_VALID_JSON_INVALID_CPFCNPJ_INPUT_INTERNAL_ERROR =
	() => {
		return {
			statusCode: 400,
			body: {
				status: 'error',
				message: 'Número de CPF/CNPJ inválido',
			},
		}
	}

exports.FACTORY_RESPONSE_SUCCESS_INPUT_DATA = () => {
	return HANDLER_VALID_POST_INPUT_REQUEST_DATA_BODY_JSON_VALUE
}

exports.FACTORY_RESPONSE_SUCCESS_INPUT_SQS_RESPONSE = () => {
	return CONTROLLER_DIRECTCONTACT_VALID_SQS_RESPONSE_VALUE
}

exports.FACTORY_RESPONSE_SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: {
			directContactRequestQueueMessageId:
				'd5f6aa22-a863-4df9-9763-37ab760a3866',
		},
	}
}

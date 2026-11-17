const MOCKS = require('../../index.mock')

const PROCESS_VALID_PARSEDJSON_INPUT_VALUE = {
	latitude: '-23.55052',
	longitude: '-46.633308',
	workingSaturday: 'true',
	operatesAtNight: 'false',
	electricCharger: 'false',
}

exports.API_GATEWAY_TOKEN = () => {
	return 'token'
}

exports.PROCESS_EXCEPTION_SIMULATE_VALID_PARSEDJSON_INPUT = () => {
	return {
		latitude: 'Except',
	}
}

exports.PROCESS_EXCEPTION_SIMULATE_MESSAGE = () => {
	return `Erro recebido da chamada da API: código '500' dados: '{ "message": "Simulação de falha" }'`
}

exports.PROCESS_VALID_PARSEDJSON_INPUT = () => {
	return PROCESS_VALID_PARSEDJSON_INPUT_VALUE
}

exports.PROCESS_INVALID_PARSEDJSON_INPUT = () => {
	const PROCESS_INVALID_PARSEDJSON_INPUT_VALUE = {
		...PROCESS_VALID_PARSEDJSON_INPUT_VALUE,
	}
	delete PROCESS_INVALID_PARSEDJSON_INPUT_VALUE.latitude
	return PROCESS_INVALID_PARSEDJSON_INPUT_VALUE
}

exports.PROCESS_INVALID_JSON_INPUT_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento da chamada da API do CAPS: Validation'
}

exports.PROCESS_UNEXPECTED_INPUT_VALIDATION_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento da chamada da API do CAPS: Unexpected validation error'
}

exports.PROCESS_VALID_RETURN = () => {
	return MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN()
}

exports.PROCESS_INTERNALERROR_RETURN = () => {
	return MOCKS.FACTORY_RESPONSE.ERROR_WITH_MESSAGE_RETURN()
}

exports.PROCESS_BADREQUEST_RETURN = () => {
	return MOCKS.FACTORY_RESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
}

exports.PROCESS_GENERIC_EXCEPTION_MESSAGE_BEGINNING = (errorMessage) => {
	return `Erro no processamento da chamada da API do CAPS: ${errorMessage}`
}

const MOCKS = require('../../index.mock')

const VALID_PARSEDJSON_INPUT_VALUE = {
	serviceDateTime: '2024-08-05T00:00:00.000Z',
	city: 'Santa Luzia',
	stateCode: 'MG',
	latitude: -16.3655573,
	longitude: -46.8938834,
	specialtyCode: '44',
	originCode: '9',
	problemCode: '0',
}

exports.EXCEPTION_SIMULATE_VALID_PARSEDJSON_INPUT = () => {
	return {
		serviceDateTime: '2024-08-05T00:00:00.000Z',
		city: 'Except',
		stateCode: 'MG',
		latitude: -16.3655573,
		longitude: -46.8938834,
		specialtyCode: '44',
		originCode: '9',
		problemCode: '0',
	}
}

exports.EXCEPTION_SIMULATE_MESSAGE = () => {
	return `Erro recebido da chamada da API: código '500' dados: '{ "message": "Simulação de falha" }'`
}

exports.VALID_PARSEDJSON_INPUT = () => {
	return VALID_PARSEDJSON_INPUT_VALUE
}

exports.INVALID_PARSEDJSON_INPUT = () => {
	const INVALID_PARSEDJSON_INPUT_VALUE = {
		...VALID_PARSEDJSON_INPUT_VALUE,
	}
	delete INVALID_PARSEDJSON_INPUT_VALUE.city
	return INVALID_PARSEDJSON_INPUT_VALUE
}

exports.INVALID_JSON_INPUT_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento: Validation'
}

exports.UNEXPECTED_INPUT_VALIDATION_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento: Unexpected validation error'
}

exports.VALID_RETURN = () => {
	return MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN()
}

exports.INTERNALERROR_RETURN = () => {
	return MOCKS.FACTORY_RESPONSE.ERROR_WITH_MESSAGE_RETURN()
}

exports.BADREQUEST_RETURN = () => {
	return MOCKS.FACTORY_RESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
}

exports.GENERIC_EXCEPTION_MESSAGE_BEGINNING = (errorMessage) => {
	return `Erro no processamento: ${errorMessage}`
}

exports.POSTSERVICEAPPOINTMENT_VALID_RETURN = () => ({
	obterListaSugestoesOut: {
		regulacoessaps: [
			{
				day: '2024-08-05',
				month: '08',
				weekday: 'Monday',
			},
		],
	},
})

exports.POSTSERVICEAPPOINTMENT_EMPTY_DATES_RETURN = () => ({
	obterListaSugestoesOut: {
		regulacoessaps: [],
	},
})

exports.NO_CONTENT_RETURN_CONTROLLER = () => ({
	statusCode: 204,
	body: {
		message: 'Nenhuma data retornada',
	},
})

exports.API_GATEWAY_TOKEN = () => {
	return {
		impersonalUserToken: 'token',
		ca: 'ca',
	}
}

exports.FAKE_TOKEN = '123456'

exports.VALID_INPUT_DATA = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		codigoCampanha: '86',
	}
}

exports.VALID_API_PAYLOAD = {
	cpf: '00000017400',
}

exports.RESPONSE_SUCCESS_API = () => {
	return CONTROLLER_SUCCESS_RETURN_BODY_VALUE
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
			message:
				'Não foi possível processar a requisição, por favor revise os dados',
		},
	}
}

exports.CONTROLLER_RESPONSE_SUCCESS = () => {
	return CONTROLLER_SUCCESS_RETURN_BODY_VALUE
}

exports.CONTROLLER_SUCCESS_RESPONSE = () => {
	return {
		statusCode: 200,
		body: CONTROLLER_SUCCESS_RETURN_BODY_VALUE,
	}
}

const CONTROLLER_SUCCESS_RETURN_BODY_VALUE = [
	{
		riskScore: 0,
		accountNumber: 10406,
		accountCreationDate: 20201007,
		aditionalCard: 'N',
		cardNumber: '412177XXXXXX2112',
		accountScore: 0,
		dueDate: 0,
		expirationDateCrypt: 'SkGJ2wo/88PaqsC6bY10bw==',
		expirationDate: 202310,
		cvvNumberCrypt: 'NH6ICXHYW7jmToibkHVrwQ==',
		cycleDate: 26,
		cardStatus: 'M',
		accountStatus1: '',
		product: 1,
		accountStatus2: '',
		behaviourScore: 0,
		goodCard: 'S',
		cardNumberCrypt: 'bI7jQXtI7yRTJzSVKm7L2+SbdNAik92b0VHiuGqLu5M=',
	},
]

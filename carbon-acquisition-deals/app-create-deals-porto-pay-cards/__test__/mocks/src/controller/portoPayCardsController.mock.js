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
	cpfOrCnpj: '00000017400',
	documentType: 'CPF',
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
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546eea',
		numeroCartao: '415274XXXXXX9119',
		bandeira: 'VISA',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'AMEX',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'ELO',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'DINNERS',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'MASTERCARD',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'VISA',
		cartaoPorto: true,
		cartaoOculto: false,
	},
]

exports.VALID_SAVE_DATA = () => {
	return {
		scope: 'porto-pay-cards',
		document: '00000017400',
		data: JSON.stringify(VALID_CARDS),
	}
}

const VALID_CARDS = [
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546eea',
		numeroCartao: '415274XXXXXX9119',
		bandeira: 'VISA',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'ELO',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'MASTERCARD',
		cartaoPorto: true,
		cartaoOculto: false,
	},
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546123',
		numeroCartao: '415274XXXXXX4567',
		bandeira: 'VISA',
		cartaoPorto: true,
		cartaoOculto: false,
	},
]

exports.FACTORY_DATA_FORMAT_MOCKS = require('./factory/dataFormatFactory.mock')
exports.CONTROLLER_FIND_DEALS_MOCKS = require('./controller/findDealsController.mock')

exports.SENSEDIA_CARBON_CLOUD_TOKEN = () => {
	return 'token'
}

exports.API_ELEGIBILIDADE_SEARCH_VALID_RETURN = () => {
	return { elegivel: true }
}

exports.VALID_INPUT_DATA = () => {
	return '00000017400'
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

exports.CONTROLLER_REQUEST_INVALID = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message:
				'Não foi possível processar a requisição, por favor revise os dados',
		},
	}
}

const CONTROLLER_SUCCESS_RETURN_BODY_VALUE = {
	statusCode: 200,
	body: {
		cpf: '33207922880',
		createdAt: '2024-03-05 12:00:00',
		eligibility: {
			status: '200',
			mesage: 'success',
			data: {
				codigoOferta: '2973d34a-95f3-41c8-8798-4891202ee160',
				codigoCanal: 83,
				tipoDocumento: 'CPF',
				documento: '54000346083',
				situacao: 'Incluída',
				dataHoraInclusao: '2024-03-05T12:52:24.734Z',
				dataHoraValidadeOferta: '2024-03-05T13:52:18.176Z',
				elegibilidade: {
					codigoElegibilidade: 'b5d47652-e1a1-475d-9e6c-e9edc9cdc109',
					produtos: [
						{
							codigoProduto: 1,
							nomeProduto: 'Cartao',
							propensao: 0,
							valor: null,
							valorDesconto: 0,
						},
						{
							codigoProduto: 8,
							nomeProduto: 'Tag ConnectCar',
							propensao: 0,
							valor: null,
							valorDesconto: 0,
						},
					],
				},
				valorTransacao: 0,
				codigoCampanha: '86',
			},
		},
		creditCards: {
			status: '404',
			mesage: 'Data not found',
			data: {
				cards: [
					{
						idCartao: '53e5de5f-b234-368f-ac77-fb4aa65acac2',
						numeroCartao: '415275XXXXXX4111',
						bandeira: 'VISA',
						cartaoPorto: true,
						cartaoOculto: false,
					},
					{
						idCartao: '686f7694-abeb-336d-a814-d324a1154bcf',
						numeroCartao: '536380XXXXXX1114',
						bandeira: 'MASTERCARD',
						cartaoPorto: true,
						cartaoOculto: false,
					},
				],
			},
		},
		tagPortoBank: {
			status: '200',
			mesage: 'success',
			data: {
				vehicle: [
					{
						plate: 'PXA-1A73',
						status: 'ACTIVATED',
					},
					{
						plate: 'BNN-6565',
						status: 'REQUESTED',
					},
					{
						plate: 'YYU-3456',
						status: 'NOT_ACTIVATED',
					},
				],
			},
		},
		goodcard: {
			status: '404',
			mesage: 'Data not found',
			data: {
				cards: [
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
				],
			},
		},
	},
}

exports.CONTROLLER_RESPONSE_SUCCESS = () => {
	return CONTROLLER_SUCCESS_RETURN_BODY_VALUE
}

exports.CONTROLLER_REQUEST_SUCCESS_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: CONTROLLER_SUCCESS_RETURN_BODY_VALUE,
	}
}

exports.HANDLER_VALID_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify(CONTROLLER_SUCCESS_RETURN_BODY_VALUE.body),
	}
}

exports.HANDLER_VALID_REQUEST_INPUT_DATA = () => {
	return {
		pathParameters: { cpf: '00000017400' },
	}
}

exports.HANDLER_INVALID_REQUEST_INPUT_DATA = () => {
	return {}
}

exports.HANDLER_FAIL_RETURN_WITH_INVALID_INPUT = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 400,
		body: JSON.stringify({
			status: 'error',
			message:
				'Não foi possível processar a requisição, por favor revise os dados',
		}),
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

exports.API_VALID_INPUT_DATA = '31033230006'

exports.API_VALID_RETURN = () => {
	return { elegivel: true }
}

exports.URL_PATH = 'URL_PATH'

exports.CONTROLLER_SUCCESS_RESPONSE = () => {
	return {
		statusCode: 200,
		body: CONTROLLER_SUCCESS_RETURN_BODY_VALUE,
	}
}

const MOCKS = require('../../index.mock')

const PROCESS_VALID_PARSEDJSON_INPUT_VALUE = {
	pet: {
		name: 'Rex',
		type: 'dog',
	},
	address: {
		cep: '01310100',
		street: 'Avenida Paulista',
		number: '982',
		complement: 'Apto 30',
		city: 'São Paulo',
		state: 'São Paulo',
		stateCode: 'SP',
		neighborhood: 'Jardim Bela Vista',
	},
	plan: {
		id: 347,
		price: 100,
		price_porto_card: 100,
		name: 'Plano completo',
		coverage: [
			{
				title: 'Consultas em horário normal',
			},
			{
				title: 'Consultas em horário de plantão',
			},
			{
				title: 'Vacinas obrigatórias',
			},
		],
	},
	user: {
		fullName: 'João Silva',
		cpf: '33207922880',
		phone: '19981458065',
		email: 'joao.silva@example.com',
		acceptTerms: true,
		mktCommunication: true,
	},
	cartCommerceId: '',
	customerCommerceToken: '',
	marketingOptInFlag: true,
	sessionId: '202493010587755556506-6T4XUGKR',
	userAgent:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0',
	ipAddress: '192.168.1.1',
	susepCode: 'CM056J',
	affiliateId: '9c60e40a-85d3-44fc-b71a-730c844a9f1f',
	linkOrigin: 'OTHERS',
	brokerName: 'Corretor da Silva',
	brokerPhone: '11923932393',
	brokerEmail: 'diamante@aguiacorretagem.com.br',
	idGoogle: 'id-google',
	utm_content: 'utm-content',
	utm_campaign: 'utm-campaign',
	utm_source: 'utm-source',
	utm_medium: 'utm-medium',
	utm_term: 'utm-term'
}

exports.PROCESS_INVALID_PARSEDJSON_INPUT = () => {
	const PROCESS_INVALID_PARSEDJSON_INPUT_VALUE = {
		...PROCESS_VALID_PARSEDJSON_INPUT_VALUE,
	}
	delete PROCESS_INVALID_PARSEDJSON_INPUT_VALUE.pet
	return PROCESS_INVALID_PARSEDJSON_INPUT_VALUE
}

exports.PROCESS_EXCEPTION_SIMULATE_VALID_PARSEDJSON_INPUT = () => {
	const payload = PROCESS_VALID_PARSEDJSON_INPUT_VALUE
	payload.pet = 'Except'
	return payload
}

exports.PROCESS_EXCEPTION_SIMULATE_MESSAGE = () => {
	return `Erro recebido da chamada da API: código '500' dados: '{ "message": "Simulação de falha" }'`
}

exports.PROCESS_VALID_PARSEDJSON_INPUT = () => {
	return PROCESS_VALID_PARSEDJSON_INPUT_VALUE
}

exports.PROCESS_VALID_PARSEDJSON_WITH_COMBO_INPUT = () => {
	return PROCESS_VALID_PARSEDJSON_INPUT_WITH_COMBO_VALUE
}

exports.PROCESS_INVALID_JSON_INPUT_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento: Validation'
}

exports.PROCESS_UNEXPECTED_INPUT_VALIDATION_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento: Unexpected validation error'
}

exports.PROCESS_VALID_RETURN = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.CONTROLLER_SUCCESS_RETURN()
}

exports.PROCESS_INTERNALERROR_RETURN = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN()
}

exports.PROCESS_BADREQUEST_RETURN = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
}

exports.PROCESS_GENERIC_EXCEPTION_MESSAGE_BEGINNING = (errorMessage) => {
	return `Erro no processamento: ${errorMessage}`
}

exports.TOKEN_PETLOVE = () => {
	return 'token'
}

exports.CERTIFICADOS_PORTO = () => {
	return 'certificados'
}

exports.PETLOVE_COUPON = () => {
	return 'PARTNER10'
}

exports.PETLOVE_EMPTY_COUPON = () => {
	return ''
}

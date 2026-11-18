exports.ACTIVITY_VALIDATION = require('./src/controller/activity/validationActivity.mock')
exports.ACTIVITY_SEND_SQS = require('./src/controller/activity/sendSqsActivity.mock')
exports.SERVICE_SQS = require('./src/service/sqs/messageService.mock')
exports.LEAD_CONTROLLER = require('./src/controller/leadController.mock')
exports.RESPONSE_FACTORY = require('./src/factory/responseFactory.mock')

const VALID_INPUT_DATA_VALUE = {
	scope: 'auto',
	client: {
		cpf: '33994753813',
		name: 'Maria Santos',
		socialName: 'José Santos',
		cellPhone: '11222225555',
		email: 'email@dominio.com',
		residentialPhone: '11222223333',
	},
	address: {
		zipCode: '13013161',
		street: 'Avenida Andrade Neves',
		number: '1000',
		complement: '',
		neighborhood: 'Centro',
		city: 'Campinas',
		state: 'SP',
	},
	idBranch: '27',
	idProduct: '111',
	origin: '35',
	reference: 'hub',
	susepCode: 'string susep_origem_LP',
	pmcInfo: 'string - pmc_observacoes',
	idGoogle: '1529945973.1680023402',
	marketingOptInFlag: true,
	productDetails: {
		vehicleBrand: 'string',
		vehicleModel: 'string',
		yearModel: 'string',
	},
	yearManufacture: 'string',
	brandNewCar: 'se o veículo é zero km',
	vehicleCode: 'string',
	plate: 'string',
	chassis: 'string',
}

exports.VALID_INPUT_DATA = () => {
	return VALID_INPUT_DATA_VALUE
}

exports.INVALID_INPUT_DATA_NULL_CPF = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		client: {
			...VALID_INPUT_DATA_VALUE.client,
			cpf: null,
		},
	}
}

exports.INVALID_INPUT_DATA_NULL_NAME = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		client: {
			...VALID_INPUT_DATA_VALUE.client,
			name: null,
		},
	}
}

exports.VALID_INPUT_DATA_WITHOUT_SOCIAL_NAME = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		client: {
			...VALID_INPUT_DATA_VALUE.client,
			socialName: '',
		},
	}
}

exports.DYNAMICS_PAYLOAD = () => {
	return {
		cpf: '33994753813',
		origem: '35',
		nome: 'Maria Santos',
		email: 'daniel@portoseguro.com',
		ddd_celular: '11',
		tel_celular: '959777801',
		cep: '33202806',
		logradouro: 'string',
		numero: 'string',
		complemento: 'string',
		bairro: 'string',
		cidade: 'string',
		uf: 'string',
		referencia: 'hub',
		id_ramo: 163,
		susep_origem_LP: 'codsusep',
		codigo_vdo: 'String(Date.now())',
		pmc_observacoes: 'string',
		id_google: '1529945973.1680023402',
		utm_source: 'google',
		utm_medium: 'cpl',
		utm_content:
			'vs_bike_seguro-bike_hq_gro_bike-branding_google-ads_bike-branding_key_bike-branding_search_22ugr80321he',
		lgpd: {
			data_aceite: '2023-07-06 14:36:26',
			aceite: 'true',
			pescod: '',
			compartilhamento: 'true',
			consentimento: 'true',
			marketing: true,
			channel: 'portal do cliente',
			domain: ' ',
			environmentType: 'Site',
			managementArea: 'portocom',
			nameArea: 'portal cliente',
			vertical: 'Institucional',
		},
		detalhes_produto: {
			marca_veiculo: 'string',
			modelo_veiculo: 'string',
			ano_modelo: 'string',
		},
		ano_fabricacao: 'string',
		zero_km: 'string',
		cod_veiculo: 'string',
		placa: 'string',
		chassi: 'string',
	}
}

exports.DYNAMICS_LEAD_RESPONSE = () => {
	return {
		codigoSusep: '',
		oportunidadeId: '',
		vdoCode: '',
	}
}

exports.VALID_DYNAMICS_LEAD_PAYLOAD_LGPD_DATA_ACEITE = () => {
	return '2023-10-11T17:03:59.016Z'
}

const LEAD_PAYLOAD_RESPONSE_VALUE = {
	cpf: '33994753813',
	origem: '35',
	nome: 'Maria Santos',
	nome_social: 'José Santos',
	email: 'email@dominio.com',
	ddd_celular: '11',
	tel_celular: '222225555',
	ddd_residencial: '11',
	tel_residencial: '222223333',
	cep: '13013161',
	logradouro: 'Avenida Andrade Neves',
	numero: '1000',
	complemento: '',
	bairro: 'Centro',
	cidade: 'Campinas',
	uf: 'SP',
	referencia: 'hub',
	id_ramo: '27',
	susep_origem_LP: 'string susep_origem_LP',
	codigo_vdo: undefined,
	pmc_observacoes: 'string - pmc_observacoes',
	id_google: '1529945973.1680023402',
	id_produto: '111',
	id_tipo_produto: undefined,
	lgpd: {
		data_aceite: '2023-10-11T17:03:59.016Z',
		aceite: 'true',
		pescod: undefined,
		compartilhamento: 'true',
		consentimento: 'true',
		marketing: true,
		channel: 'portal do cliente',
		domain: 'http://portoseguro.com.br',
		environmentType: 'Site',
		managementArea: 'portocom',
		nameArea: 'portal cliente',
		vertical: 'Institucional',
	},
	detalhes_produto: {
		marca_veiculo: 'string',
		modelo_veiculo: 'string',
		ano_modelo: 'string',
	},
	ano_fabricacao: 'string',
	zero_km: 'se o veículo é zero km',
	cod_veiculo: 'string',
	placa: 'string',
	chassi: 'string',
	codigo_operacao_celular: undefined,
}

exports.LEAD_PAYLOAD_RESPONSE = () => {
	return LEAD_PAYLOAD_RESPONSE_VALUE
}

exports.LEAD_PAYLOAD_WITHOUT_SOCIAL_NAME_RESPONSE = () => {
	return {
		...LEAD_PAYLOAD_RESPONSE_VALUE,
		nome_social: '',
	}
}

exports.LEAD_PAYLOAD_WITH_LEGACYUTMS = () => {
	return {
		...LEAD_PAYLOAD_RESPONSE_VALUE,
		utm_source: 'google',
		utm_medium: 'cpl',
		utm_content: 'vs_bike_seguro-bike_hq',
	}
}

exports.LEAD_PAYLOAD_WITH_UTMS = () => {
	return {
		...LEAD_PAYLOAD_RESPONSE_VALUE,
		utm_source: 'google',
		utm_medium: 'cpl',
		utm_content: 'vs_bike_seguro-bike_hq',
		utm_campaign: 'bike-seguro-2024-nov',
	}
}

exports.LEAD_PAYLOAD_RESPONSE_WITHOUT_RESIDENTIALPHONE = () => {
	return {
		...this.LEAD_PAYLOAD_RESPONSE(),
		tel_residencial: undefined,
		ddd_residencial: undefined,
	}
}

exports.LEAD_PAYLOAD_RESPONSE_WITH_INVALID_CEP = () => {
	return {
		...this.LEAD_PAYLOAD_RESPONSE(),
		cep: undefined,
	}
}

exports.LEAD_FACTORY_RESPONSE_WITHOUT_ADDRESS = () => {
	return {
		cpf: '33994753813',
		origem: '35',
		nome: 'Maria Santos',
		nome_social: 'José Santos',
		email: 'email@dominio.com',
		ddd_celular: '11',
		tel_celular: '222225555',
		ddd_residencial: '11',
		tel_residencial: '222223333',
		cep: undefined,
		logradouro: undefined,
		numero: undefined,
		complemento: undefined,
		bairro: undefined,
		cidade: undefined,
		uf: undefined,
		referencia: 'hub',
		id_ramo: '27',
		susep_origem_LP: 'string susep_origem_LP',
		codigo_vdo: undefined,
		pmc_observacoes: 'string - pmc_observacoes',
		id_google: '1529945973.1680023402',
		id_produto: '111',
		lgpd: {
			data_aceite: '2023-10-11T17:03:59.016Z',
			aceite: 'true',
			pescod: undefined,
			compartilhamento: 'true',
			consentimento: 'true',
			marketing: true,
			channel: 'portal do cliente',
			domain: 'http://portoseguro.com.br',
			environmentType: 'Site',
			managementArea: 'portocom',
			nameArea: 'portal cliente',
			vertical: 'Institucional',
		},
		detalhes_produto: {
			marca_veiculo: 'string',
			modelo_veiculo: 'string',
			ano_modelo: 'string',
		},
		ano_fabricacao: 'string',
		zero_km: 'se o veículo é zero km',
		cod_veiculo: 'string',
		placa: 'string',
		chassi: 'string',
	}
}

exports.VALID_DYNAMICS_RESPONSE = () => {
	return {
		codigoSusep: 'CO12345J',
		corretorNome: 'Clodoaldo Dias',
		corretorEmail: 'teste@teste.com.br',
		corretorTelefone: '552992290616',
		oportunidadeId: '1b6403d8',
		codigoAtendimentoVDO: '17066',
	}
}

exports.VALID_INPUT_DATA_WITH_LEGACYUTMS = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		utmSource: 'google',
		utmMedium: 'cpl',
		utmContent: 'vs_bike_seguro-bike_hq',
	}
}

exports.VALID_INPUT_DATA_WITH_UTMS = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		utm_source: 'google',
		utm_medium: 'cpl',
		utm_content: 'vs_bike_seguro-bike_hq',
		utm_campaign: 'bike-seguro-2024-nov',
	}
}

exports.SUCCESS_RESPONSE = (message) => {
	return {
		body: { message: message },
		statusCode: 200,
	}
}

exports.BAD_RESPONSE = (message) => {
	return {
		body: { error: message },
		statusCode: 400,
	}
}

exports.ERROR_RESPONSE = (message) => {
	return {
		body: { error: message },
		statusCode: 500,
	}
}
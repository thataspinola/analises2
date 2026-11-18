const CONSTANT = require('../../../app-create-lead/src/property/index')
exports.PROPERTY_CREATELEADSCHEMA = require('./src/property/createLeadSchema.mock')
exports.SERVICE_SNS_REGISTERUPDATE = require('./src/service/sns/registerUpdateSnsService.mock')
exports.FACTORY_SNS_REGISTERUPDATE = require('./src/factory/service/sns/registerUpdateFactory.mock')
exports.CONTROLLER_CREATELEAD = require('./src/controller/createLeadController.mock')
exports.API_GOVERNANCADADOS_DADOSPESSOA_V1_PESSOA_DOCUMENTOIDENTIFICACAOENDPOINT = require('./src/api/governancaDados/dadosPessoaApi/v1/pessoa/documentoIdentificacaoEndpoint.mock')
exports.MULESOFT_IMPERSONAL_TOKEN_HUB = () => {
	return 'token'
}

const VALID_INPUT_DATA_WITHOUT_OPTIONALS_VALUE = {
	scope: 'auto',
	client: {
		cpf: '33994753813',
		name: 'Maria Santos',
		cellPhone: '11222225555',
		email: 'email@dominio.com',
	},
	address: {
		zipCode: '13013161',
	},
	idBranch: '27',
	idProduct: '111',
	origin: '36',
	reference: 'hub',
}

const VALID_INPUT_DATA_VALUE = {
	...VALID_INPUT_DATA_WITHOUT_OPTIONALS_VALUE,
	client: {
		...VALID_INPUT_DATA_WITHOUT_OPTIONALS_VALUE.client,
		socialName: 'José Santos', //opcional
	},
	address: {
		...VALID_INPUT_DATA_WITHOUT_OPTIONALS_VALUE.address,
		street: 'Avenida Andrade Neves', //opcional
		number: '1000', //opcional
		complement: '', //opcional
		neighborhood: 'Centro', //opcional
		city: 'Campinas', //opcional
		state: 'SP', //opcional
	},
	susepCode: 'string susep_origem_LP', //opcional
	pmcInfo: 'string - pmc_observacoes',
	idGoogle: '1529945973.1680023402', //opcional
	marketingOptInFlag: true, //opcional
	productDetails: {
		//opcional
		vehicleBrand: 'string', //opcional
		vehicleModel: 'string', //opcional
		yearModel: 'string', //opcional
	},
	yearManufacture: 'string', //opcional
	brandNewCar: 'se o veículo é zero km', //opcional
	vehicleCode: 'string', //opcional
	plate: 'string', //opcional
	chassis: 'string', //opcional
	idProductType: '7', //opcional
	idLink: '08a42c61-d122-477c-b820-c2102e47eafb', //opcional
	linkOrigin: 'WHATSAPP', //opcional
	skipConsentWhenUpdateExistingBcc: false, //opcional
}

const VALID_INPUT_DATA_WITH_PESCOD_VALUE = {
	...VALID_INPUT_DATA_VALUE,
	pescod: '1234',
}

exports.RESPONSE_REGISTER_COMPLETE = () => {
	return {
		codigoPessoa: 123345,
	}
}

exports.VALID_INPUT_DATA = () => {
	return VALID_INPUT_DATA_VALUE
}

exports.VALID_INPUT_DATA_WITH_PESCOD = () => {
	return VALID_INPUT_DATA_WITH_PESCOD_VALUE
}

exports.VALID_INPUT_DATA_WITHOUT_OPTIONALS = () => {
	return ALID_INPUT_DATA_WITHOUT_OPTIONALS_VALUE
}

exports.VALID_INPUT_DATA_WITHOUT_SOCIAL_NAME = () => {
	const returnValue = JSON.parse(JSON.stringify(VALID_INPUT_DATA_VALUE))
	delete returnValue.client.socialName
	return returnValue
}

exports.CONTROLLER_SUCCESS_RESPONSE = () => {
	return {
		susepCode: 'xxx123',
		idLead: 'hash oportunidade id',
		vdoCode: 'zzz123',
	}
}

exports.DYNAMICS_PAYLOAD = () => {
	return {
		cpf: '33994753813',
		origem: '36',
		nome: 'Maria Santos',
		email: 'daniel@portoseguro.com',
		ddd_celular: '11',
		tel_celular: '959777801',
		cep: '33202806', //opcional
		logradouro: 'string', //opcional
		numero: 'string', //opcional
		complemento: 'string', //opcional
		bairro: 'string', //opcional
		cidade: 'string', //opcional
		uf: 'string', //opcional
		referencia: 'hub', //vai vir do commerce
		id_ramo: 163, //27 e Cel é 143
		susep_origem_LP: 'codsusep',
		codigo_vdo: 'String(Date.now())', //obrigatorio - precisa receber do commerce
		pmc_observacoes: 'string', //vai ver do commerce
		id_google: '1529945973.1680023402', //opcional
		utm_source: 'google', //opcional
		utm_medium: 'cpl', //opcional
		utm_content:
			'vs_bike_seguro-bike_hq_gro_bike-branding_google-ads_bike-branding_key_bike-branding_search_22ugr80321he', //opcional
		lgpd: {
			data_aceite: '2023-07-06 14:36:26', //data atual
			aceite: 'true',
			pescod: '', //só se for assincrono o cadastro-completo
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
		chassi: 'string', //somente na atualização do lead
	}
}

exports.DYNAMICS_CREATE_LEAD_RESPONSE = () => {
	return {
		codigoSusep: '',
		oportunidadeId: '',
		codigoAtendimentoVDO: '123456',
		idBranch: '27',
	}
}

exports.VALID_DYNAMICS_CREATE_LEAD_PAYLOAD_LGPD_DATA_ACEITE = () => {
	return '2023-10-11T17:03:59.016Z'
}

const CREATE_LEAD_PAYLOAD_RESPONSE_VALUE = {
	cpf: '33994753813',
	origem: '36',
	nome: 'Maria Santos',
	nome_social: 'José Santos',
	email: 'email@dominio.com',
	ddd_celular: '11',
	tel_celular: '222225555',
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
	id_tipo_produto: '7',
	id_link: '08a42c61-d122-477c-b820-c2102e47eafb',
	origem_link: 'WHATSAPP',
}

exports.CREATE_LEAD_PAYLOAD_RESPONSE = () => {
	return CREATE_LEAD_PAYLOAD_RESPONSE_VALUE
}

exports.CREATE_LEAD_PAYLOAD_RESPONSE_WITH_TOTAL_CREDITO_FINANCING_LOANS_ATTRIBUTE =
	() => {
		return {
			...CREATE_LEAD_PAYLOAD_RESPONSE_VALUE,
			cnsc_valor_total_credito_desejado: 10000,
		}
	}

exports.CREATE_LEAD_PAYLOAD_RESPONSE_WITH_VALOR_PARCELA_FINANCING_LOANS_ATTRIBUTE =
	() => {
		return {
			...CREATE_LEAD_PAYLOAD_RESPONSE_VALUE,
			cnsc_valor_parcela: 500,
		}
	}

exports.CREATE_LEAD_PAYLOAD_RESPONSE_WITH_NUMERO_PROPOSTA_FINANCING_LOANS_ATTRIBUTE =
	() => {
		return {
			...CREATE_LEAD_PAYLOAD_RESPONSE_VALUE,
			numero_proposta: '001080009967',
		}
	}

exports.CREATE_LEAD_PAYLOAD_RESPONSE_WITH_ALL_FINANCING_LOANS_ATTRIBUTES =
	() => {
		return {
			...CREATE_LEAD_PAYLOAD_RESPONSE_VALUE,
			cnsc_valor_total_credito_desejado: 10000,
			cnsc_valor_parcela: 500,
			numero_proposta: '001080009967',
		}
	}

exports.CREATE_LEAD_FACTORY_RESPONSE_WITHOUT_ADDRESS = () => {
	return {
		...CREATE_LEAD_PAYLOAD_RESPONSE_VALUE,
		cep: undefined,
		logradouro: undefined,
		numero: undefined,
		complemento: undefined,
		bairro: undefined,
		cidade: undefined,
		uf: undefined,
	}
}

const REGISTER_COMPLETE_PAYLOAD_RESPONSE_VALUE = {
	codigoPessoa: null,
	codigoPessoaBcp: null,
	codigoSusepCongenere: null,
	dataFalecimentoPessoaFisica: null,
	dataNascimento: null,
	cpf: '33994753813',
	email: 'email@dominio.com',
	localidadeNascimento: null,
	nome: 'Maria Santos',
	nomeSocial: 'José Santos',
	paisDomicilio: 'Brasil',
	papeisPessoa: null,
	sexo: null,
	telefone: '11222225555',
	tipoPessoa: '1',
	tipoSituacaoPessoa: '1',
	marketingOptInFlag: true,
	enderecoRua: 'Avenida Andrade Neves',
	enderecoNumero: '1000',
	enderecoBairro: 'Centro',
	enderecoComplemento: '',
	enderecoCodigoPostal: '13013161',
	enderecoCidade: 'Campinas',
	enderecoEstado: 'SP',
	sessionId: undefined,
	ipAddress: undefined,
	userAgent: undefined,
	product: '27',
	productName: null,
}

exports.REGISTER_COMPLETE_PAYLOAD_RESPONSE = () => {
	return REGISTER_COMPLETE_PAYLOAD_RESPONSE_VALUE
}

exports.REGISTER_COMPLETE_PAYLOAD_RESPONSE_WITHOUT_SOCIAL_NAME = () => {
	const returnValue = JSON.parse(
		JSON.stringify(REGISTER_COMPLETE_PAYLOAD_RESPONSE_VALUE)
	)
	returnValue.nomeSocial = ''
	return returnValue
}

exports.REGISTER_COMPLETE_PAYLOAD_RESPONSE_WITHOUT_ADDRESS = () => {
	const returnValue = JSON.parse(
		JSON.stringify(REGISTER_COMPLETE_PAYLOAD_RESPONSE_VALUE)
	)
	delete returnValue.enderecoRua
	delete returnValue.enderecoNumero
	delete returnValue.enderecoBairro
	delete returnValue.enderecoComplemento
	delete returnValue.enderecoCodigoPostal
	delete returnValue.enderecoCidade
	delete returnValue.enderecoEstado
	return returnValue
}

exports.PUTCOMMAND_VALID_RETURN = () => {
	return {
		ConsumedCapacity: {
			CapacityUnits: 1,
			TableName: CONSTANT.DYNAMODB_LEAD_IN_PROGRESS_TABLE_NAME,
		},
	}
}

exports.VALID_PUT_ITEM = () => {
	return {
		vdoCode: '123456',
		idProductType: '7',
		idBranch: '27',
	}
}

exports.LEAD_PAYLOAD_WITH_LEGACYUTMS = () => {
	return {
		...CREATE_LEAD_PAYLOAD_RESPONSE_VALUE,
		utm_source: 'google',
		utm_medium: 'cpl',
		utm_content: 'vs_bike_seguro-bike_hq',
	}
}

exports.LEAD_PAYLOAD_WITH_UTMS = () => {
	return {
		...CREATE_LEAD_PAYLOAD_RESPONSE_VALUE,
		utm_source: 'google',
		utm_medium: 'cpl',
		utm_content: 'vs_bike_seguro-bike_hq',
		utm_campaign: 'bike-seguro-2024-nov',
	}
}

exports.LEAD_PAYLOAD_WITH_TELRESIDENCIAL = () => {
	return {
		...CREATE_LEAD_PAYLOAD_RESPONSE_VALUE,
		tel_residencial: '4563778908',
		ddd_residencial: '11',
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

exports.VALID_INPUT_DATA_WITH_TELRESIDENCIAL = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		client: {
			...VALID_INPUT_DATA_VALUE.client,
			residentialPhone: '114563778908',
		},
	}
}

exports.VALID_INPUT_DATA_WITHOUT_SOCIALNAME = () => {
	const returnValue = JSON.parse(JSON.stringify(VALID_INPUT_DATA_VALUE))
	delete returnValue.client.socialName
	return returnValue
}
exports.VALID_INPUT_DATA_WITHOUT_REFERENCE = () => {
	const returnValue = JSON.parse(JSON.stringify(VALID_INPUT_DATA_VALUE))
	delete returnValue.reference
	return returnValue
}

exports.VALID_INPUT_DATA_WITH_ALL_FINANCING_LOANS_ATTRIBUTES = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		financingLoansRequestedLoanAmountValue: 10000,
		financingLoansInstallmentValue: 500,
		financingLoansProposalRequestNumber: '001080009967',
	}
}

exports.VALID_INPUT_DATA_WITH_FINANCING_LOANS_REQUESTED_LOAN_AMOUNT_VALUE =
	() => {
		return {
			...VALID_INPUT_DATA_VALUE,
			financingLoansRequestedLoanAmountValue: 10000,
		}
	}

exports.VALID_INPUT_DATA_WITH_FINANCING_LOANS_INSTALLMENT_VALUE = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		financingLoansInstallmentValue: 500,
	}
}

exports.VALID_INPUT_DATA_WITH_FINANCING_LOANS_PROPOSAL_NUMBER = () => {
	return {
		...VALID_INPUT_DATA_VALUE,
		financingLoansProposalRequestNumber: '001080009967',
	}
}

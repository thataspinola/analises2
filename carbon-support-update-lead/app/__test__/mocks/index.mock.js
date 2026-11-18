exports.SERVICE_VALIDATION = require('./src/service/validationService.mock')

exports.LAMBDA_TOKEN_RESPONSE = () => {
	return {
		Payload:
			'{"CA_CADASTRO":"token", "SENSEDIA_LOGIN": "token", "SENSEDIA_CLOUD_LOGIN": "token"}',
	}
}

const INVALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD = {
	id_ramo: 27,
}

const ID_RAMO_TRAVEL_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD = {
	id_ramo: "611",
	codigo_vdo: 7788994555,
	numero_pedido: '752183',
	logradouro: "Rua Professor Filadelfo Azevedo",
	numero: "12321",
	bairro: "Vila Nova Conceição",
	cidade: "São Paulo",
	complemento: "Complemento do endereço",
	uf: "SP",
	sexo: null,
	pmc_observacoes: "Observações"
}

const VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT = {
	nome: 'Atualizacao Lead 073',
	nomeSocial: '',
	email: 'lead@lead.com',
	cpf: null,
	codigo_vdo: 7788994555,
	item_pedido: null,
	ddd_celular: null,
	tel_celular: 18988111223,
	ddd_residencial: 11,
	tel_residencial: 20923533,
	ddd_comercial: null,
	tel_comercial: null,
	cep: 1325001,
	referencia: 'google_R3830',
	origem: null,
	id_ramo: 27,
	id_produto: null,
	id_tipo_produto: null,
	id_google: 832581125.1593179,
	id_cliente_siebel: '1-T0BMUN9',
	horario_ligacao: 'qualquer horário',
	browse_name: null,
	lead_gender: 1,
	lead_geo_country: null,
	placa: null,
	dados_pagamento: {
		forma_pagamento: null,
		bandeira: null,
		parcelas: null,
		valor_parcelas: null,
		valor_a_vista: null,
		iof: null,
		validade_cotacao: null,
		preco_a_vista_outros: null,
		preco_parcela_outros: null,
	},
	detalhes_produto: {
		marca_veiculo: 'Renault',
		ano_modelo: 2016,
		modelo_veiculo: 'NOVO LOGAN EXP 1',
	},
	pmc_observacoes: '',
	status: '',
	razao_status: '',
}

const VALID_PUT_INPUT_REQUEST_DATA = {
	nome: 'Atualizacao Lead 073',
	nomeSocial: '',
	email: 'lead@lead.com',
	cpf: '01234567890',
	codigo_vdo: 7788994555,
	item_pedido: null,
	ddd_celular: 11,
	tel_celular: 18988111223,
	ddd_residencial: 11,
	tel_residencial: 20923533,
	ddd_comercial: 11,
	tel_comercial: 18988111223,
	cep: '1325001',
	referencia: 'google_R3830',
	origem: '35',
	id_ramo: 27,
	id_produto: 19,
	id_tipo_produto: 27,
	id_google: 832581125.1593179,
	id_cliente_siebel: '1-T0BMUN9',
	horario_ligacao: 'qualquer horário',
	browse_name: '',
	lead_gender: 1,
	lead_geo_country: '',
	placa: '',
	dados_pagamento: {
		forma_pagamento: 'string',
		bandeira: 'string',
		parcelas: 'string',
		valor_parcelas: 'string',
		valor_a_vista: 'string',
		iof: 'string',
		validade_cotacao: 'string',
		preco_a_vista_outros: 'string',
		preco_parcela_outros: 'string',
	},
	detalhes_produto: {
		marca_veiculo: 'Renault',
		ano_modelo: '2016',
		modelo_veiculo: 'NOVO LOGAN EXP 1',
	},
	pmc_observacoes: '',
	status: '',
	razao_status: '',
}

exports.VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT = () => {
	return VALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT
}

exports.ID_RAMO_TRAVEL_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD = () => {
	return ID_RAMO_TRAVEL_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD
}

exports.VALID_PUT_INPUT_REQUEST_DATA = () => {
	return VALID_PUT_INPUT_REQUEST_DATA
}

exports.INVALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD = () => {
	return INVALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD
}

const INVALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT = {
	codigo_vdo: 7788994555,
}

exports.INVALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT = () => {
	return INVALID_PUT_INPUT_REQUEST_DATA_UPDATE_LEAD_CONTENT
}

exports.CONTEXT = () => {
	return {}
}

const VALID_PUT_LEAD_XML = {
	LeadXml:
		'<lead><nome>Atualizacao Lead 073</nome><nomeSocial/><email>lead@lead.com</email><cpf/><codigo_vdo>7788994555</codigo_vdo><item_pedido/><ddd_celular/><tel_celular>18988111223</tel_celular><ddd_residencial>11</ddd_residencial><tel_residencial>20923533</tel_residencial><ddd_comercial/><tel_comercial/><cep>1325001</cep><referencia>google_R3830</referencia><origem/><id_ramo>27</id_ramo><id_produto/><id_tipo_produto/><id_google>832581125.1593179</id_google><id_cliente_siebel>1-T0BMUN9</id_cliente_siebel><horario_ligacao>qualquer horário</horario_ligacao><browse_name/><lead_gender>1</lead_gender><lead_geo_country/><placa/><dados_pagamento><forma_pagamento/><bandeira/><parcelas/><valor_parcelas/><valor_a_vista/><iof/><validade_cotacao/><preco_a_vista_outros/><preco_parcela_outros/></dados_pagamento><detalhes_produto><marca_veiculo>Renault</marca_veiculo><ano_modelo>2016</ano_modelo><modelo_veiculo>NOVO LOGAN EXP 1</modelo_veiculo></detalhes_produto><pmc_observacoes/><status/><razao_status/></lead>',
}

exports.VALID_PUT_LEAD_XML = () => {
	return VALID_PUT_LEAD_XML
}

const SUCESS_PUT_RESPONSE_BODY_CONTENT = {
	url: null,
	lead: {
		cpf: null,
		id: '00000000-0000-0000-0000-000000000000',
		tipoCliente: null,
		referencia: null,
		corretor_online: null,
		vinculo_porto: null,
		origem: null,
		fluxo_online: null,
		url_protocol: null,
		vinculo_mc: null,
		nome_produto: null,
		id_produto: null,
		corretor_id: null,
		corretor_email: null,
		corretor_telefone: null,
		corretor_nome: null,
		corretor_susep: null,
		codAtdMultiCanal: null,
		cnsc_id_indicacao: null,
	},
	system: {
		success: true,
		status: 200,
		description: 'Atualização do Lead realizada com sucesso. ',
		stackTrace: null,
	},
}

exports.SUCESS_PUT_RESPONSE_BODY = () => {
	return SUCESS_PUT_RESPONSE_BODY_CONTENT
}

exports.SUCCESS_POST_RESPONSE = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: SUCESS_PUT_RESPONSE_BODY,
	}
}

exports.DYNAMICS_OPORTUNIDADE_UPDATE_SUCCESS = () => {
	return {
		statusCode: 200,
		statusMessage: 'Atualização do Lead realizada com sucesso. ',
	}
}

const UPDATE_LEAD_CONTROLLER_PROCESS_BAD_REQUEST_ERROR_WITH_MESSAGE_BODY_MESSAGE_CONTENT =
	{
		statusCode: 412,
		statusMessage: "Parâmetro 'LeadXml' não encontrado. ",
	}

exports.UPDATE_LEAD_CONTROLLER_PROCESS_BAD_REQUEST_ERROR_WITH_MESSAGE_BODY_MESSAGE =
	() => {
		return UPDATE_LEAD_CONTROLLER_PROCESS_BAD_REQUEST_ERROR_WITH_MESSAGE_BODY_MESSAGE_CONTENT
	}

class DynamicsLayerError extends Error {
	constructor() {
		super('Error Dynamics Layer')
		this.name = 'DynamicsLayerError'
	}
}

exports.DynamicsLayerError = DynamicsLayerError

exports.CONTROLLER_REQUEST_INTERNAL_ERROR = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: 'Erro interno',
		},
	}
}

const MISSING_ALL = {}

const MISSING_ID_OPORTUNIDADE_AND_ID_RAMO = {
	codigo_vdo: 7788994555,
}

const MISSING_ID_OPORTUNIDADE_AND_CODIGO_VDO = {
	id_ramo: 27,
}

const ONLY_ID_OPORTUNIDADE = {
	id_oportunidade: 'some_id',
}

const CODIGO_VDO_AND_ID_RAMO = {
	codigo_vdo: 7788994555,
	id_ramo: 27,
}

exports.MISSING_ALL = () => {
	return MISSING_ALL
}

exports.MISSING_ID_OPORTUNIDADE_AND_ID_RAMO = () => {
	return MISSING_ID_OPORTUNIDADE_AND_ID_RAMO
}

exports.MISSING_ID_OPORTUNIDADE_AND_CODIGO_VDO = () => {
	return MISSING_ID_OPORTUNIDADE_AND_CODIGO_VDO
}

exports.ONLY_ID_OPORTUNIDADE = () => {
	return ONLY_ID_OPORTUNIDADE
}

exports.CODIGO_VDO_AND_ID_RAMO = () => {
	return CODIGO_VDO_AND_ID_RAMO
}

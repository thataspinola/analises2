exports.NODE_ENV = process.env.NODE_ENV || 'local'

exports.GATEWAY_URL =
	process.env.GATEWAY_URL || 'https://apis-hml.portoseguro.brasil'

exports.CONSENTS_API_PATH = process.env.CONSENTS_API_PATH || 'privacidade/consentimentos/v1/customer'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV)

/**
 * Função que retorna o endereço de importação da biblioteca de tokens
 * @param {String} NODE_ENV Variável de identificação do ambiente
 * @returns {String} Endereço de importação da biblioteca de tokens
 */
function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

exports.NUMERIC_EXTRACTOR = /[^0-9]/g

exports.CONSENTS_SCHEMA = require('./consentCaptureSchema')

exports.MESSAGES = {
	INDEX: {
		START: "Start lambdaHandler",
		INVALID_BODY: 'Input must be a string',
		CONVERTING_BODY: "Converting body",
		PROCESSING_CONSENTS: "Processing consents controller"
	},
	CONSENT_CONTROLLER: {
		VALIDATION: "Validando os dados recebidos",
		GETTING_TOKEN: "Obtendo o token Sensedia",
		GETTING_CERTIFICATE: "Obtendo o certificado do Sensedia",
		GETTING_API: "Chamando a API do Sensedia",
		CURRENT_ACTIVITY: "Erro identificado durante a atividade"
	},
	COTATION_API: {
		CONFIGING: 'Criando config gateway api de aceitacao recidencia',
		REQUESTING: 'Chamando api de aceitacao recidencia',
	}
}

exports.STATS_CODE = {
	OK: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500
}

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`
exports.GET_TOKEN_ERROR_DEFAULT_MESSAGE = 'Erro ao obter o token do gateway.'

exports.STATUS_CONSENTS = {
	OPT_IN: 'ACCEPTED',
	OPT_OUT: 'DENIED',
	NOT_FOUND: 'TAXVAT_NOT_FOUND'
}
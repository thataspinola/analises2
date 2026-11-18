const NODE_ENV = process.env.NODE_ENV || 'local'
exports.CURRENT_ENVIRONMENT = NODE_ENV
exports.NODE_ENV = NODE_ENV

exports.MAX_TIME_PROCESS_QUOTATION =
	process.env.MAX_TIME_PROCESS_QUOTATION || 20

exports.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS =
	process.env.WAITING_TIME_TO_GET_QUOTATION_IN_MILLISECONDS || '4000'


exports.SENSEDIA_CORP_MIDDLEWARE_TOKEN_KEY =
	process.env.SENSEDIA_CORP_MIDDLEWARE_TOKEN_KEY ||
	'INTERNAL_PORTOSEG_CONTA'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV.trim())

exports.SENSEDIA_URL_CONSORCIO_EXTERNO = process.env.SENSEDIA_URL_CONSORCIO_EXTERNO ||
	'https://api-gw.portobank-crossdomain.hml.portoseguro.com.br'

exports.SENSEDIA_URL_CONSORCIO_INTERNO = process.env.SENSEDIA_URL_CONSORCIO_INTERNO ||
	'https://api-gw.portobank-crossdomain.hml.awsporto'

exports.SENSEDIA_CORP_URL =
	process.env.SENSEDIA_CORP_URL ||
	'https://portoapicloud-hml.portoseguro.brasil'

exports.APF_PORTOBANK_COTA_CONSORCIO_ENDPOINT_PATH =
	process.env.APF_PORTOBANK_COTA_CONSORCIO_ENDPOINT_PATH ||
	'data-porto-bank/cota-consorcio-ia/v1/cotas'
	


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

exports.QUOTATION_SCHEMA = require('./quotationSchema')

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de Consórcio.`

exports.MAXIMUM_TIME_EXCEEDED_ERROR_MESSAGE = `Tempo máximo excedido ao tentar obter a cotação`

exports.GET_TOKEN_ERROR_DEFAULT_MESSAGE = 'Erro ao obter o token do gateway.'
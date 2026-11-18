require('dotenv').config()

exports.NODE_ENV = process.env.NODE_ENV || 'local'

exports.GATEWAY_URL =
	process.env.GATEWAY_URL || 'https://portoapi-hml.portoseguro.brasil'

exports.OFERTAS_API_PATH = process.env.OFERTAS_API_PATH || 'vida/viagem-on/v1/ofertas'

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

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`

exports.OFERTA_API_TIMEOUT_MS = Number(process.env.OFERTA_API_TIMEOUT_MS) || 27000
exports.LAMBDA_RESPONSE_RESERVE_MS =
	Number(process.env.LAMBDA_RESPONSE_RESERVE_MS) || 2000
exports.MIN_API_TIMEOUT_MS = 1000

exports.SCHEMA = require('./travelQuotationSchema')

exports.COUPON_API_URL =
	process.env.COUPON_API_URL ||
	'https://qo3cmbems1-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com'
exports.COUPON_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de Cupom.`
exports.COUPON_API_ERROR_INVALID_COUPON = `invalid coupon`
exports.COUPON_API_ERROR_CODE_DEFAULT = `hub-coupon`
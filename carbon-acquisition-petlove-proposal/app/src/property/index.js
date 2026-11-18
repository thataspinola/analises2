exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API =
	process.env.HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API ||
	'https://l05ywdxjzc-vpce-01439860599832be9.execute-api.ca-central-1.amazonaws.com/v1/create-lead'

exports.HUB_VENDAS_CARBON_ACQUISITION_CART_CHECKOUT_API =
	process.env.HUB_VENDAS_CARBON_ACQUISITION_CART_CHECKOUT_API ||
	'https://ml6rf47bic-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com/v1/'

exports.COMMERCE_URL =
	process.env.COMMERCE_URL || 'https://ecom-stage.portoseguro.com.br'

exports.API_PATH_COTACAO =
	process.env.API_PATH_COTACAO || 'rest/V1/porto/quotation'

exports.API_PATH_PROPOSAL =
	process.env.API_PATH_PROPOSAL || 'rest/V1/porto/proposal'

exports.CREATE_LEAD_DATA = {
	origin: '35',
	reference: 'hub',
	channel: 'portal do cliente',
	domain: 'http://portoseguro.com.br',
	environmentType: 'Site',
	managementArea: 'portocom',
	nameArea: 'portal cliente',
	vertical: 'Institucional',
	idBranch: '87',
	idProduct: '23',
	idGoogle: '',
}

const SERVICE_PROPOSAL_SCHEMA = require('./proposalServicesSchema')

exports.SERVICE_PROPOSAL_SCHEMA = SERVICE_PROPOSAL_SCHEMA.SCHEMA

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API.`

/* istanbul ignore next */
const NODE_ENV = process.env.NODE_ENV || 'local'
exports.NODE_ENV = NODE_ENV
exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV.trim())

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

exports.SCOPE = 'petlove'

exports.PETLOVE_URL =
	process.env.PETLOVE_URL || 'https://health-api-staging.petlove.com.br'
exports.BUSINESS_PARTNER_COUPON_PATH = 'api/v2/business-partner/coupon'
exports.BUSINESS_PARTNER_CHECKOUT_SIMULATE_PATH =
	'api/v2/business-partner/subscription/checkout/simulate'
exports.PETLOVE_COUPON = process.env.PETLOVE_COUPON || ''
exports.PETLOVE_PORTO_CARD_BIN = process.env.PETLOVE_PORTO_CARD_BIN || '4444444'

exports.URL_CART_REDIRECT =
	process.env.URL_CART_REDIRECT ||
	'https://stage.portoseguro.com.br/loja/carrinho'

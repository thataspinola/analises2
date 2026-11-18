exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.HUB_VENDAS_CARBON_SERVICES_ORDER_BOOKING_API =
	process.env.HUB_VENDAS_CARBON_SERVICES_ORDER_BOOKING_API ||
	'https://lf880wrx98-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com/v1/'

exports.HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API =
	process.env.HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API ||
	'https://ml6rf47bic-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com/v1/'

exports.HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API =
	process.env.HUB_VENDAS_CARBON_SUPPORT_CREATE_LEAD_API ||
	'https://ezznkamnok-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com/v1/create-lead'

exports.HUB_VENDAS_CARBON_SERVICES_PRICING_API =
	process.env.HUB_VENDAS_CARBON_SERVICES_PRICING_API ||
	'https://v5s8502ynd-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com/v1/'

exports.COMMERCE_URL =
	process.env.COMMERCE_URL || 'https://ecom-stage.portoseguro.com.br'

exports.API_PATH_COTACAO =
	process.env.API_PATH_COTACAO || 'rest/V1/porto/quotation'

exports.API_PATH_PROPOSAL =
	process.env.API_PATH_PROPOSAL || 'rest/V1/porto/proposal'

exports.URL_CART_REDIRECT =
	process.env.URL_CART_REDIRECT ||
	'https://stage.portoseguro.com.br/loja/carrinho'

exports.EXPIRATION_URL_REDIRECT =
	process.env.EXPIRATION_URL_REDIRECT || '/servicos'

exports.COMPANY_CODE = process.env.FISCAL_COMPANY_CODE || '95'

exports.SOURCE_SYSTEM_CODE = '36'

exports.STREET_TYPE = 'Rua'

exports.CREATE_LEAD_DATA = {
	origin: '35',
	reference: 'hub',
	channel: 'portal do cliente',
	domain: 'http://portoseguro.com.br',
	environmentType: 'Site',
	managementArea: 'portocom',
	nameArea: 'portal cliente',
	vertical: 'Institucional',
	idBranch: '65',
	pmcInfo: '',
	idGoogle: '',
}

const SERVICE_PROPOSAL_SCHEMA = require('./proposalServicesSchema')

exports.SERVICE_PROPOSAL_SCHEMA = SERVICE_PROPOSAL_SCHEMA.SCHEMA

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`

/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'local'

exports.NODE_ENV = NODE_ENV_VALUE

exports.TOKEN_COMMERCE = getCommercetokenName(NODE_ENV_VALUE)
/* istanbul ignore next */
function getCommercetokenName(nodeEnv) {
	return nodeEnv === 'production'
		? 'COMMERCE_PRD_CARBON'
		: 'COMMERCE_STAGE_CARBON'
}

exports.MONTH_NAMES = [
	'Janeiro',
	'Fevereiro',
	'Março',
	'Abril',
	'Maio',
	'Junho',
	'Julho',
	'Agosto',
	'Setembro',
	'Outubro',
	'Novembro',
	'Dezembro',
]

exports.WEEKDAY_NAMES = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado',
]

exports.SERVICE_APPOINTMENT_API =
	process.env.SERVICE_APPOINTMENT_API || 'https://osbhmlwfm.portoseguro.brasil'

exports.SERVICE_APPOINTMENT_API_PATH =
	'AgendaAtendimentoSocorristaIntegrationService/AgendaAtendimentoSocorristaIntegrationServiceRestV1_0/RegularAgendaRegularAgenda'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

exports.RECOMMENDATION_COUPON = 'PROMOHUB'

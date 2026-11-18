require('dotenv').config()

const DEFAULT_NODE_ENV = 'local'
const DEFAULT_COMMERCE_URL = 'https://ecom-stage.portoseguro.com.br'

const NODE_ENV = process.env.NODE_ENV || DEFAULT_NODE_ENV
const COMMERCE_URL = process.env.COMMERCE_URL || DEFAULT_COMMERCE_URL
const MULESOFT_URL =
	process.env.MULESOFT_URL || 'https://apis-hml.portoseguro.brasil'

const SCOPE = {
	PD: 'portable_device',
	CEL: 'phone',
}

const DEFAULT_PRODUCTS_INFOS = {
	[SCOPE.CEL]: {
		name: 'Celular',
		coastCenter: '10012026',
		definition_keys: {
			SUCCESS: 'Trans_email_CelApoliceEmitida',
			ERROR: 'Trans_email_CelPedidoNaoIdentif',
			PENDING: 'Trans_email_CelPedidoRecebido',
			WITHOUT_INSPECTION: 'Trans_email_CelSemVistoria',
		},
		campaign: {
			SUCCESS: 'FluxoProposta-PedidoEmitido',
			ERROR: 'FluxoProposta-PedidoNaoIdentificado',
			PENDING: 'FluxoProposta-PedidoRecebido',
		},
	},
	[SCOPE.PD]: {
		name: 'Equipamentos Portáteis',
		coastCenter: '10012026',
		definition_keys: {
			SUCCESS: 'Trans_email_EpPedidoIdentificado',
			ERROR: 'Trans_email_EpPedidoNaoIdentif',
		},
		campaign: {
			SUCCESS: 'FluxoProposta-PedidoIdentificado',
			ERROR: 'FluxoProposta-PedidoNaoIdentif',
		},
	},
}

const PRODUCTS_INFO = process.env.PRODUCTS_INFO || DEFAULT_PRODUCTS_INFOS

function getTokenLibraryLocation(nodeEnv) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/'
	const DEV_ENVIRONMENTS = ['local', 'test']
	return DEV_ENVIRONMENTS.includes(nodeEnv) ? NEXUS_LOCATION : LAYER_LOCATION
}

function getPaymentLibraryLocation(nodeEnv) {
	const NEXUS_LOCATION =
		'@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer'
	const LAYER_LOCATION = '/opt/nodejs/carbon-postponed-payment-data/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	return DEV_ENVIRONMENTS.includes(nodeEnv) ? NEXUS_LOCATION : LAYER_LOCATION
}

function commerceSearchCriteriaPath(orderNumber) {
	return `rest/V1/orders?searchCriteria[filter_groups][0][filters][0][field]=increment_id&searchCriteria[filter_groups][0][filters][0][value]=${orderNumber}`
}

function getCommercetokenName(nodeEnv) {
	return nodeEnv === 'production'
		? 'COMMERCE_PRD_CARBON'
		: 'COMMERCE_STAGE_CARBON'
}

module.exports = {
	MULESOFT_URL,
	NODE_ENV,
	COMMERCE_URL,
	PRODUCTS_INFO,
	SCOPE,
	SQS_DELAY_MESSAGE: 5,
	AWS_REGION: 'ca-central-1',
	PARTNER_HEADER_VALUE: 'HUB-VENDAS-CARBON',
	COMMERCE_TOKEN_NAME: getCommercetokenName(NODE_ENV.trim()),
	COMMERCE_SEARCH_CRITERIA: commerceSearchCriteriaPath,
	TOKEN_LIBRARY_LOCATION: getTokenLibraryLocation(NODE_ENV.trim()),
	PAYMENT_DATA_LIBRARY_LOCATION: getPaymentLibraryLocation(NODE_ENV.trim()),
	SALESFORCE_EMAIL_SENDER_QUEUE:
		process.env.SALESFORCE_EMAIL_SENDER_QUEUE ||
		'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-salesforce-email-sender',
	API_PESCOD_MULESOFT_PATH: 'governancadados/dados-pessoa/v1/pessoa/cpf',
	NOTIFICATION_EMAIL_PAYLOAD_SCHEMA: require('./notificationEmailPayloadSchema'),
}

require('dotenv').config()
/* istanbul ignore next */
exports.NODE_ENV = process.env.NODE_ENV || 'local'
/* istanbul ignore next */
exports.MULE_URL = process.env.MULE_URL || 'https://apis-hml.portoseguro.brasil'

exports.API_PROPOSTA_CELULAR_URL = 're/celular/v1/proposta'
exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(this.NODE_ENV.trim())
exports.PAYMENT_DATA_LIBRARY_LOCATION = getPaymentLibraryLocation(
	this.NODE_ENV.trim()
)
exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.LOGGER = 'lambda_inpection_notification_cellphone_logger'
exports.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL =
	process.env.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-service-connector-google-analytics-collect'

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

function getPaymentLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION =
		'@porto-seguro/hub-vendas.carbon-postponed-payment-data-layer'
	const LAYER_LOCATION = '/opt/nodejs/carbon-postponed-payment-data/'
	const DEV_ENVIRONMENTS = ['local', 'test']

	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	return LAYER_LOCATION
}

exports.PARTNER_CODE = 71
exports.QUEUE_MESSAGE_SCHEMA = {
	type: 'object',
	properties: {
		orderNumber: { type: 'string' },
		externalId: { type: 'string' },
		scope: { type: 'string' },
		contactEmail: { type: 'string', format: 'email' },
		charges: { type: 'array' },
		integrationData: { type: 'object' },
	},
	required: [
		'orderNumber',
		'externalId',
		'scope',
		'contactEmail',
		'charges',
		'integrationData',
	],
}
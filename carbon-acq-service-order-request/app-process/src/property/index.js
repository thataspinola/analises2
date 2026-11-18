const { join } = require('path')

/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'local'

const SQS_MESSAGE_SCHEMA_SOURCE = require('./processSqsMessageSchema')

exports.SQS_MESSAGE_SCHEMA = SQS_MESSAGE_SCHEMA_SOURCE.SCHEMA

exports.NODE_ENV = NODE_ENV_VALUE

exports.AWS_REGION = 'ca-central-1'

exports.SERVICEORDER_SNS_TOPIC_ARN =
	process.env.SERVICEORDER_SNS_TOPIC_ARN ||
	'arn:aws:sns:ca-central-1:791702935403:carbon-acq-service-order-requested'

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)

exports.COMMON_LIBRARY_LOCATION = getCommonLibraryLocation(NODE_ENV_VALUE)

exports.SERVICEORDER_LIBRARY_LOCATION =
	getServiceOrderLibraryLocation(NODE_ENV_VALUE)

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`

exports.API_PATH =
	process.env.API_PATH ||
	'hub-vendas-carbon/prestacao-servico/v1/ordem-servico/criar'

exports.SENSEDIA_URL =
	process.env.SENSEDIA_URL || 'https://portoapi-hml.portoseguro.com.br'

exports.SENSEDIA_CLOUD_URL =
	process.env.SENSEDIA_CLOUD_URL ||
	'https://portoapicloud-hml.portoseguro.com.br'

exports.API_PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.GOOGLE_APPOINTMENTS_CONVERSION_QUEUE_URL =
	process.env.GOOGLE_APPOINTMENTS_CONVERSION_QUEUE_URL

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

function getServiceOrderLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION =
		'@porto-seguro/hub-vendas.carbon-acq-service-order-layer'
	const LAYER_LOCATION = '/opt/nodejs/carbon-acq-service-order-layer/index'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

function getCommonLibraryLocation(NODE_ENV) {
	const LOCAL_LOCATION = join(
		__dirname,
		'../../../app-common/nodejs/carbon-acq-service-order-request-common'
	)
	const LAYER_LOCATION = '/opt/nodejs/carbon-acq-service-order-request-common'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return LOCAL_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

exports.BIKE_VEHICLE_MODEL_CODE_DEFAULT = '3429'
exports.BIKE_VEHICLE_LICENSE_CODE_DEFAULT = 'PORT000'

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
exports.BIKE_MODELYEAR_DEFAULT = currentYear

exports.BIKE_COLOR_CODE_DEFAULT = '11'

exports.SERVICE_ORDER_PRIORITY_LEVEL = 2
exports.SERVICE_ORDER_HOME_SERVICE_FLAG = 'N'
exports.SERVICE_ORDER_PRIVATE_SERVICE_FLAG = 'S'
exports.SERVICE_ORDER_PROVIDER_ON_SITE_FLAG = 'N'
exports.SERVICE_ORDER_OPENING_REASON = 1
exports.SERVICE_ORDER_PAYMENT_METHOD_CODE = 6
exports.SERVICE_ORDER_ORIGIN_SYSTEM_CODE = 36
exports.SERVICE_ORDER_PRODUCT_BRAND_CODE = 2
exports.SERVICE_ORDER_PRODUCT_BRAND_CODE_LINK_BROKER = 109
exports.SERVICE_ORDER_MILEAGE_LIMIT = 0

exports.SERVICE_ADDRESS_TYPE = 1
exports.SERVICE_ADDRESS_TYPE_DESTINATION = 2
exports.SERVICE_ADDRESS_STANDARDIZATION_CODE_CT24H = 3

exports.CALL_DETAILS_REGISTRATION_NUMBER = '99980'
exports.CALL_DETAILS_REQUESTER_TYPE_CODE = 3
exports.CALL_DETAILS_USER_TYPE = 'F'
exports.CALL_DETAILS_COMPANY_CODE = 9
exports.CALL_DETAILS_COMPANY_GROUP_CODE = process.env.FISCAL_COMPANY_CODE || 95
exports.CALL_DETAILS_AGREEMENT_TYPE = 0
exports.CALL_DETAILS_FISCAL_COMPANY_CODE = process.env.FISCAL_COMPANY_CODE || 95
exports.CALL_DETAILS_CGC_ORDER = 0

exports.BICYCLE_SERVICES_SKUS = ['BK001', 'BK002', 'BK006']

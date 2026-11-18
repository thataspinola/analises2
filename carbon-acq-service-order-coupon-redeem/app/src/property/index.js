require('dotenv').config()
/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'local'

const PROCESS_SNS_SQS_MESSAGE_SCHEMA_SOURCE = require('./processSnsSqsMessageSchema')

exports.PROCESS_SNS_SQS_MESSAGE_SCHEMA =
	PROCESS_SNS_SQS_MESSAGE_SCHEMA_SOURCE.SCHEMA

exports.NODE_ENV = NODE_ENV_VALUE

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE)

exports.SERVICE_ORDER_LIBRARY_LOCATION =
	getServiceOrderLibraryLocation(NODE_ENV_VALUE)

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`

exports.SENSEDIA_CLOUD_URL =
	process.env.SENSEDIA_CLOUD_URL ||
	'https://portoapicloud-hml.portoseguro.com.br'

exports.PORTOASSISTENCIA_B2C_CUPOM_CONSUMO_API_ENDPOINT_PATH =
	process.env.PORTOASSISTENCIA_B2C_CUPOM_CONSUMO_API_ENDPOINT_PATH ||
	'porto-assistencia/b2c/v1/cupom/consumo'

exports.API_PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test(']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

function getServiceOrderLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION =
		'@porto-seguro/hub-vendas.carbon-acq-service-order-layer'
	const LAYER_LOCATION = '/opt/nodejs/carbon-acq-service-order-layer/'
	const DEV_ENVIRONMENTS = ['local', 'test(']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

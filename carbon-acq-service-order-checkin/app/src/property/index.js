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

exports.TOKEN_PORTOASSISTENCIA_MULESOFT = '9266a3e3-727c-4000-8330-83e8ae59b617'

exports.CLIENTID_PORTOASSISTENCIA_MULESOFT =
	'7a7899a6-ed20-4000-8ED7-7c407ab045ad'

exports.TENANT_ID_PORTOASSISTENCIA_MULESOFT = process.env.TENANT_ID_PORTOASSISTENCIA_MULESOFT

exports.MULESOFT_URL =
	process.env.MULESOFT_URL || 'https://apis-hml.portoseguro.com.br'

exports.PORTOASSISTENCIA_ENDPOINT_PATH =
	process.env.PORTOASSISTENCIA_ENDPOINT_PATH ||
	'assistencia/webhook/v1/oschassi'

exports.SENSEDIA_CLOUD_URL =
	process.env.SENSEDIA_CLOUD_URL ||
	'https://portoapicloud-hml.portoseguro.com.br'

exports.API_PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

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
	const LAYER_LOCATION = '/opt/nodejs/carbon-acq-service-order-layer/'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

const { join } = require('path')

/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'local'

exports.NODE_ENV = NODE_ENV_VALUE

exports.COMMON_LIBRARY_LOCATION = getCommonLibraryLocation(NODE_ENV_VALUE)

exports.SERVICE_ORDER_LIBRARY_LOCATION =
	getServiceOrderLibraryLocation(NODE_ENV_VALUE)

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`

exports.SERVICE_ORDER_TABLE_NAME = 'carbon-acq-service-order-failed-request'

exports.SENDGRID_API_URL =
	process.env.SENDGRID_API_URL || ' https://api.sendgrid.com'

exports.SENDGRID_API_ENDPOINT_PATH =
	process.env.SENDGRID_API_ENDPOINT_PATH || 'v3/mail/send'

exports.PORTOSERVICO_SENDGRID_AUTH_TOKEN =
	process.env.PORTOSERVICO_SENDGRID_AUTH_TOKEN || ''

exports.CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_ENDPOINT_PATH =
	process.env.CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_ENDPOINT_PATH || 'v1'

exports.CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_URL =
	process.env.CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_URL ||
	'https://6kc1hqsdg1-vpce-0b153819c7c85b104.execute-api.ca-central-1.amazonaws.com'

exports.PORTOSERVICO_SERVICEORDER_MAIL_SENDER =
	process.env.PORTOSERVICO_SERVICEORDER_MAIL_SENDER ||
	'comunicacao.portoservico@portoseguro.com.br'
exports.PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME =
	process.env.PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME || 'Porto Serviço'
exports.PORTOSERVICO_SERVICEORDER_MAIL_FAILED_SUBJECT =
	process.env.PORTOSERVICO_SERVICEORDER_MAIL_FAILED_SUBJECT ||
	'Orçamento de serviços'
exports.PORTOSERVICO_SERVICEORDER_MAIL_FAILED_TEMPLATEID =
	process.env.PORTOSERVICO_SERVICEORDER_MAIL_FAILED_TEMPLATEID ||
	'b57cad3d-63eb-4f8c-b7cd-85da7c492c35'
exports.EMAIL_MASK_REGEX =
	/(?<=.)[^@\n](?=[^@\n]*?[^@\n]@)|(?:(?<=@.)|(?!^)\G(?=[^@\n]*$)).(?=.*[^@\n]\.)/gm

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

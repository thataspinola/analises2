/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'local'

const PROCESS_SNS_SQS_MESSAGE_SCHEMA_SOURCE = require('./processSnsSqsMessageSchema')

exports.PROCESS_SNS_SQS_MESSAGE_SCHEMA =
	PROCESS_SNS_SQS_MESSAGE_SCHEMA_SOURCE.SCHEMA

exports.NODE_ENV = NODE_ENV_VALUE

exports.SERVICE_ORDER_LIBRARY_LOCATION =
	getServiceOrderLibraryLocation(NODE_ENV_VALUE)

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API do Produto.`

exports.SENDGRID_API_URL =
	process.env.SENDGRID_API_URL || ' https://api.sendgrid.com'

exports.SENDGRID_API_ENDPOINT_PATH =
	process.env.SENDGRID_API_ENDPOINT_PATH || 'v3/mail/send'

exports.PORTOSERVICO_SENDGRID_AUTH_TOKEN =
	process.env.PORTOSERVICO_SENDGRID_AUTH_TOKEN || ''

exports.PORTOSERVICO_SERVICEORDER_MAIL_SENDER =
	process.env.PORTOSERVICO_SERVICEORDER_MAIL_SENDER ||
	'comunicacao.portoservico@portoseguro.com.br'

exports.PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME =
	process.env.PORTOSERVICO_SERVICEORDER_MAIL_SENDER_NAME || 'Porto Serviço'

exports.PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_SUBJECT =
	process.env.PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_SUBJECT ||
	'Orçamento de serviços'

exports.PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_TEMPLATEID =
	process.env.PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_TEMPLATEID ||
	'7f320faf-dba9-4179-bc0a-f2222acd142d'

exports.PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_TEMPLATEID_PIX =
	process.env.PORTOSERVICO_SERVICEORDER_MAIL_SUCCESS_TEMPLATEID_PIX ||
	'75d4aa6e-7ef4-4d37-819d-ebfb7874998c'

exports.EMAIL_MASK_REGEX =
	/(?<=.)[^@\n](?=[^@\n]*?[^@\n]@)|(?:(?<=@.)|(?!^)\G(?=[^@\n]*$)).(?=.*[^@\n]\.)/gm

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

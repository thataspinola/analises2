/* istanbul ignore next */
exports.NODE_ENV = process.env.NODE_ENV || 'local'
exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.INTERNAL_GTW_EMAIL_NOTIFICATION_URL =
	process.env.INTERNAL_GTW_EMAIL_NOTIFICATION_URL ||
	'https://ktzle3ueha.execute-api.ca-central-1.amazonaws.com'
exports.INSPECTION_PORTABLE_DEVICE_DLQ =
	process.env.INSPECTION_PORTABLE_DEVICE_DLQ ||
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-inspection-request-portable-device-dead-letter'

exports.API_PATH_EMAIL_NOTIFICATION =
	process.env.API_PATH_EMAIL_NOTIFICATION || 'v1/email-notification'

exports.PARTNER_HEADER_VALUE = 'HUB-VENDAS-CARBON'

exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = 'Houve um erro inesperado ao invocar a API.'

exports.INSPECTION_FAIL_SCHEMA = {
	type: 'object',
	properties: {
		orderNumber: { type: 'string', minLength: 1 },
		scope: { const: 'portable_device' },
		externalId: { type: 'string', minLength: 1 },
	},
	required: ['orderNumber', 'scope', 'externalId'],
	additionalProperties: true,
}

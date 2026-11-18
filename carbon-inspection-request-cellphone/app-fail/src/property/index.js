require('dotenv').config()

const DEFAULT_NODE_ENV = 'local'
const DEFAULT_INTERNAL_GTW_EMAIL_NOTIFICATION_URL =
	'https://6g8oyjpph1.execute-api.ca-central-1.amazonaws.com'
const DEFAULT_INSPECTION_CELLPHONE_DLQ =
	'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-inspection-request-cellphone-dead-letter'

const NODE_ENV = process.env.NODE_ENV ?? DEFAULT_NODE_ENV
const INTERNAL_GTW_EMAIL_NOTIFICATION_URL =
	process.env.INTERNAL_GTW_EMAIL_NOTIFICATION_URL ??
	DEFAULT_INTERNAL_GTW_EMAIL_NOTIFICATION_URL

const INSPECTION_CELLPHONE_DLQ =
	process.env.INSPECTION_CELLPHONE_DLQ ?? DEFAULT_INSPECTION_CELLPHONE_DLQ

module.exports = {
	NODE_ENV,
	INSPECTION_CELLPHONE_DLQ,
	AWS_REGION: 'ca-central-1',
	API_PATH: 'v1/email-notification',
	INTERNAL_GTW_EMAIL_NOTIFICATION_URL,
	PARTNER_HEADER_VALUE: 'HUB-VENDAS-CARBON',
	INSPECTION_FAIL_CELLPHONE_SCHEMA: require('./inspectionFailCellphoneSchema'),
}

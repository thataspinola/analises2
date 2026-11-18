const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE

function getTokenLibraryLocation(NODE_ENV) {
	const NEXUS_LOCATION = '@porto-seguro/hub-vendas.carbon-token'
	const LAYER_LOCATION = '/opt/nodejs/carbon-token/index'
	const DEV_ENVIRONMENTS = ['local', 'test']
	/* istanbul ignore next */
	if (DEV_ENVIRONMENTS.includes(NODE_ENV)) return NEXUS_LOCATION
	/* istanbul ignore next */
	return LAYER_LOCATION
}

exports.TOKEN_LIBRARY_LOCATION = getTokenLibraryLocation(NODE_ENV_VALUE.trim())

const INSPECTION_VALUES = {
	REFUSED: 'REFUSED',
	PENDING: 'PENDING',
	OK: 'OK',
	ISSUED: 'ISSUED'
}

exports.INSPECTION = INSPECTION_VALUES

exports.INSPECTION_REQUEST_SCHEMA = {
	type: 'object',
	properties: {
		contactEmail: { type: 'string', format: 'email' },
		idTransaction: { type: 'string' },
		inspectionRequestDate: { type: 'string', format: 'date-time' },
		quotationNumber: { type: 'string' },
	},
	required: [
		'contactEmail',
		'idTransaction',
		'inspectionRequestDate',
		'quotationNumber',
	],
}

const getSensediaUrlAuto = () => {
	if (NODE_ENV_VALUE === 'production') {
		return (
			process.env.SENSEDIACLOUD_URL ||
			'https://portoapicloud.portoseguro.com.br'
		)
	}
	return process.env.SENSEDIA_URL || 'https://portoapi-hml.portoseguro.com.br'
}

exports.SENSEDIA_URL = getSensediaUrlAuto()

exports.AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH =
	process.env.AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH ||
	'automovel/parceiro-marketplace/v1/ofertas/cotacoes'

const AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_SSV_VALUE =
	process.env.AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_SSV ||
	'PROPOSTA PENDENTE - AGUARDANDO PAGAMENTO;SERVICO DE INTEGRACAO INDISPONIVEL;SERVICO DE PARCELAMENTO INDISPONIVEL'

const AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_ARRAY_VALUE =
	AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_SSV_VALUE.trim().split(';')

exports.AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_ARRAY =
	AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_ARRAY_VALUE

exports.EMAIL_MASK_REGEX =
	/(?<=.)[^@\n](?=[^@\n]*?[^@\n]@)|(?:(?<=@.)|(?!^)\G(?=[^@\n]*$)).(?=.*[^@\n]\.)/gm

exports.PAYMENT_REGISTER_ENDPOINT_URL =
	process.env.PAYMENT_REGISTER_ENDPOINT_URL ||
	'https://8u6szid2ki.execute-api.ca-central-1.amazonaws.com/v1/payments-register'

exports.AWS_REGION = process.env.AWS_REGION || 'ca-central-1'

exports.INSPECTION_REQUEST_AUTO_GATHER_SCHEDULE_DB_TABLE_NAME =
	process.env.INSPECTION_REQUEST_AUTO_GATHER_SCHEDULE_DB_TABLE_NAME ||
	'inspection-request-auto-gather-schedule'

exports.INSPECTION_REQUEST_AUTO_DLQ_URL = process.env.INSPECTION_REQUEST_AUTO_DLQ_URL || 'https://sqs.ca-central-1.amazonaws.com/791702935403/carbon-check-inspection-request-auto-dead-letter'

exports.THRESHOLD = {
	UP_TO_FIFTEEN_MINUTES: Number(process.env.UP_TO_FIFTEEN_MINUTES) || 15,
	UP_TO_TWENTY_FOUR_HOURS: Number(process.env.UP_TO_TWENTY_FOUR_HOURS) || 1440,
	MAX_LIMIT: Number(process.env.MAX_LIMIT) || 8640
} 

exports.TTL = {
	UP_TO_FIFTEEN_MINUTES: Number(process.env.UP_TO_FIFTEEN_MINUTES_TTL) || 5,
	UP_TO_TWENTY_FOUR_HOURS: Number(process.env.UP_TO_TWENTY_FOUR_HOURS_TTL) ||  60, // 1 Hora
	MAX_LIMIT: Number(process.env.MAX_LIMIT_TTL) || 360 // 6 Horas
} 

exports.PAYMENT_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API de pagamento`
exports.EXTERNAL_API_ERROR_DEFAULT_MESSAGE = `Houve um erro inesperado ao invocar a API`
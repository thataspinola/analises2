const DEFAULT_NODE_ENV = 'local'
const DEFAULT_CARBON_INTERNAL_GATEWAY_URL =
	'https://aa5ipxhedk.execute-api.ca-central-1.amazonaws.com'

const NODE_ENV = process.env.NODE_ENV || DEFAULT_NODE_ENV
const CARBON_INTERNAL_GATEWAY_URL =
	process.env.CARBON_INTERNAL_GATEWAY_URL || DEFAULT_CARBON_INTERNAL_GATEWAY_URL

const BRANCH_IDS = {
	auto: 27,
	phone: 143,
	lifeinsurance: 303,
}

const PHASE = 6

const PAYMENT_STATUS = '1'

const REASON_STATUS = {
	REJEITADA: '778210129',
	PAGA: '778210124',
}

module.exports = {
	PHASE,
	NODE_ENV,
	BRANCH_IDS,
	REASON_STATUS,
	PAYMENT_STATUS,
	AWS_REGION: 'ca-central-1',
	CARBON_INTERNAL_GATEWAY_URL,
	API_UPDATE_LEAD_PATH: 'v1/update-lead',
	PARTNER_HEADER_VALUE: 'HUB-VENDAS-CARBON',
	UPDATE_LEAD_PAYLOAD_SCHEMA: require('./updateLeadPayloadSchema'),
}

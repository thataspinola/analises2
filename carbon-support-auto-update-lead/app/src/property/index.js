require('dotenv').config()
exports.NODE_ENV = process.env.NODE_ENV || 'local'

exports.UPDATE_LEAD_ENDPOINT_URL =
	process.env.UPDATE_LEAD_ENDPOINT_URL ||
	'https://aa5ipxhedk.execute-api.ca-central-1.amazonaws.com/v1/update-lead'

exports.UPDATE_LEAD_SCHEMA = {
	type: 'object',
	properties: {
		id_ramo: { type: 'number' },
		pmc_observacoes: { type: 'string' },
	},
	required: ['codigo_vdo', 'id_ramo'],
}

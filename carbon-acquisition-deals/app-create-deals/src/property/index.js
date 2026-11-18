require('dotenv').config()
/* istanbul ignore next */
const NODE_ENV_VALUE = process.env.NODE_ENV || 'development'
exports.NODE_ENV = NODE_ENV_VALUE

exports.AWS_REGION = 'ca-central-1'

exports.CREATE_DEALS_SNS =
	process.env.CREATE_DEALS_SNS ||
	'arn:aws:sns:ca-central-1:791702935403:carbon-create-deals'

exports.INPUT_SCHEMA = {
	type: 'object',
	properties: {
		codigoCanal: { type: 'integer', minimum: 1 },
		tipoDocumento: { type: 'string', enum: ['CPF', 'CNPJ'] },
		documento: { type: 'string' },
		codigoCampanha: { type: 'string', nullable: true },
		creditCards: { type: 'boolean' },
		eligibility: { type: 'boolean' },
	},
	required: ['codigoCanal', 'tipoDocumento', 'documento', 'creditCards', 'eligibility'],
	additionalProperties: false,
}

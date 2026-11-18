require('dotenv').config()

exports.NODE_ENV = process.env.NODE_ENV || 'local'
exports.AWS_REGION = 'ca-central-1'

exports.DYNAMODB_TABLE_NAME = 'carbon-acquisition-deals'

exports.SAVE_INPUT_SCHEMA = {
	type: 'object',
	properties: {
		scope: {
			type: 'string',
		},
		document: { type: 'string' },
		data: { type: 'string' },
	},
	required: ['scope', 'document', 'data'],
	additionalProperties: false,
}

exports.GET_INPUT_SCHEMA = {
	type: 'object',
	properties: {
		document: { type: 'string' },
	},
	required: ['document'],
	additionalProperties: false,
}

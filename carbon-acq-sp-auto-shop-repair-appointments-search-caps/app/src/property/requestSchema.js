module.exports = {
	type: 'object',
	properties: {
		capsCodes: {
			type: 'array',
			items: {
				type: 'string',
			},
			minItems: 1,
		},
		serviceCodes: {
			type: 'array',
			items: {
				type: 'string',
			},
			minItems: 1,
		},
		dateAvailability: {
			type: 'string',
			format: 'date',
		},
	},
	required: ['capsCodes', 'serviceCodes', 'dateAvailability'],
	additionalProperties: false,
}

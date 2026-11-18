exports.SCHEMA = {
	type: 'object',
	properties: {
		integrationData: {
			type: 'object',
			properties: {
				serviceOrder: {
					type: 'object',
					properties: {
						coupon: { type: 'string' },
					},
				},
				customer: {
					type: 'object',
					properties: {
						documentNumber: { type: 'string', pattern: '[0-9]+' },
					},
					required: ['documentNumber'],
				},
				serviceOrderNumber: { type: 'string' },
			},
			required: ['serviceOrder', 'customer', 'serviceOrderNumber'],
		},
	},
	required: ['integrationData'],
}

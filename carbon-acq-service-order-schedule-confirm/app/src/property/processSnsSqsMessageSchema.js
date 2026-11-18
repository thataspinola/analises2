exports.SCHEMA = {
	type: 'object',
	properties: {
		integrationData: {
			type: 'object',
			properties: {
				serviceOrder: {
					type: 'object',
					properties: {
						schedule: {
							type: 'object',
							properties: {
								key: { type: 'string' },
							},
							required: ['key'],
						},
					},
					required: ['schedule'],
				},
				serviceOrderNumber: {
					type: 'string',
					pattern: '[0-9]+-[0-9]{2}',
				},
			},
			required: ['serviceOrder', 'serviceOrderNumber'],
		},
	},
	required: ['integrationData'],
}

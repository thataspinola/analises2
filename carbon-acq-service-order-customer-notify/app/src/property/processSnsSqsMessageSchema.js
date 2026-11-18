exports.SCHEMA = {
	type: 'object',
	properties: {
		carbonTraceId: { type: 'string' },
		amount: {
			type: 'number',
			minimum: 0.01,
		},
		integrationData: {
			type: 'object',
			properties: {
				serviceOrderNumber: { type: 'string' },
				serviceOrder: {
					type: 'object',
					properties: {
						schedule: {
							type: 'object',
							discriminator: {
								propertyName: 'type',
							},
							required: ['type'],
							oneOf: [
								{
									type: 'object',
									properties: {
										type: { type: 'string', const: 'agendamento-programado' },
										startDateTime: { type: 'string', format: 'date-time' },
										endDateTime: { type: 'string', format: 'date-time' },
									},
									required: ['type', 'startDateTime', 'endDateTime'],
								},
								{
									type: 'object',
									properties: {
										type: { type: 'string', const: 'agendamento-imediato' },
										startDateTime: { type: 'string', format: 'date-time' },
										estimatedDateTime: { type: 'string', format: 'date-time' },
									},
									required: ['type', 'startDateTime', 'estimatedDateTime'],
								},
							],
						},
					},
					required: ['schedule'],
				},
				customer: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						socialName: { type: 'string' },
						email: { type: 'string', format: 'email' },
					},
					required: ['name', 'email'],
				},
				serviceAddress: {
					type: 'object',
					properties: {
						city: { type: 'string' },
						state: { type: 'string' },
						neighborhood: { type: 'string' },
						street: { type: 'string' },
						streetNumber: { type: 'string' },
					},
					required: ['city', 'state', 'neighborhood', 'street', 'streetNumber'],
				},
			},
			required: [
				'serviceOrderNumber',
				'serviceOrder',
				'customer',
				'serviceAddress',
			],
		},
	},
	required: ['amount', 'integrationData'],
}

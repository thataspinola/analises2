exports.SCHEMA = {
	type: 'object',
	properties: {
		carbonTraceId: { type: 'string' },
		externalId: { type: 'string' },
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
							properties: {
								startDateTime: { type: 'string', format: 'date-time' },
							},
							required: ['startDateTime'],
						},
						serviceId: { type: 'string' },
						sku: { type: 'string' },
						specialtyCode: { type: 'string' },
						subject: { type: 'string' },
					},
					required: [
						'schedule',
						'serviceId',
						'sku',
						'specialtyCode',
						'subject',
					],
				},
				customer: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						socialName: { type: 'string' },
						email: { type: 'string', format: 'email' },
						cellphone: { type: 'string', pattern: '[0-9]{10,}' },
						documentNumber: { type: 'string', pattern: '[0-9]+' },
					},
					required: ['name', 'email', 'cellphone', 'documentNumber'],
				},
				serviceAddress: {
					type: 'object',
					properties: {
						city: { type: 'string' },
						state: { type: 'string' },
						zipCode: { type: 'string', pattern: '[0-9]+' },
						neighborhood: { type: 'string' },
						street: { type: 'string' },
						streetNumber: { type: 'string' },
						additionalInfo: { type: 'string' },
					},
					required: [
						'city',
						'state',
						'zipCode',
						'neighborhood',
						'street',
						'streetNumber',
					],
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
	required: ['externalId', 'amount', 'integrationData'],
}

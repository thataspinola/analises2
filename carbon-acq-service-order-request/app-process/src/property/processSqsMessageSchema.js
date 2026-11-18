const serviceAddressSchema = {
	type: 'object',
	properties: {
		city: { type: 'string' },
		state: { type: 'string' },
		zipCode: { type: 'string', pattern: '^[0-9]{8}$' },
		neighborhood: { type: 'string' },
		street: { type: 'string' },
		streetType: { type: 'string' },
		streetNumber: { type: 'string' },
		latitude: { type: 'number' },
		longitude: { type: 'number' },
		reference: { type: 'string' },
		additionalInfo: { type: 'string' },
	},
	required: [
		'city',
		'state',
		'streetNumber',
		'zipCode',
		'neighborhood',
		'street',
		'latitude',
		'longitude',
	],
}

const vehicleSchema = {
	type: 'object',
	properties: {
		vehicleLicenseCode: { type: 'string' },
		modelCode: { type: 'string' },
		modelYear: { type: 'string' },
		color: { type: 'string' },
	},
	required: ['vehicleLicenseCode', 'modelCode', 'modelYear', 'color'],
}

const questionsSchema = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			question: { type: 'number' },
			answer: { type: 'string' },
		},
		required: ['question', 'answer'],
	},
}

const scheduleSchema = {
	type: 'object',
	oneOf: [
		{
			type: 'object',
			properties: {
				type: { type: 'string', const: 'agendamento-programado' },
				startDateTime: { type: 'string', format: 'date-time' },
				endDateTime: { type: 'string', format: 'date-time' },
				openOsDateTime: { type: 'string', format: 'date-time' },
				key: { type: 'string' },
			},
			required: [
				'type',
				'startDateTime',
				'endDateTime',
				'openOsDateTime',
				'key',
			],
		},
		{
			type: 'object',
			properties: {
				type: { type: 'string', const: 'agendamento-imediato' },
				startDateTime: { type: 'string', format: 'date-time' },
				estimatedDateTime: { type: 'string', format: 'date-time' },
				estimatedServiceTime: { type: 'string', format: 'date-time' },
				openOsDateTime: { type: 'string', format: 'date-time' },
				key: { type: 'string' },
			},
			required: [
				'type',
				'startDateTime',
				'estimatedDateTime',
				'estimatedServiceTime',
				'openOsDateTime',
				'key',
			],
		},
	],
}

exports.SCHEMA = {
	type: 'object',
	properties: {
		carbonTraceId: {
			type: 'string',
		},
		eCommercePlatform: {
			type: 'object',
			properties: {
				orderNumber: { type: 'string' },
				loggedCPF: { type: 'string', pattern: '[0-9]{11}' },
			},
			required: ['orderNumber', 'loggedCPF'],
		},
		externalId: { type: 'string' },
		transactionId: { type: 'string' },
		transactionType: {
			type: 'string',
			enum: ['PIX', 'CREDIT_CARD'],
		},
		itemId: { type: 'string' },
		contactEmail: { type: 'string', format: 'email' },
		installments: {
			type: 'number',
			minimum: 1,
			multipleOf: 1,
		},
		productCode: { type: 'string' },
		amount: {
			type: 'number',
			minimum: 0.01,
		},
		leadIdentifier: { type: 'string' },
		paymentData: {
			type: 'object',
			properties: {
				externo: { type: 'boolean' },
				empresa: { type: 'string' },
				filial: { type: 'string' },
				hash: { type: 'string' },
				proposta: { type: 'string' },
			},
			required: ['externo', 'empresa', 'filial'],
		},
		integrationData: {
			type: 'object',
			properties: {
				serviceOrder: {
					type: 'object',
					properties: {
						schedule: scheduleSchema,
						siebelIntegrationId: { type: 'string' },
						serviceId: { type: 'string' },
						sku: { type: 'string' },
						specialtyCode: { type: 'string' },
						originCode: { type: 'string' },
						companyCode: { type: 'string' },
						sourceSystemCode: { type: 'string' },
						problem: { type: 'string' },
						subject: { type: 'string' },
						coupon: { type: 'string', nullable: true },
						susep: { type: 'string', nullable: true },
						linkBrokerOrigin: { type: 'boolean' },
						vehicle: vehicleSchema,
					},
					required: [
						'schedule',
						'siebelIntegrationId',
						'serviceId',
						'sku',
						'specialtyCode',
						'originCode',
						'companyCode',
						'sourceSystemCode',
						'problem',
						'subject',
					],
				},
				combo: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						items: {
							type: 'array',
							minItems: 1,
							items: {
								type: 'object',
								properties: {
									productId: { type: 'string' },
									quantity: {
										type: 'number',
										minimum: 1,
										multipleOf: 1,
									},
									name: { type: 'string' },
									questionCode: { type: 'string' },
								},
								required: ['productId', 'quantity', 'name'],
							},
						},
					},
					required: ['id', 'items'],
				},
				customer: {
					type: 'object',
					properties: {
						name: { type: 'string' },
						socialName: { type: 'string' },
						email: { type: 'string', format: 'email' },
						cellphone: { type: 'string', pattern: '[0-9]{10,}' },
						documentNumber: { type: 'string', pattern: '^[0-9]{11}$' },
					},
					required: ['name', 'email', 'cellphone', 'documentNumber'],
				},
				serviceAddress: serviceAddressSchema,
				serviceAddressDestination: serviceAddressSchema,
				questions: questionsSchema,
				googleAppointmentConversion: {
					type: 'object',
					properties: { rwgToken: { type: 'string' } },
					required: ['rwgToken'],
				},
			},
			required: ['serviceOrder', 'customer', 'serviceAddress'],
		},
	},
	required: [
		'eCommercePlatform',
		'externalId',
		'transactionId',
		'itemId',
		'contactEmail',
		'installments',
		'productCode',
		'amount',
		'leadIdentifier',
		'paymentData',
		'integrationData',
	],
}

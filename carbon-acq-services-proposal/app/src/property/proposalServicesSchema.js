// Schemas for products types: single, variant, multiple, guincho
const singleProductDataSchema = {
	type: 'object',
	properties: {
		type: { type: 'string', enum: ['single'] },
		id: { type: 'integer' },
		partnerId: { type: 'integer' },
		sku: { type: 'string' },
		productQuantity: { type: 'integer' },
		categories: {
			type: 'object',
			properties: {
				category: { type: 'string' },
			},
		},
	},
	required: ['id', 'sku', 'partnerId', 'productQuantity'],
}

const variantProductDataSchema = {
	type: 'object',
	properties: {
		type: { type: 'string', enum: ['variant'] },
		id: { type: 'integer' },
		partnerId: { type: 'integer' },
		sku: { type: 'string' },
		productQuantity: { type: 'integer' },
		categories: {
			type: 'object',
			properties: {
				category: { type: 'string' },
			},
		},
	},
	required: ['id', 'sku', 'partnerId', 'productQuantity'],
}

const multipleProductDataSchema = {
	type: 'object',
	properties: {
		type: { type: 'string', enum: ['multiple', 'multiple_dynamic'] },
		id: { type: 'integer' },
		partnerId: { type: 'integer' },
		sku: { type: 'string' },
		productQuantity: { type: 'integer' },
		categories: {
			type: 'object',
			properties: {
				category: { type: 'string' },
			},
		},
		items: {
			type: 'array',
			minItems: 1,
			items: {
				type: 'object',
				properties: {
					id: { type: 'integer' },
					description: { type: 'string' },
					label: { type: 'string' },
					category: { type: 'string' },
					subCategory: { type: 'string' },
					quantity: { type: 'integer' },
				},
				required: ['id', 'quantity'],
			},
		},
		comboId: { type: 'integer' },
	},
	required: ['id', 'sku', 'partnerId', 'productQuantity', 'items', 'comboId'],
}

const guinchoProductDataSchema = {
	type: 'object',
	properties: {
		type: { type: 'string', enum: ['guincho'] },
		id: { type: 'integer' },
		partnerId: { type: 'integer' },
		sku: { type: 'string' },
		productQuantity: { type: 'integer' },
		categories: {
			type: 'object',
			properties: {
				category: { type: 'string' },
			},
		},
		mileage: {
			type: 'object',
			properties: {
				distanceKM: { type: 'number' },
				highwayFlag: { type: 'boolean', default: false },
			},
			required: ['distanceKM', 'highwayFlag'],
		},
		vehicleData: {
			type: 'object',
			properties: {
				vehicleLicenseCode: {
					oneOf: [
						{
							type: 'string',
							minLength: 7,
							maxLength: 8,
							pattern: '^[A-Za-z]{3}-?([0-9]{4}|[0-9][A-Za-z][0-9]{2})$',
						},
						{
							type: 'string',
							const: '',
						},
					],
				},
				modelCode: { type: 'string', minLength: 1 },
				modelYear: { type: 'number' },
				color: { type: 'string', minLength: 1 },
			},
			required: ['vehicleLicenseCode', 'modelCode', 'modelYear', 'color'],
		},
	},
	required: [
		'id',
		'sku',
		'partnerId',
		'productQuantity',
		'mileage',
		'vehicleData',
	],
}

exports.SCHEMA = {
	type: 'object',
	properties: {
		scope: { type: 'string' },
		serviceProvision: {
			type: 'object',
			properties: {
				products: {
					type: 'array',
					minItems: 1,
					maxItems: 1,
					items: {
						discriminator: {
							propertyName: 'type',
						},
						required: ['type'],
						oneOf: [
							{ $ref: '#/definitions/singleProductDataSchema' },
							{ $ref: '#/definitions/variantProductDataSchema' },
							{ $ref: '#/definitions/multipleProductDataSchema' },
							{ $ref: '#/definitions/guinchoProductDataSchema' },
						],
					},
				},
				serviceOrder: {
					type: 'object',
					properties: {
						requester: {
							type: 'object',
							properties: {
								name: { type: 'string' },
								socialName: { type: 'string', nullable: true },
								email: { type: 'string', format: 'email' },
								cellphone: { type: 'string' },
								documentNumber: { type: 'string' },
							},
							required: ['name', 'email', 'documentNumber', 'cellphone'],
						},
						serviceAddresses: {
							type: 'array',
							minItems: 1,
							maxItems: 2,
							uniqueItems: true,
							items: {
								type: 'object',
								properties: {
									type: { type: 'string', enum: ['origem', 'destino'] },
									city: { type: 'string', minLength: 1 },
									state: { type: 'string', minLength: 2, maxLength: 2 },
									zipCode: { type: 'string', pattern: '^\\d{8}$' },
									additionalInfo: { type: 'string', nullable: true },
									referencePointDescription: { type: 'string', nullable: true },
									neighborhood: { type: 'string', minLength: 1 },
									street: { type: 'string', minLength: 1 },
									streetNumber: { type: 'string', pattern: '^(|[0-9]+)$' },
									latitude: { type: 'number' },
									longitude: { type: 'number' },
								},
								required: [
									'type',
									'city',
									'state',
									'zipCode',
									'neighborhood',
									'street',
									'latitude',
									'longitude',
								],
							},
						},
						questions: {
							type: 'array',
							uniqueItems: true,
							items: {
								type: 'object',
								properties: {
									question: { type: 'number' },
									answer: { type: 'string' },
								},
								required: ['question', 'answer'],
							},
						},
					},
					required: ['requester', 'serviceAddresses'],
				},
				coupon: { type: 'string', nullable: true },
				partnerProductId: { type: 'string', nullable: true },
				schedule: {
					type: 'object',
					properties: {
						scheduleType: {
							type: 'string',
							enum: ['agendamento-imediato', 'agendamento-programado'],
						},
						serviceDateTime: { type: 'string' },
						specialtyCode: { type: 'string' },
						originCode: { type: 'string' },
						problem: { type: 'string' },
					},
					required: ['scheduleType', 'specialtyCode', 'originCode', 'problem'],
					if: {
						properties: { scheduleType: { const: 'agendamento-programado' } },
					},
					then: {
						required: ['serviceDateTime'],
					},
				},
			},
			required: ['products', 'serviceOrder', 'schedule'],
		},
		marketingOptInFlag: { type: 'boolean' },
		sessionId: { type: 'string' },
		userAgent: { type: 'string' },
		ipAddress: { type: 'string', format: 'ipv4' },
		susepCode: { type: 'string', nullable: true },
		affiliateId: { type: 'string', nullable: true },
		linkOrigin: { type: 'string', nullable: true },
		brokerName: { type: 'string', nullable: true },
		brokerPhone: { type: 'string', nullable: true },
		brokerEmail: { type: 'string', nullable: true },
		linkBrokerOrigin: { type: 'boolean' },
		cartCommerceId: { type: 'string', nullable: true },
		customerCommerceToken: { type: 'string', nullable: true },
		rwgToken: { type: 'string' },
		isRecommendation: { type: 'boolean' },
		gtmAnonymousId: { type: 'string' },
		clientId: { type: 'string' },
		userId: { type: 'string' },
		measurementSessionId: { type: 'string' },
	},
	patternProperties: {
		'^utm_.*$': { type: 'string', nullable: true },
	},
	required: [
		'scope',
		'serviceProvision',
		'marketingOptInFlag',
		'sessionId',
		'userAgent',
		'ipAddress',
	],
	definitions: {
		singleProductDataSchema,
		variantProductDataSchema,
		multipleProductDataSchema,
		guinchoProductDataSchema,
	},
}

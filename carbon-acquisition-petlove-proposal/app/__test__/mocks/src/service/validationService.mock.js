exports.VALID_INPUT_DATA = () => {
	return {
		products: [
			{
				id: 2500,
				name: 'CONSERTO DE COOKTOP',
				sku: 'HC100',
				partnerId: 110,
				productQuantity: 1,
			},
		],
		serviceOrder: {
			requester: {
				name: 'Teste',
				documentNumber: '33207922880',
			},
			serviceAddresses: [
				{
					city: 'São Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					latitude: -23.514836,
					streetNumber: '982',
					longitude: -46.3746187,
					addressType: 'ORIGEM',
					streetType: 'Avenida',
					phones: [
						{
							name: 'teste teste',
							areaCode: '11',
							number: '999999999',
							type: 'CELULAR',
						},
					],
				},
			],
		},
		coupon: 'TESTE',
	}
}
exports.VALIDATION_SCHEMA = () => {
	return {
		type: 'object',
		properties: {
			products: {
				type: 'array',
				minItems: 1,
				items: {
					type: 'object',
					properties: {
						id: { type: 'integer' },
						name: { type: 'string' },
						sku: { type: 'string' },
						partnerId: { type: 'integer' },
						productQuantity: { type: 'integer' },
						categoryId: { type: 'integer' },
						comboId: { type: 'integer' },
						mileage: {
							type: 'object',
							properties: {
								distanceKM: { type: 'number' },
								highwayFlag: { type: 'boolean' },
							},
							required: ['distanceKM', 'highwayFlag'],
						},
						items: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									id: { type: 'integer' },
									description: { type: 'string' },
									quantity: { type: 'integer' },
									productId: { type: 'integer' },
								},
								required: ['quantity'],
							},
						},
					},
					required: ['id', 'sku', 'partnerId'],
				},
			},
			serviceOrder: {
				type: 'object',
				properties: {
					requester: {
						type: 'object',
						properties: {
							name: { type: 'string' },
							email: { type: 'string', format: 'email' },
							documentNumber: { type: 'string' },
							birthDate: { type: 'string' },
						},
						required: ['name', 'documentNumber'],
					},
					serviceAddresses: {
						type: 'array',
						minItems: 1,
						items: {
							type: 'object',
							properties: {
								city: { type: 'string' },
								state: { type: 'string' },
								zipCode: { type: 'string', pattern: '^\\d{8}$' },
								additionalInfo: { type: 'string' },
								referencePointDescription: { type: 'string' },
								neighborhood: { type: 'string' },
								street: { type: 'string' },
								latitude: { type: 'number' },
								streetNumber: { type: 'string' },
								longitude: { type: 'number' },
								addressType: {
									type: 'string',
								},
								streetType: { type: 'string' },
								phones: {
									type: 'array',
									minItems: 1,
									items: {
										type: 'object',
										properties: {
											name: { type: 'string' },
											areaCode: { type: 'string' },
											number: { type: 'string' },
											type: { type: 'string' },
										},
										required: ['name', 'areaCode', 'number', 'type'],
									},
								},
							},
							required: [
								'city',
								'state',
								'zipCode',
								'neighborhood',
								'street',
								'latitude',
								'streetNumber',
								'longitude',
							],
						},
					},
				},
				required: ['serviceAddresses'],
			},
			coupon: { type: 'string' },
			partnerProductId: { type: 'string' },
		},
		required: ['products', 'serviceOrder'],
	}
}
exports.INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	return {
		serviceOrder: {
			requester: {
				name: 'Teste',
				documentNumber: '33207922880',
			},
			serviceAddresses: [
				{
					city: 'São Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					latitude: -23.514836,
					streetNumber: '982',
					longitude: -46.3746187,
					addressType: 'ORIGEM',
					streetType: 'Avenida',
					phones: [
						{
							name: 'teste teste',
							areaCode: '11',
							number: '999999999',
							type: 'CELULAR',
						},
					],
				},
			],
		},
		coupon: 'TESTE',
		partnerProductId: '221',
	}
}
exports.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'products'
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		products: [
			{
				id: 2500,
				name: false,
				sku: 123,
				partnerId: 110,
				productQuantity: 1,
			},
		],
		serviceOrder: {
			requester: {
				name: 'Teste',
				documentNumber: '33207922880',
			},
			serviceAddresses: [
				{
					city: 'São Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					latitude: -23.514836,
					streetNumber: '982',
					longitude: -46.3746187,
					addressType: 'ORIGEM',
					streetType: 'Avenida',
					phones: [
						{
							name: 'teste teste',
							areaCode: '11',
							number: '999999999',
							type: 'CELULAR',
						},
					],
				},
			],
		},

		coupon: 'TESTE',
		partnerProductId: '221',
	}
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'name'
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	return {
		products: [
			{
				id: 2500,
				name: 'CONSERTO DE COOKTOP',
				sku: 'HC100',
				partnerId: 110,
				productQuantity: 1,
			},
		],
		serviceOrder: {
			requester: {
				name: 'Teste',
				documentNumber: '33207922880',
			},
			serviceAddresses: [
				{
					city: 'São Paulo',
					state: 'SP',
					zipCode: '01310',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					latitude: -23.514836,
					streetNumber: '982',
					longitude: -46.3746187,
					addressType: 'ORIGEM',
					streetType: 'Avenida',
					phones: [
						{
							name: 'teste teste',
							areaCode: '11',
							number: '999999999',
							type: 'CELULAR',
						},
					],
				},
			],
		},

		coupon: 'TESTE',
		partnerProductId: '221',
	}
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'zipCode'
}
exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY = () => {
	return {
		products: [
			{
				id: 2500,
				name: 'CONSERTO DE COOKTOP',
				sku: 'HC100',
				partnerId: 110,
				productQuantity: 1,
			},
		],
		serviceOrder: {
			requester: {
				name: 'Teste',
				documentNumber: '33207922880',
			},
			serviceAddresses: [
				{
					city: 'São Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					latitude: -23.514836,
					streetNumber: '982',
					longitude: -46.3746187,
					addressType: 'ORIGEM',
					streetType: 'Avenida',
					phones: [
						{
							name: 'teste teste',
							areaCode: '11',
							number: '999999999',
							type: 'CELULAR',
						},
					],
				},
			],
		},
		coupon: 123,
		partnerProductId: '221',
	}
}
exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME = () => {
	return 'coupon'
}
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	return {
		products: [
			{
				id: 2500,
				name: 'CONSERTO DE COOKTOP',
				sku: 'HC100',
				partnerId: 110,
				productQuantity: 1,
			},
		],
		serviceOrder: {
			requester: {
				name: 'Teste',
				documentNumber: '33207922880',
				email: 'somedomainemail.com',
			},
			serviceAddresses: [
				{
					city: 'São Paulo',
					state: 'SP',
					zipCode: '01310100',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					latitude: -23.514836,
					streetNumber: '982',
					longitude: -46.3746187,
					addressType: 'ORIGEM',
					streetType: 'Avenida',
					phones: [
						{
							name: 'teste teste',
							areaCode: '11',
							number: '999999999',
							type: 'CELULAR',
						},
					],
				},
			],
		},

		coupon: 'TESTE',
		partnerProductId: '221',
	}
}
exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY = () => {
	return {
		products: [
			{
				id: 2500,
				name: 'CONSERTO DE COOKTOP',
				sku: 'HC100',
				partnerId: 110,
				productQuantity: 1,
			},
		],
		serviceOrder: {
			requester: {
				name: 'Teste',
				documentNumber: '33207922880',
			},
			serviceAddresses: [
				{
					city: 'São Paulo',
					state: 'SP',
					zipCode: '01310100000',
					neighborhood: 'Bela Vista',
					street: 'Avenida Paulista',
					latitude: -23.514836,
					streetNumber: '982',
					longitude: -46.3746187,
					addressType: 'ORIGEM',
					streetType: 'Avenida',
					phones: [
						{
							name: 'teste teste',
							areaCode: '11',
							number: '999999999',
							type: 'CELULAR',
						},
					],
				},
			],
		},

		coupon: 'TESTE',
		partnerProductId: '221',
	}
}
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'email'
}
exports.INVALID_INPUT_DATA_WRONG_PATTERN_PROPERTY_NAME = () => {
	return 'zipCode'
}

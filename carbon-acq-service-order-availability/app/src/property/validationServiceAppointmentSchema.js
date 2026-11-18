module.exports.SCHEMA = {
	type: 'object',
	properties: {
		partnerId: {
			type: 'string',
			maxLength: 3,
		},
		city: {
			type: 'string',
			maxLength: 45,
		},
		stateCode: {
			type: 'string',
			minLength: 2,
			maxLength: 2,
			pattern: '^[A-Z]{2}$',
		},
		specialtyCode: {
			type: 'string',
			maxLength: 5,
			description: 'Especialidade que deseja assistência.',
		},
		latitude: {
			type: 'number',
			minimum: -90,
			maximum: 90,
		},
		longitude: {
			type: 'number',
			minimum: -180,
			maximum: 180,
		},
		catTarCode: {
			type: 'string',
			maxLength: 3,
			description: 'Caso não tenha a informação enviar “0”',
		},
		originCode: {
			type: 'string',
			maxLength: 2,
			description: 'Código de origem do serviço',
		},
		assistanceCode: {
			type: 'string',
			maxLength: 3,
			description: 'Caso não tenha a informação enviar “0”',
		},
		natureCode: {
			type: 'string',
			maxLength: 5,
			description: 'Caso não tenha a informação enviar “0”',
		},
		subNatureCode: {
			type: 'string',
			maxLength: 2,
			description: 'Caso não tenha a informação enviar “0”',
		},
		vehicleCode: {
			type: 'string',
			maxLength: 6,
			description: 'Caso não tenha a informação enviar “0”',
		},
		addressType: {
			type: 'string',
			enum: ['3'],
			description: 'Fixo “3”',
		},
		problemCode: {
			type: 'string',
			maxLength: 6,
			description: 'Campo para especificar tempo médio de serviço prestado',
		},
		specialtyList: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					questions: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								code: {
									type: 'string',
								},
								responseDescription: {
									type: 'string',
								},
							},
							required: ['code', 'responseDescription'],
						},
					},
				},
			},
		},
		serviceDateTime: {
			type: 'string',
			format: 'date-time',
			description: 'Data e hora do serviço no formato ISO 8601 (opcional).',
		},
	},
	required: [
		'city',
		'stateCode',
		'specialtyCode',
		'latitude',
		'longitude',
		'originCode',
	],
}

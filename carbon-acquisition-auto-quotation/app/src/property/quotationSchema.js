module.exports = {
	type: 'object',
	properties: {
		scope: { type: 'string' },
		auto: {
			type: 'object',
			properties: {
				portoSalesCommission: { type: 'string' },
				azulSalesCommission: { type: 'string' },
				person: {
					type: 'object',
					properties: {
						client: {
							type: 'object',
							properties: {
								name: { type: 'string' },
								cpf: { type: 'string', minLength: 11, maxLength: 11 },
								cellPhone: { type: 'string', minLength: 10 },
								email: { type: 'string', format: 'email' },
							},
							required: ['name', 'cpf', 'cellPhone', 'email'],
							additionalProperties: true,
						},
					},
					required: ['client'],
				},
				productDetails: {
					type: 'object',
					properties: {
						vehicleModel: { type: 'string' },
						yearModel: { type: 'integer' },
						yearManufacture: { type: 'integer' },
						brandNewCar: { type: 'string' },
						vehicleCode: { type: 'integer' },
						plate: { type: 'string', nullable: true },
						chassis: {
							type: 'string',
							minLength: 17,
							maxLength: 17,
							nullable: true,
						},
					},
					required: [
						'vehicleModel',
						'yearModel',
						'brandNewCar',
						'vehicleCode',
					],
				},
				origin: { type: 'integer' },
				reference: { type: 'string' },
				susepCode: { type: 'string' },
				vdoCode: { type: 'string' },
				pmcInfo: { type: 'string' },
				idGoogle: { type: 'string' },
				utmSource: { type: 'string' },
				utmMedium: { type: 'string' },
				utmContent: { type: 'string' },
				marketingOptInFlag: { type: 'boolean' },
				partnerCode: { type: 'integer' },
				conductors: {
					type: 'object',
					properties: {
						person: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									cpf: { type: 'string', minLength: 11, maxLength: 11 },
								},
							},
						},
					},
					required: ['person'],
				},
				zipCodeOvernightStay: { type: 'string' },
				bonusPolicy: {
					type: 'object',
					properties: {
						congenere: { type: 'integer' },

						bonus: {
							type: 'object',
							properties: {
								value: { type: 'integer' },
							},
						},
					},
				},
				newJourney: { type: 'number' },
				shoppingToken: { type: 'string', nullable: true },
				customerCommerceToken: { type: 'string', nullable: true  },
				idBranch: { type: 'integer', nullable: true },
				typeUse: { type: 'number', nullable: true },
			},
			required: [
				'susepCode',
				'person',
				'productDetails',
				'origin',
				'reference',
				'vdoCode',
				'pmcInfo',
				'marketingOptInFlag',
				'partnerCode',
				'conductors',
				'zipCodeOvernightStay',
				'portoSalesCommission',
				'azulSalesCommission',
			],
			additionalProperties: true,
		},
	},
	required: ['scope', 'auto'],
}

module.exports = {
	type: 'object',
	properties: {
		portableDevice: {
			type: 'object',
			properties: {
				client: {
					type: 'object',
					properties: {
						cpf: { type: 'string', pattern: '^[0-9]{11}$' },
						name: { type: 'string' },
						phone: {
							type: 'string',
							pattern: '^(?:55)?[1-9]{2}[0-9]{8,9}$',
						},
						email: { type: 'string', format: 'email' },
						zipCode: { type: 'string' },
					},
					required: ['cpf', 'name', 'phone', 'email', 'zipCode'],
				},
				productDetails: {
					type: 'object',
					nullable: false,
					properties: {
						offerCode: { type: 'number', enum: [5220, 5221, 5222] },
						deviceTypeCode: { type: 'integer', nullable: false },
						deviceModel: { type: 'string', nullable: true },
						brandCode: { type: 'integer', nullable: true },
						acquisitionDate: { type: 'string', nullable: false },
						acquisitionValue: {
							type: 'number',
							nullable: false,
							minimum: 500,
						},
						rentedDevice: { type: 'boolean', nullable: false },
					},
					required: [
						'offerCode',
						'deviceTypeCode',
						'deviceModel',
						'brandCode',
						'acquisitionDate',
						'acquisitionValue',
						'rentedDevice',
					],
					allOf: [
						// ─── offerCode: 5220 ───────────────────────────────────────
						{
							if: { properties: { offerCode: { const: 5220 } } },
							then: {
								properties: {
									deviceTypeCode: { enum: [26, 29, 74] },
									rentedDevice: { const: false },
								},
								allOf: [
									{
										if: { properties: { deviceTypeCode: { enum: [26, 29] } } },
										then: {
											properties: {
												acquisitionValue: { type: 'number', maximum: 30000 },
											},
										},
									},
									{
										if: { properties: { deviceTypeCode: { enum: [74] } } },
										then: {
											properties: {
												acquisitionValue: { type: 'number', maximum: 5000 },
											},
										},
									},
								],
							},
						},
						// ─── offerCode: 5221 ───────────────────────────────────────
						{
							if: { properties: { offerCode: { const: 5221 } } },
							then: {
								properties: {
									deviceTypeCode: { enum: [32, 33, 72] },
								},
								allOf: [
									{
										if: { properties: { deviceTypeCode: { enum: [32, 33] } } },
										then: {
											properties: {
												acquisitionValue: { type: 'number', maximum: 20000 },
											},
										},
									},
									{
										if: { properties: { deviceTypeCode: { const: 72 } } },
										then: {
											properties: {
												acquisitionValue: { type: 'number', maximum: 25000 },
											},
										},
									},
								],
							},
						},
						// ─── offerCode: 5222 ───────────────────────────────────────
						{
							if: { properties: { offerCode: { const: 5222 } } },
							then: {
								properties: {
									deviceTypeCode: { enum: [31, 67, 71, 75, 76, 77, 78, 79] },
									rentedDevice: { const: false },
								},
								allOf: [
									{
										if: { properties: { deviceTypeCode: { enum: [31, 67, 71, 76, 77] } } },
										then: {
											properties: {
												acquisitionValue: { type: 'number', maximum: 10000 },
											},
										},
									},
									{
										if: { properties: { deviceTypeCode: { enum: [75, 78, 79] } } },
										then: {
											properties: {
												acquisitionValue: { type: 'number', maximum: 30000 },
											},
										},
									},
								],
							},
						},
					],
				},
				marketingOptInFlag: { type: 'boolean', nullable: false },
				sessionId: { type: 'string', nullable: false },
				userAgent: { type: 'string', nullable: false },
				ipAddress: { type: 'string', nullable: false },
				coupon: { type: 'string', nullable: true },
				commissionRate: { type: 'string', nullable: true },
			},
			required: [
				'client',
				'productDetails',
				'marketingOptInFlag',
				'sessionId',
				'userAgent',
				'ipAddress',
			],
		},
		susep: { type: 'string' },
	},
	required: ['portableDevice'],
}
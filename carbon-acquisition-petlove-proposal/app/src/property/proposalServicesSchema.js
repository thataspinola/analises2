exports.SCHEMA = {
	type: 'object',
	properties: {
		pet: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
				},
				type: {
					type: 'string',
				},
			},
			required: ['name', 'type'],
		},
		address: {
			type: 'object',
			properties: {
				cep: {
					type: 'string',
					pattern: '^[0-9]{8}$',
				},
				street: {
					type: 'string',
				},
				number: {
					type: 'string',
					maxLength: 6,
				},
				complement: {
					type: 'string',
				},
				city: {
					type: 'string',
				},
				state: {
					type: 'string',
				},
				stateCode: {
					type: 'string',
				},
				neighborhood: {
					type: 'string',
				},
			},
			required: ['cep', 'street', 'city', 'state', 'neighborhood'],
		},
		plan: {
			type: 'object',
			properties: {
				id: {
					type: 'number',
				},
				price: {
					type: 'number',
				},
				name: {
					type: 'string',
				},
			},
			required: ['price', 'name'],
		},
		user: {
			type: 'object',
			properties: {
				fullName: {
					type: 'string',
				},
				cpf: {
					type: 'string',
					pattern: '^[0-9]{11}$',
				},
				phone: {
					type: 'string',
				},
				email: {
					type: 'string',
					format: 'email',
				},
				acceptTerms: {
					type: 'boolean',
				},
				mktCommunication: {
					type: 'boolean',
				},
			},
			required: ['fullName', 'cpf', 'email', 'acceptTerms', 'mktCommunication'],
		},
		cartCommerceId: { type: 'string', nullable: true },
		customerCommerceToken: { type: 'string', nullable: true },
		marketingOptInFlag: { type: 'boolean' },
		sessionId: { type: 'string' },
		userAgent: { type: 'string' },
		ipAddress: { type: 'string', format: 'ipv4' },
		susepCode: { type: 'string', nullable: true },
		affiliateId: { type: 'string', nullable: true },
		linkOrigin: { type: 'string', nullable: true },
	},
	required: [
		'pet',
		'address',
		'plan',
		'user',
		'marketingOptInFlag',
		'sessionId',
		'userAgent',
		'ipAddress',
	],
}

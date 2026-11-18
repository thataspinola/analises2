module.exports = {
	type: 'object',
	properties: {
		transactionId: { type: 'string', minLength: 1 },
		status: { enum: ['SUCCESS', 'ERROR', 'PENDING'] },
		scope: { enum: ['phone', 'auto', 'portable_device'] },
		paymentData: {
			type: 'object',
			properties: {
				orderNumber: { type: 'string', minLength: 1 },
				scope: { enum: ['phone', 'auto', 'portable_device'] },
				externalId: { type: 'string', minLength: 1 },
			},
			required: ['orderNumber', 'scope', 'externalId'],
			additionalProperties: true,
		},
	},
	oneOf: [
		{
			required: ['transactionId', 'scope', 'status'],
			not: { required: ['paymentData'] },
		},
		{
			required: ['paymentData', 'scope', 'status'],
			not: { required: ['transactionId'] },
			properties: {
				status: { const: 'ERROR' },
			},
		},
	],
	additionalProperties: true,
}

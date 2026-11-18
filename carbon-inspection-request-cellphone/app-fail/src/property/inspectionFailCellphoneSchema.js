module.exports = {
	type: 'object',
	properties: {
		orderNumber: { type: 'string', minLength: 1 },
		scope: { const: 'phone' },
		externalId: { type: 'string', minLength: 1 },
	},
	required: ['orderNumber', 'scope', 'externalId'],
	additionalProperties: true,
}

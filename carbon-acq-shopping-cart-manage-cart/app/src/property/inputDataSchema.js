module.exports = {
	type: 'object',
	properties: {
		cartCommerceId: { type: 'string', nullable: true },
		customerToken: { type: 'string', nullable: true },
		cartItemUid: { type: 'string' },
	},
	required: ['cartCommerceId', 'customerToken'],
	additionalProperties: false,
}

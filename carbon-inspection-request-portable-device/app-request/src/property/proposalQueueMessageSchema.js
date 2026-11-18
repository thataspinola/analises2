module.exports = {
	type: 'object',
	properties: {
		orderNumber: { type: 'string' },
		externalId: { type: 'string' },
		scope: { type: 'string' },
		contactEmail: { type: 'string', format: 'email' },
		charges: { type: 'array' },
		integrationData: { type: 'object' },
	},
	required: [
		'orderNumber',
		'externalId',
		'scope',
		'contactEmail',
		'charges',
		'integrationData',
	],
}

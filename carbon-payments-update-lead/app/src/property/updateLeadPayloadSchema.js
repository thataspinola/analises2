module.exports = {
	type: 'object',
	properties: {
		scope: { enum: ['phone', 'auto', 'lifeinsurance', 'portable_device', 'travel'] },
		status: { enum: ['PAGA', 'REJEITADA'] },
		leadIdentifier: { type: 'number' },
	},
	required: ['scope', 'status', 'leadIdentifier'],
	additionalProperties: true,
}

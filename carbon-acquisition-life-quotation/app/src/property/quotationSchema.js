module.exports = {
	type: 'object',
	properties: {
		lifeinsurance: {
			type: 'object',
			properties: {
                date_of_birth: { type: 'string' },
                salesMedium: { type: 'string' },
                susep: { type: 'string' }
            },
            required: ['date_of_birth', 'salesMedium', 'susep']
        }
	},
	required: ['lifeinsurance'],
}

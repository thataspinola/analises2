module.exports = {
	type: 'object',
	properties: {
		latitude: {
			type: 'string',
		},
		longitude: {
			type: 'string',
		},
		workingSaturday: { type: 'string' },
		operatesAtNight: { type: 'string' },
		electricCharger: { type: 'string' },
	},
	required: ['latitude', 'longitude'],
	additionalProperties: false,
}

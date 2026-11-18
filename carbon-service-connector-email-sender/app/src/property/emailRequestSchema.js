exports.SEND_EMAIL_REQUEST_SCHEMA = {
	type: 'object',
	properties: {
		subject: { type: 'string' },
		from: { type: 'string', format: 'email' },
		to: {
			type: 'array',
			minItems: 1,
			items: { type: 'string', format: 'email' },
		},
		toCc: { type: 'array', items: { type: 'string', format: 'email' } },
		ToCco: { type: 'array', items: { type: 'string', format: 'email' } },
		emailType: { type: 'string' },
		template: { type: 'string' },
		metadata: { type: 'object' },
	},
	required: ['subject', 'from', 'to', 'emailType', 'template'],
}

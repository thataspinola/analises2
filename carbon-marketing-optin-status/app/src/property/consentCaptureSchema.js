module.exports = {
    type: 'object',
	properties: {
        taxvat: { type: 'string', minLength: 11, maxLength: 11 }
    },
    required: [
        "taxvat"
    ]
}
				
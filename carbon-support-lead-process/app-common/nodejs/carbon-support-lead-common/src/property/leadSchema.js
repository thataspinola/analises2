module.exports = {
	type: 'object',
	properties: {
		referencia: { type: 'string' },
		cpf: { type: 'string', format: 'cpf'},
		cnpj: { type: 'string', format: 'cnpj'},
		id_produto: { type: 'string', nullable: true },
	},
	anyOf: [
		{ required: ['cpf'] },
		{ required: ['cnpj'] }
	],
	required: ['referencia'],
	additionalProperties: true
}

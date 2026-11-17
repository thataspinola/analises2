module.exports = {
	type: 'object',
	properties: {
		numeroOrcamento: { type: 'string' },
		estadoSaude: { type: 'string' },
		profissao: { type: 'string' },
	},
	required: ['numeroOrcamento', 'estadoSaude', 'profissao'],
}

module.exports = {
	type: 'object',
	properties: {
		codigoCanal: { type: 'integer', minimum: 1 },
		tipoDocumento: { type: 'string', enum: ['CPF', 'CNPJ'] },
		documento: { type: 'string' },
		codigoCampanha: { type: 'string', nullable: true },
	},
	required: ['codigoCanal', 'tipoDocumento', 'documento'],
	additionalProperties: false,
}

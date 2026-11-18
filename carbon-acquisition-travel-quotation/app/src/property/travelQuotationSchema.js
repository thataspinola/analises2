exports.travelQuotationSchema = {
    type: 'object',
	properties: {
		susep: { type: 'string' },
        informacoes: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    meioComercializacao: {type: 'string'},
                    codigo: { type: 'string' },
                    conteudo: {
                        oneOf: [{ type: 'string'}, { type: 'number' }, { type: 'boolean' }],
                        $comment:
                            'Use of oneOf including both string, number and boolean types is needed to ensure validation',
                    },
    
                },
                required: [
                    'codigo',
                    'conteudo'
                ],
            }
        },
    },
    required: [
        'informacoes',
        'susep'
    ]
}
				
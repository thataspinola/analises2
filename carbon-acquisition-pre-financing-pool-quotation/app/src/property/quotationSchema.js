module.exports = {
    type: 'object',
    properties: {
        cpf: { type: 'string', nullable: true },
        tipoBem: { type: 'string' },
        valorCarta: { type: 'integer', nullable: true },
        parcela: { type: 'integer', nullable: true },
    },
    required: ['tipoBem'],
    anyOf: [
        { required: ['valorCarta'] },
        { required: ['parcela'] }
    ]
}
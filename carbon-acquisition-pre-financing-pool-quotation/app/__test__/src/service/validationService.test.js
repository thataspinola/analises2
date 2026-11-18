const validationService = require('../../../src/service/validationService')
const CONSTANT = require('../../../src/property')


jest.mock('../../../src/property', () => ({
    QUOTATION_SCHEMA: {
        type: 'object',
        required: ['cpf', 'valorCarta'],
        properties: {
            cpf: { type: 'string', minLength: 11 },
            valorCarta: { type: 'number' }
        }
    }
}))

describe('Service - Validation', () => {
    test('Deve passar sem erros quando o payload é válido', () => {
        const validPayload = { cpf: '12345678901', valorCarta: 1000 }
        expect(() => validationService.inputData(validPayload)).not.toThrow()
    })

    test('Deve lançar ValidationError quando faltar um campo obrigatório', () => {
        const invalidPayload = { valorCarta: 1000 }
        expect(() => validationService.inputData(invalidPayload)).toThrow(/The attributes values are not valid: cpf/)
    })

    test('Deve lançar ValidationError quando o tipo do dado estiver incorreto', () => {
        const invalidPayload = { cpf: 12345678901, valorCarta: 1000 }
        expect(() => validationService.inputData(invalidPayload)).toThrow(/The attributes values are not valid: cpf/)
    })
})
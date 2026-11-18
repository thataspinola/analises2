const MOCKS = require('./../../mocks/index.mock')
const service = require('./../../../src/service')

describe('isNullOrEmpty', () => {
    test('deve retornar true para null', () => {
        expect(service.string.isNullOrEmpty(MOCKS.STRING_SERVICE.NULL_VALUE)).toBe(true)
    })

    test('deve retornar true para undefined', () => {
        expect(service.string.isNullOrEmpty(MOCKS.STRING_SERVICE.UNDEFINED_VALUE)).toBe(true)
    })

    test('deve retornar true para string vazia', () => {
        expect(service.string.isNullOrEmpty(MOCKS.STRING_SERVICE.EMPTY_STRING)).toBe(true)
    })

    test('deve retornar false para string não vazia', () => {
        expect(service.string.isNullOrEmpty(MOCKS.STRING_SERVICE.NON_EMPTY_STRING)).toBe(false)
    })

    test('deve retornar false para número', () => {
        expect(service.string.isNullOrEmpty(MOCKS.STRING_SERVICE.NUMBER_VALUE)).toBe(false)
    })
})
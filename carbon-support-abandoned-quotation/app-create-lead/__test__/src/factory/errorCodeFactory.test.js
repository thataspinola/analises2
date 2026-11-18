const { errorFactory } = require('../../../src/factory')
const { PRODUCT_CODE, PRODUCT_STEP, ERROR_CODE } = require("../../../src/property")

describe('Suite de testes de errorCodeFactory.js', () => {
    describe('getCode', () => {
        test('Deve retornar o código de erro padrão se não encontrar correspondência', () => {
            const result = errorFactory.getCode('erro desconhecido')
            expect(result).toBe(`${PRODUCT_CODE}${PRODUCT_STEP}${ERROR_CODE.DEFAULT}`)
        })

        test('Deve retornar o código de erro 1000001 quando for um erro de blocklist', () => {
            const blocklistError = {
                message: 'Dynamics responded with a Blocklist error',
                code: 422
            }

            const result = errorFactory.getCode(blocklistError.message, blocklistError.code)
            expect(result).toBe(`${PRODUCT_CODE}${PRODUCT_STEP}${ERROR_CODE.BLOCKLIST}`)
        })
    })

    describe('getDefaultCode', () => {
        test('Deve retornar o código de erro padrão', () => {
            const result = errorFactory.getDefaultCode()
            expect(result).toBe(`${PRODUCT_CODE}${PRODUCT_STEP}${ERROR_CODE.DEFAULT}`)
        })
    })
})

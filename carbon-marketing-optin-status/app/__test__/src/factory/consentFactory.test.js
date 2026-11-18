const factory = require('../../../src/factory')
const MOCKS = require('./../../mocks/src/factory/consentFactory.mock')

describe('Suite de testes de consentFactory.js', () => {
    test('Deve criar um objeto de consentimento com o code NOT_FOUND quando receber data undefined', () => {
        const result = factory.consent.createMarketingOptInStatusResponse(MOCKS.NOT_FOULD())
        expect(result).toEqual(MOCKS.CONSENTS_NOT_FOULD())
    })

    test('Deve criar um objeto de consentimento com o code OPT_IN quando receber data opt true', () => {
        const result = factory.consent.createMarketingOptInStatusResponse(MOCKS.OPT_IN())
        expect(result).toEqual(MOCKS.CONSENTS_OPT_IN())
    })

    test('Deve criar um objeto de consentimento com o code OPT_OUT quando receber data opt false', () => {
        const result = factory.consent.createMarketingOptInStatusResponse(MOCKS.OPT_OUT())
        expect(result).toEqual(MOCKS.CONSENTS_OPT_OUT())
    })
})
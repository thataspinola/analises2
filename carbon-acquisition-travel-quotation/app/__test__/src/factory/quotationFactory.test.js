const factory = require('./../../../src/factory')
const service = require('./../../../src/service')
const MOCKS = require('./../../mocks/index.mock')

jest.mock('./../../../src/service', () => ({
    string: {
        isNullOrEmpty: jest.fn()
    }
}))

describe('QuotationFactory', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should define meioComercializacao with "HUB if it is empty', () => {
        service.string.isNullOrEmpty.mockReturnValue(true)
        const input = { meioComercializacao: '' }
        const result = factory.quotation.create(MOCKS.QUOTATION_FACTORY.PAYLOAD_WITHOUT_MEIO_COMERCIALIZACAO)
        expect(result.meioComercializacao).toBe(MOCKS.QUOTATION_FACTORY.PAYLOAD_WITHOUT_MEIO_COMERCIALIZACAO.meioComercializacao)
    })

    test('Should not change meioComercializacao if it already content a value', () => {
        service.string.isNullOrEmpty.mockReturnValue(false)
        const input = { meioComercializacao: 'Existing Value' }
        const result = factory.quotation.create(MOCKS.QUOTATION_FACTORY.PAYLOAD_WITH_MEIO_COMERCIALIZACAO)
        expect(result.meioComercializacao).toBe(MOCKS.QUOTATION_FACTORY.PAYLOAD_WITH_MEIO_COMERCIALIZACAO.meioComercializacao)
    })

    test('Should remove isFromNewPdp from the quotation', () => {
        const result = factory.quotation.create(MOCKS.VALID_INPUT_DATA)
        expect(result.hasOwnProperty('isFromNewPdp')).toBe(false);
    })
})
const controller = require('./../../../src/controller')
const CONSTANT = require('./../../../src/property')
const service = require('./../../../src/service')
const tokenLayer = require('@porto-seguro/hub-vendas.carbon-token')
const factory = require('./../../../src/factory')
const api = require('./../../../src/api')
const mocks = require('./../../mocks')

jest.mock('./../../../src/service')
jest.mock('@porto-seguro/hub-vendas.carbon-token')
jest.mock('./../../../src/factory')
jest.mock('./../../../src/api/vida/vida-on/v1/proposta/confirmationApi.js')

describe('proposalController', () => {
    const mockInputData = mocks.INVOKER_PAYLOAD_STRING
    const mockTraceId = 'trace-123'
    const mockQuotationId = 'quotation-123'
    const mockCertificates = 'certificates'
    const mockToken = 'mockToken'

    beforeEach(() => {
        jest.clearAllMocks()
        tokenLayer.getSensediaTokenCarbonCloudInternal.mockResolvedValue(mockToken)
        tokenLayer.getPortoCertificates.mockResolvedValue(mockCertificates)
    })

    test('should process successfully and return success response', async () => {
        const mockApiResponseData = mocks.PROPOSAL_API_RESPONSE

        service.validationService.inputData.mockImplementation(() => {})
        api.vida.vidaon.v1.proposta.confirmation.Post.mockResolvedValue(mockApiResponseData)
        factory.response.success.mockReturnValue({ success: true })

        const result = await controller.proposalController.process(mockInputData, mockTraceId, mockQuotationId)

        expect(result).toEqual({ success: true })
        expect(service.validationService.inputData).toHaveBeenCalledWith(mockInputData, CONSTANT.PROPOSAL_SCHEMA)
        expect(tokenLayer.getSensediaTokenCarbonCloudInternal).toHaveBeenCalled()
        expect(api.vida.vidaon.v1.proposta.confirmation.Post).toHaveBeenCalledWith(
            mockInputData,
            mockToken,
            mockCertificates,
            mockTraceId,
            mockQuotationId
        )
    })

    test('should log a warning and return bad request error if validation fails', async () => {
        const validationError = new Error('Validation failed')
        validationError.name = 'ValidationError'

        service.validationService.inputData.mockImplementation(() => { throw validationError })

        const result = await controller.proposalController.process(mockInputData, mockTraceId, mockQuotationId)

        expect(result).toEqual(factory.response.badRequestError(validationError.message))
        expect(service.logger.warn).toHaveBeenCalled()
    })

    test('should log an error and return error response if getting token fails', async () => {
        const tokenError = new Error('Token retrieval failed')

        tokenLayer.getSensediaTokenHubCloudInternal.mockRejectedValue(tokenError)

        const result = await controller.proposalController.process(mockInputData, mockTraceId, mockQuotationId)

        expect(result).toEqual(factory.response.error(tokenError.message))
        expect(service.logger.error).toHaveBeenCalled()
    })

    test('should log an error and return error response if API confirmation fails', async () => {
        const apiError = new Error('API call failed')
        api.vida.vidaon.v1.proposta.confirmation.Post.mockRejectedValue(apiError)
        
        const result = await controller.proposalController.process(mockInputData, mockTraceId, mockQuotationId)

        expect(result).toEqual(factory.response.error(apiError.message))
        expect(service.logger.error).toHaveBeenCalled()
    })

    test('should log an error and throw if validation fails with a non-ValidationError', async () => {
        const generalError = new Error('General error')

        service.validationService.inputData.mockImplementation(() => { throw generalError })

        const result = await controller.proposalController.process(mockInputData, mockTraceId, mockQuotationId)

        expect(result).toEqual(factory.response.error(generalError.message))
        expect(service.logger.error).toHaveBeenCalled()
    })

    test('should log an error and throw if validation fails with a non-ValidationError', async () => {
        const validationError = new Error('Validation failed')
        validationError.name = 'ValidationError'

        service.validationService.inputData.mockImplementation(() => { throw validationError })

        const result = await controller.proposalController.process(mockInputData, mockTraceId, mockQuotationId)

        expect(result).toEqual(factory.response.badRequestError(validationError.message))
        expect(service.logger.warn).toHaveBeenCalled()
    })
})

const responseFactory = require('../../../src/factory/responseFactory')
const CONSTANT = require('../../../src/property')
const common = require(CONSTANT.COMMON_LIBRARY_LOCATION)
const MOCKS = require('../../mocks/index.mock')

describe('responseFactory', () => {
    test('should export error function', () => {
        expect(responseFactory.error).toBe(common.factory.response.error)
    })

    test('should export badRequestError function', () => {
        expect(responseFactory.badRequestError).toBe(common.factory.response.badRequestError)
    })

    test('should export success function', () => {
        expect(responseFactory.success).toBeInstanceOf(Function)
    })

    test('success function should return a success response', () => {
        const expectedResponse = common.factory.response.success(MOCKS.RESPONSE_FACTORY.SUCCESS_RETURN())
        const response = responseFactory.success(MOCKS.RESPONSE_FACTORY.MESSAGE_ID())
        expect(response).toEqual(expectedResponse)
    })
})
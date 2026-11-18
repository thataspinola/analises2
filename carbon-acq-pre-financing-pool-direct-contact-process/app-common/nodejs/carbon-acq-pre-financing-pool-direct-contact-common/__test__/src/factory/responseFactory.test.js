const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Given an error call', () => {
	test('It should a response with the expected value without body.message when message parameter is undefined or an empty string', async () => {
		const errorReturnValue = factory.response.error()
		expect(errorReturnValue).toEqual(
			MOCKS.RESPONSE_FACTORY_DEFAULT_ERROR_RETURN()
		)
	})
	test('It should a response with the expected value with body.message when message parameter is not undefined and not an empty string', async () => {
		const errorReturnValue = factory.response.error(
			MOCKS.RESPONSE_FACTORY_ERROR_MESSAGE()
		)
		expect(errorReturnValue).toEqual(
			MOCKS.RESPONSE_FACTORY_ERROR_WITH_MESSAGE_RETURN()
		)
	})
})

describe('Given a badRequestError call', () => {
	test('It should a response with the expected value with a default body.message when message parameter is undefined or an empty string', async () => {
		const badRequestErrorReturnValue = factory.response.badRequestError()
		expect(badRequestErrorReturnValue).toEqual(
			MOCKS.RESPONSE_FACTORY_DEFAULT_BAD_REQUEST_ERROR_RETURN()
		)
	})
	test('It should a response with the expected value with body.message when message parameter is not undefined and not an empty string', async () => {
		const badRequestErrorReturnValue = factory.response.badRequestError(
			MOCKS.RESPONSE_FACTORY_ERROR_MESSAGE()
		)
		expect(badRequestErrorReturnValue).toEqual(
			MOCKS.RESPONSE_FACTORY_BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
		)
	})
})

describe('Given a success call', () => {
	test('It should a response with the expected value with the body with the equivalent parameter value', async () => {
		const successReturnValue = factory.response.success(
			MOCKS.RESPONSE_FACTORY_SUCCESS_BODY_CONTENT()
		)
		expect(successReturnValue).toEqual(MOCKS.RESPONSE_FACTORY_SUCCESS_RETURN())
	})
	test('It should a response with the expected value with the body empty when parameter value is not provided', async () => {
		const successReturnValue = factory.response.success()
		expect(successReturnValue).toEqual(
			MOCKS.RESPONSE_FACTORY_SUCCESS_EMPTY_BODY_RETURN()
		)
	})
})

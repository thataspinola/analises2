const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Given an error call', () => {
	test('It should a response with the expected value without body.message when message parameter is undefined or an empty string', async () => {
		const errorReturnValue = factory.searchProductsControllerResponse.error()
		expect(errorReturnValue).toEqual(
			MOCKS.FACTORY_RESPONSE.DEFAULT_ERROR_RETURN()
		)
	})
	test('It should a response with the expected value with body.message when message parameter is not undefined and not an empty string', async () => {
		const errorReturnValue = factory.searchProductsControllerResponse.error(
			MOCKS.FACTORY_RESPONSE.ERROR_MESSAGE()
		)
		expect(errorReturnValue).toEqual(
			MOCKS.FACTORY_RESPONSE.ERROR_WITH_MESSAGE_RETURN()
		)
	})
})

describe('Given a badRequestError call', () => {
	test('It should a response with the expected value with a default body.message when message parameter is undefined or an empty string', async () => {
		const badRequestErrorReturnValue =
			factory.searchProductsControllerResponse.badRequestError(
				'Requisição inválida'
			)
		expect(badRequestErrorReturnValue).toEqual(
			MOCKS.FACTORY_RESPONSE.DEFAULT_BAD_REQUEST_ERROR_RETURN()
		)
	})
	test('It should a response with the expected value with body.message when message parameter is not undefined and not an empty string', async () => {
		const badRequestErrorReturnValue =
			factory.searchProductsControllerResponse.badRequestError(
				MOCKS.FACTORY_RESPONSE.ERROR_MESSAGE()
			)
		expect(badRequestErrorReturnValue).toEqual(
			MOCKS.FACTORY_RESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
		)
	})
})

describe('Given a success call', () => {
	test('It should a response with the expected value with the body with the equivalent parameter value', async () => {
		const successReturnValue = factory.searchProductsControllerResponse.success(
			MOCKS.FACTORY_RESPONSE.SUCCESS_BODY_CONTENT()
		)
		expect(successReturnValue).toEqual(MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN())
	})
	test('It should a response with the expected value with the body empty when parameter value is not provided', async () => {
		const successReturnValue =
			factory.searchProductsControllerResponse.success()
		expect(successReturnValue).toEqual(
			MOCKS.FACTORY_RESPONSE.SUCCESS_EMPTY_BODY_RETURN()
		)
	})
	test('It should return a response with the default message when message parameter is undefined', async () => {
		const notFoundReturnValue =
			factory.searchProductsControllerResponse.noContent()
		expect(notFoundReturnValue).toEqual({
			statusCode: 204,
			body: {},
		})
	})

	test('It should return a response with the provided message when message parameter is not undefined', async () => {
		const customMessage = 'Custom not found message'
		const notFoundReturnValue =
			factory.searchProductsControllerResponse.noContent(customMessage)
		expect(notFoundReturnValue).toEqual({
			statusCode: 204,
			body: {},
		})
	})
})

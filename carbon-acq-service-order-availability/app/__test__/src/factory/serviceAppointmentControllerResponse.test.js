const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Given an error call', () => {
	test('It should a response with the expected value without body.message when message parameter is undefined or an empty string', async () => {
		const errorReturnValue = factory.requestControllerResponse.error()
		expect(errorReturnValue).toEqual(
			MOCKS.FACTORY_RESPONSE.DEFAULT_ERROR_RETURN()
		)
	})
	test('It should a response with the expected value with body.message when message parameter is not undefined and not an empty string', async () => {
		const errorReturnValue = factory.requestControllerResponse.error(
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
			factory.requestControllerResponse.badRequestError('Requisição inválida')
		expect(badRequestErrorReturnValue).toEqual(
			MOCKS.FACTORY_RESPONSE.DEFAULT_BAD_REQUEST_ERROR_RETURN()
		)
	})
	test('It should a response with the expected value with body.message when message parameter is not undefined and not an empty string', async () => {
		const badRequestErrorReturnValue =
			factory.requestControllerResponse.badRequestError(
				MOCKS.FACTORY_RESPONSE.ERROR_MESSAGE()
			)
		expect(badRequestErrorReturnValue).toEqual(
			MOCKS.FACTORY_RESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
		)
	})
})

describe('Given a success call', () => {
	test('It should a response with the expected value with the body with the equivalent parameter value in the first call', async () => {
		const successReturnValue = factory.requestControllerResponse.success(
			MOCKS.FACTORY_RESPONSE_API.GETPAYLOAD_VALID_RETURN()
		)
		expect(successReturnValue).toEqual(MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN())
	})
	test('It should a response with the expected value with the body with the equivalent parameter value in the second call', async () => {
		const successReturnValue = factory.requestControllerResponse.success(
			MOCKS.FACTORY_RESPONSE_API.GETPAYLOAD_VALID_RETURN()
		)
		expect(successReturnValue).toEqual(MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN())
	})
	test('It should a response with the expected value with the body with the equivalent parameter value', async () => {
		const successReturnValue = factory.requestControllerResponse.success(
			MOCKS.FACTORY_RESPONSE_API.GETPAYLOAD_VALID_RETURN()
		)
		expect(successReturnValue).toEqual(MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN())
	})
	describe('Given a noContent call', () => {
		test('It should return a response with status code 204 and body as null', async () => {
			const noContentMessage = {
				message: 'Nenhuma data retornada',
			}
			const noContentReturnValue =
				factory.requestControllerResponse.noContent(noContentMessage)
			expect(noContentReturnValue).toEqual(
				MOCKS.CONTROLLER_REQUEST.NO_CONTENT_RETURN_CONTROLLER()
			)
		})
	})
})

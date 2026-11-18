const errors = require('../../../../src/error')
const factory = require('../../../../src/factory')

describe('externalApiFactory.js test suite', () => {
	const messageError = 'Test Error'
	const stack = 'stack'

	test('Should return a BadRequest object', () => {
		const ErrorHandlerExpect = new errors.BadRequest({
			code: 400,
			message: messageError,
			stack: stack,
		})

		const error = {
			code: 400,
			message: messageError,
			stack: stack,
		}

		const result = factory.externalApiFactory.externalApiErrorFactory(error)
		expect(result).toEqual(ErrorHandlerExpect)
		expect(result.name).toEqual('BadRequest')
		expect(result.message).toEqual(messageError)
		expect(result.code).toEqual(400)
		expect(result.stack).toEqual(stack)
	})

	test('Should return a NotFoundError object', () => {
		const ErrorHandlerExpect = new errors.NotFoundError({
			code: 404,
			message: messageError,
			stack: stack,
		})

		const error = {
			code: 404,
			message: messageError,
			stack: stack,
		}

		const result = factory.externalApiFactory.externalApiErrorFactory(error)
		expect(result).toEqual(ErrorHandlerExpect)
		expect(result.name).toEqual('NotFoundError')
		expect(result.message).toEqual(messageError)
		expect(result.code).toEqual(404)
		expect(result.stack).toEqual(stack)
	})

	test('Should return an ErrorHandler object', () => {
		const ErrorHandlerExpect = new errors.ExternalApiError({
			code: 500,
			message: messageError,
			stack: stack,
		})

		const error = {
			code: 500,
			message: messageError,
			stack: stack,
		}

		const result = factory.externalApiFactory.externalApiErrorFactory(error)
		expect(result).toEqual(ErrorHandlerExpect)
		expect(result.name).toEqual('ExternalApiError')
		expect(result.message).toEqual(messageError)
		expect(result.code).toEqual(500)
		expect(result.stack).toEqual(stack)
	})
})

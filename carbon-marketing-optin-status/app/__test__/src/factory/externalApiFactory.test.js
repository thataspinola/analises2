const ERROR = require('../../../src/error')
const FACTORY = require('../../../src/factory')

describe('Suite de testes de externalApiFactory.js', () => {
    const messageError = "Test Error"
    const stack = "stack"
    
	test('Deve retornar um objeto BadRequest', () => {
        const externalApiErrorExpect = new ERROR.ExternalApiError.BadRequest({
			code: 400,
			message: messageError,
			stack: stack
		})

        const error = {
			code: 400,
			message: messageError,
			stack: stack
		}

        const result = FACTORY.externalApi.externalApiErrorFactory(error)
		expect(result).toEqual(externalApiErrorExpect)
		expect(result.name).toEqual('BadRequest')
		expect(result.message).toEqual(messageError)
		expect(result.code).toEqual(400)
		expect(result.stack).toEqual(stack)
	})

    test('Deve retornar um objeto NotFoundError', () => {
        const externalApiErrorExpect = new ERROR.ExternalApiError.NotFoundError({
			code: 404,
			message: messageError,
			stack: stack
		})

        const error = {
			code: 404,
			message: messageError,
			stack: stack
		}

        const result = FACTORY.externalApi.externalApiErrorFactory(error)
		expect(result).toEqual(externalApiErrorExpect)
		expect(result.name).toEqual('NotFoundError')
		expect(result.message).toEqual(messageError)
		expect(result.code).toEqual(404)
		expect(result.stack).toEqual(stack)
	})

    test('Deve retornar um objeto ExternalApiError', () => {
        const externalApiErrorExpect = new ERROR.ExternalApiError.ExternalApiError({
			code: 500,
			message: messageError,
			stack: stack
		})

        const error = {
			code: 500,
			message: messageError,
			stack: stack
		}

        const result = FACTORY.externalApi.externalApiErrorFactory(error)
		expect(result).toEqual(externalApiErrorExpect)
		expect(result.name).toEqual('ExternalApiError')
		expect(result.message).toEqual(messageError)
		expect(result.code).toEqual(500)
		expect(result.stack).toEqual(stack)
	})
})

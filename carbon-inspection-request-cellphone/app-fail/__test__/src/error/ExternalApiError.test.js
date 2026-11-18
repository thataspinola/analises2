const errors = require('../../../src/error')

describe('ExternalApiError', () => {
	test('Seve criar uma instância de ExternalApiError com a mensagem e código especificados', () => {
		const message = 'An error occurred'
		const code = 500
		const error = new errors.ExternalApiError(message, code)

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(errors.ExternalApiError)
		expect(error.message).toBe(message)
		expect(error.code).toBe(code)
		expect(error.name).toBe('ExternalApiError')
	})

	test('Deve ter uma pilha de rastreamento', () => {
		const error = new errors.ExternalApiError('Error with stack', 123)
		expect(error.stack).toBeDefined()
	})
})

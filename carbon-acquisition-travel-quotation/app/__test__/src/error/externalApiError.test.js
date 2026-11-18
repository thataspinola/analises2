const CONSTANTS = require('../../../src/property')
const ERROR = require('../../../src/error')

describe('Suite de testes de ExternalApiError.js', () => {
	test('Deve criar uma instância com propriedades padrão', () => {
		const error = new ERROR.ExternalApiError.ExternalApiError({})
		expect(error.name).toBe('ExternalApiError')
		expect(error.message).toBe(CONSTANTS.EXTERNAL_API_ERROR_DEFAULT_MESSAGE)
		expect(error.code).toBeUndefined()
		expect(error.stack).toBeUndefined()
	})

	test('Deve criar uma instância com message, code e stack personalizados', () => {
		const customMessage = 'Custom error message'
		const customCode = 500
		const customStack = 'Custom stack trace'

		const error = new ERROR.ExternalApiError.ExternalApiError({
			code: customCode,
			message: customMessage,
			stack: customStack
		})

		expect(error.message).toBe(customMessage)
		expect(error.code).toBe(customCode)
		expect(error.stack).toBe(customStack)
	})
})

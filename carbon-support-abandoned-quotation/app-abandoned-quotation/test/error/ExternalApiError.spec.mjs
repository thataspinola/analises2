import { describe, test, expect, beforeEach } from 'vitest'
import { createApplication } from '../helpers/application.mjs'
let ExternalApiError, EXTERNAL_API_ERROR_DEFAULT_MESSAGE
beforeEach(() => { const load = createApplication(); ExternalApiError = load('src/error/index.js').ExternalApiError; EXTERNAL_API_ERROR_DEFAULT_MESSAGE = load('src/property/index.js').EXTERNAL_API_ERROR_DEFAULT_MESSAGE })

describe('Suite de testes de ExternalApiError.js', () => {
	test('Deve criar uma instância com propriedades padrão', () => {
		const error = new ExternalApiError()

		expect(error.name).toBe('ExternalApiError')
		expect(error.message).toBe(EXTERNAL_API_ERROR_DEFAULT_MESSAGE)
		expect(error.code).toBeUndefined()
		expect(error.stack).toBeUndefined()
	})

	test('Deve criar uma instância com message, code e stack personalizados', () => {
		const customMessage = 'Custom error message'
		const customCode = 500
		const customStack = 'Custom stack trace'

		const error = new ExternalApiError(customMessage, customCode, customStack)

		expect(error.message).toBe(customMessage)
		expect(error.code).toBe(customCode)
		expect(error.stack).toBe(customStack)
	})
})

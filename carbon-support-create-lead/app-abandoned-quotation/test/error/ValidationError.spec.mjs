import { describe, test, expect, beforeEach } from 'vitest'
import { createApplication } from '../helpers/application.mjs'
let ValidationError
beforeEach(() => { ValidationError = createApplication()('src/error/index.js').ValidationError })

describe('Suite de testes de ValidationError.js', () => {
	test('Deve criar uma instância de ValidationError com as propriedades corretas', () => {
		const message = 'Test error message'
		const error = new ValidationError(message)

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(ValidationError)
		expect(error.message).toBe(message)
		expect(error.name).toBe('ValidationError')
		expect(error.code).toBe(400)
	})
})

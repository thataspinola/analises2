const errors = require('../../../src/error')

describe('Suite de testes de ValidationError.js', () => {
	test('Deve criar uma instância do ValidationError com a mensagem correta', () => {
		const testMessage = 'Test error message'
		const error = new errors.ValidationError(testMessage)

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(errors.ValidationError)
		expect(error.message).toBe(testMessage)
		expect(error.name).toBe('ValidationError')
	})

	test('Deve ter uma pilha de rastreamento', () => {
		const error = new errors.ValidationError('Test error message')

		expect(error.stack).toBeDefined()
	})
})

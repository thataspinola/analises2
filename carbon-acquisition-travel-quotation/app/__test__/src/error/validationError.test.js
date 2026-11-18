const ERROR = require('../../../src/error')

describe('Suite de testes de ValidationError.js', () => {
	test('Deve criar uma instância de ValidationError com as propriedades corretas', () => {
		const message = 'Test error message'
		const error = new ERROR.ValidationError(message)

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(ERROR.ValidationError)
		expect(error.message).toBe(message)
		expect(error.name).toBe('ValidationError')
		expect(error.code).toBe(400)
	})
})

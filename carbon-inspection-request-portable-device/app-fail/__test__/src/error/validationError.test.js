const errors = require('../../../src/error')

describe('Suite de testes de validationApiError.js', () => {
	test('Deve ter o nome ValidationError.', () => {
		const validationErrorInstance = new errors.ValidationError()
		expect(validationErrorInstance.name).toEqual('ValidationError')
	})
})

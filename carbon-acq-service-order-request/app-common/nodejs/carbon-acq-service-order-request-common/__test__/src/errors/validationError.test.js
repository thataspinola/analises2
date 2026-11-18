const { ValidationError } = require('../../../src/errors')

describe('Given an ValidationError instance', () => {
	test('It should have ValidationError name', () => {
		const validationErrorInstance = new ValidationError()
		expect(validationErrorInstance.name).toEqual('ValidationError')
	})
})

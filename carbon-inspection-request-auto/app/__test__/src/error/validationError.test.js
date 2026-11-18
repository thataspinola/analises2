const errors = require('../../../src/error')

describe('Test suite for the validationError.js.', () => {
	test('It should have ValidationError name', () => {
		const validationErrorInstance = new errors.ValidationError()
		expect(validationErrorInstance.name).toEqual('ValidationError')
	})
})

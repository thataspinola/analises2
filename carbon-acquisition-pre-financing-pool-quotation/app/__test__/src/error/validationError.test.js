const errors = require('../../../src/error')

describe('Given an ValidationError instance', () => {
	test('It should have ValidationError name', () => {
		const validationErrorInstance = new errors.ValidationError()
		expect(validationErrorInstance.name).toEqual('ValidationError')
	})
})

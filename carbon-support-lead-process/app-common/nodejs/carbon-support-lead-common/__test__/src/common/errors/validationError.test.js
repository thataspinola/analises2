const { ValidationError } = require('../../../../src/common/errors')

describe('Given an ValidationError instance', () => {
	test('It should have ValidationError name', () => {
		const validationErrorInstance = new ValidationError()
		expect(validationErrorInstance.name).toEqual('ValidationError')
	})
})

const errors = require('../../../../src/error')
const MOCKS = require('../../mocks/index.mock')

describe('ValidationError.js tests suite', () => {
	test('Should create an instance of ValidationError with the correct properties', () => {
		const error = new errors.ValidationError(
			MOCKS.VALIDATION_ERROR_MOCKS.MESSAGE()
		)

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(errors.ValidationError)
		expect(error.message).toBe(MOCKS.VALIDATION_ERROR_MOCKS.MESSAGE())
		expect(error.name).toBe('ValidationError')
		expect(error.code).toBe(400)
	})
})

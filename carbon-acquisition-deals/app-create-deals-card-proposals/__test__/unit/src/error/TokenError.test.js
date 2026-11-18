const errors = require('../../../../src/error')
const CONSTANTS = require('../../../../src/property')
const MOCKS = require('../../mocks/index.mock')

describe('TokenError.js tests suite', () => {
	test('Should create an instance of TokenError with the correct properties', () => {
		const error = new errors.TokenError()

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(errors.TokenError)
		expect(error.message).toBe(CONSTANTS.TOKEN_ERROR_DEFAULT_MESSAGE)
		expect(error.name).toBe('TokenError')
		expect(error.code).toBe(500)
	})
})

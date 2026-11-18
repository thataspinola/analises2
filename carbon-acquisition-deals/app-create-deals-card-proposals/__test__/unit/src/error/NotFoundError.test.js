const errors = require('../../../../src/error')
const CONSTANTS = require('../../../../src/property')
const MOCKS = require('../../mocks/index.mock')

describe('NotFoundError.js tests suite', () => {
	test('Should create an instance of NotFoundError with the correct properties', () => {
		const error = new errors.NotFoundError(
			MOCKS.NOT_FOUND_ERROR_MOCKS.CUSTOM_ERROR()
		)

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(errors.NotFoundError)
		expect(error.message).toBe(MOCKS.NOT_FOUND_ERROR_MOCKS.CUSTOM_MESSAGE())
		expect(error.name).toBe('NotFoundError')
		expect(error.code).toBe(MOCKS.NOT_FOUND_ERROR_MOCKS.CUSTOM_CODE())
		expect(error.stack).toBe(MOCKS.NOT_FOUND_ERROR_MOCKS.CUSTOM_STACK_TRACE())
	})
	test('Should create an instance of NotFoundError with the correct properties when there is no message', () => {
		const error = new errors.NotFoundError({})

		expect(error).toBeInstanceOf(Error)
		expect(error).toBeInstanceOf(errors.NotFoundError)
		expect(error.message).toBe(CONSTANTS.NOT_FOUND_ERROR_DEFAULT_MESSAGE)
		expect(error.name).toBe('NotFoundError')
	})
})

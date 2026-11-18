const errors = require('../../../../src/error')
const CONSTANTS = require('../../../../src/property')
const MOCKS = require('../../mocks/index.mock')

describe('ExternalApiError.js tests suite', () => {
	test('Should create an instance with default properties', () => {
		const error = new errors.ExternalApiError({})
		expect(error.name).toBe('ExternalApiError')
		expect(error.message).toBe(CONSTANTS.EXTERNAL_API_ERROR_DEFAULT_MESSAGE)
		expect(error.code).toBeUndefined()
		expect(error.stack).toBeUndefined()
	})

	test('Should create an instance with custom message, code, and stack', () => {
		const error = new errors.ExternalApiError({
			message: MOCKS.EXTERNAL_API_ERROR_MOCKS.CUSTOM_MESSAGE,
			code: MOCKS.EXTERNAL_API_ERROR_MOCKS.CUSTOM_CODE,
			stack: MOCKS.EXTERNAL_API_ERROR_MOCKS.CUSTOM_STACK_TRACE,
		})

		expect(error.message).toBe(MOCKS.EXTERNAL_API_ERROR_MOCKS.CUSTOM_MESSAGE)
		expect(error.code).toBe(MOCKS.EXTERNAL_API_ERROR_MOCKS.CUSTOM_CODE)
		expect(error.stack).toBe(MOCKS.EXTERNAL_API_ERROR_MOCKS.CUSTOM_STACK_TRACE)
	})
})

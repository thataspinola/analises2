const errors = require('../../../src/error')
const CONSTANT = require('../../../src/property')
describe('Given an ExternalApiError instance', () => {
	test('It should have ExternalApiError name with default message', () => {
		const errorInstance = new errors.ExternalApiError()
		expect(errorInstance.name).toEqual('ExternalApiError')
		expect(errorInstance.message).toEqual(
			CONSTANT.EXTERNAL_API_ERROR_DEFAULT_MESSAGE
		)
	})
	test('It should have ExternalApiError name with custom message', () => {
		const customErrorMessage = 'This is a custom error message'
		const errorInstance = new errors.ExternalApiError(customErrorMessage)
		expect(errorInstance.name).toEqual('ExternalApiError')
		expect(errorInstance.message).toEqual(customErrorMessage)
	})
})

const errors = require('../../../src/error')
const CONSTANT = require('../../../src/property')

describe('Given an ExternalApiError instance', () => {
	test('It should have ExternalApiError name', () => {
		const validationErrorInstance = new errors.ExternalApiError()
		expect(validationErrorInstance.name).toEqual('ExternalApiError')
	})
	test('It should have ExternalApiError default message', () => {
		const validationErrorInstance = new errors.ExternalApiError()
		expect(validationErrorInstance.message).toEqual(
			CONSTANT.EXTERNAL_API_ERROR_DEFAULT_MESSAGE
		)
	})
	test('It should have ExternalApiError received message', () => {
		const validationErrorInstance = new errors.ExternalApiError(
			'Some specific set error message'
		)
		expect(validationErrorInstance.message).toEqual(
			'Some specific set error message'
		)
	})
})

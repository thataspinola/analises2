const errors = require('../../../src/error')
const CONSTANT = require('../../../src/property')

describe('Suite de testes de externalApiError.js', () => {
	test('Deve ter o nome ExternalApiError', () => {
		const validationErrorInstance = new errors.ExternalApiError()
		expect(validationErrorInstance.name).toEqual('ExternalApiError')
	})

	test('Deveria ter a mensagem padrão ExternalApiError', () => {
		const validationErrorInstance = new errors.ExternalApiError()
		expect(validationErrorInstance.message).toEqual(
			CONSTANT.EXTERNAL_API_ERROR_DEFAULT_MESSAGE
		)
	})

	test('Deveria ter recebido a mensagem ExternalApiError', () => {
		const validationErrorInstance = new errors.ExternalApiError(
			'Some specific set error message'
		)
		expect(validationErrorInstance.message).toEqual(
			'Some specific set error message'
		)
	})
})

const FACTORY = require('../../../src/factory')
const MOCKS = require('./../../mocks/src/factory/axiosReponseErrorDataFactory.mock')
describe('Suite de testes de axiosResponseErrorData.js', () => {
	test('Deve lidar com erros com um objeto de resposta', () => {
		const result = FACTORY.axiosResponseErrorData(MOCKS.ERROR_NOT_FOULD())
		expect(result).toEqual(MOCKS.RESPONSE_NOT_FOULD())
	})

	test('Deve lidar com os dados de resposta do erro se for um objeto', () => {
		const result = FACTORY.axiosResponseErrorData(MOCKS.ERROR_BAD_REQUEST())
		expect(result).toEqual(MOCKS.RESPONSE_BAD_REQUEST())
	})

	test('Deve lidar com erros sem response, mas com um request', () => {
		const result = FACTORY.axiosResponseErrorData(MOCKS.ERROR_TIMEOUT())
		expect(result).toEqual(MOCKS.REPONSE_TIMEOUT())
	})

	test('Deve lidar com erros sem response ou request', () => {
		const result = FACTORY.axiosResponseErrorData(MOCKS.ERROR_UNKNOWN())
		expect(result).toEqual(MOCKS.RESPONSE_UNKNOWN())
	})
})

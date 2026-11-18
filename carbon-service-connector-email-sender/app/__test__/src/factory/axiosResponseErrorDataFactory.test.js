const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Suite de teste de factory axiosResponseErrorDataFactory.js', () => {
	describe('Dada uma chamada para o metodo getErrorData', () => {
		test('Deve retornar um objeto com status 500 e detalhes do response de erro quando houver a propriedade response no objeto de erro recebido', () => {
			expect(
				factory.axiosResponseErrorData.getErrorData(
					MOCKS.GETERRORDATA_RESPONSE_ERROR_WITHRESPONSE_VALID_INPUT()
				)
			).toEqual(MOCKS.GETERRORDATA_REQUESTERROR_VALID_RETURN())
		})
		test('Deve retornar um objeto com status 500 e indicar que não houve resposta quando não houver a propriedade response e houver a propriedade request no objeto de erro recebido', () => {
			expect(
				factory.axiosResponseErrorData.getErrorData(
					MOCKS.GETERRORDATA_RESPONSE_ERROR_WITHREQUEST_VALID_INPUT()
				)
			).toEqual(MOCKS.GETERRORDATA_NORESPONSE_VALID_RETURN())
		})
		test('Deve retornar um objeto com status 500 e a mensagem do erro quando não houver nem a propriedade response e nem a propriedade request no objeto de erro recebido', () => {
			expect(
				factory.axiosResponseErrorData.getErrorData(
					MOCKS.GETERRORDATA_RESPONSE_ERROR_UNEXPECTED_VALID_INPUT()
				)
			).toEqual(MOCKS.GETERRORDATA_UNEXPECTED_VALID_RETURN())
		})
	})
})

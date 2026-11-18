const MOCKS = require('../../mocks/index.mock')
const factory = require('../../../src/factory')

describe('Suite de testes de axiosHandlerErrorFactory.js', () => {
	describe('Dada uma chamada ao método `getErrorData`', () => {
		test('Deve retornar um objeto com status 500 e detalhes do response de erro quando houver a propriedade response no objeto de erro recebido', () => {
			expect(
				factory.axiosHandlerError.getErrorData(
					MOCKS.FACTORY_AXIOS_HANDLER_ERROR.VALID_INPUT_WITH_RESPONSE_ERROR()
				)
			).toEqual(
				MOCKS.FACTORY_AXIOS_HANDLER_ERROR.VALID_RETURN_WITH_REQUEST_ERROR()
			)
		})

		test('Deve retornar um objeto com status 500 e indicar que não houve resposta quando não houver a propriedade response e houver a propriedade request no objeto de erro recebido', () => {
			expect(
				factory.axiosHandlerError.getErrorData(
					MOCKS.FACTORY_AXIOS_HANDLER_ERROR.VALID_INPUT_WITH_REQUEST_ERROR()
				)
			).toEqual(
				MOCKS.FACTORY_AXIOS_HANDLER_ERROR.VALID_RETURN_WITH_NO_RESPONSE()
			)
		})

		test('Deve retornar um objeto com status 500 e a mensagem do erro quando não houver nem a propriedade response e nem a propriedade request no objeto de erro recebido', () => {
			expect(
				factory.axiosHandlerError.getErrorData(
					MOCKS.FACTORY_AXIOS_HANDLER_ERROR.VALID_INPUT_WITH_UNEXPECTED_ERROR()
				)
			).toEqual(
				MOCKS.FACTORY_AXIOS_HANDLER_ERROR.VALID_RETURN_WITH_UNEXPECTED_ERROR()
			)
		})
	})
})

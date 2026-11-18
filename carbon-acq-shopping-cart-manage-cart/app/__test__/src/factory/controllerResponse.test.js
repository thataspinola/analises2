const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('ProposalServicesControllerResponse', () => {
	test('Deve retornar a resposta de criação de um novo carrinho (NEW_CART)', () => {
		const responseController =
			MOCKS.FACTORY_API_COMMERCE_MAGENTO_PORTO_CARTGRAPHQLAPIRESPONSE.PAYLOAD_RETURN()

		const response = factory.controllerResponse.success(responseController)
		expect(response).toEqual(
			MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_EMPTY_CART_RETURN()
		)
	})
	test('Deve retornar uma resposta de erro com mensagem ao chamar a função error', () => {
		const response = factory.controllerResponse.error('Some error message')
		expect(response).toEqual(
			MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN(
				'Some error message'
			)
		)
	})

	test('Deve retornar uma resposta de erro sem mensagem ao chamar a função error', () => {
		const response = factory.controllerResponse.error()
		expect(response).toEqual(
			MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITHOUT_MESSAGE_RETURN()
		)
	})

	test('Deve retornar uma resposta de Bad Request ao chamar a função badRequestError', () => {
		const response =
			factory.controllerResponse.badRequestError('Some error message')
		expect(response).toEqual(
			MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
		)
	})
})

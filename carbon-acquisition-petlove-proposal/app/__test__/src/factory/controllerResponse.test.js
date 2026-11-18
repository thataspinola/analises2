const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')
const CONSTANT = require('../../../src/property')

describe('ProposalServicesControllerResponse', () => {
	test('It should an error function should return error response with message', () => {
		const response = factory.controllerResponse.error('Some error message')
		expect(response).toEqual(
			MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN()
		)
	})

	test('It should an error function should return error response without message', () => {
		const response = factory.controllerResponse.error()
		expect(response).toEqual(
			MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITHOUT_MESSAGE_RETURN()
		)
	})

	test('It should a badRequestError function should return bad request response', () => {
		const response =
			factory.controllerResponse.badRequestError('Some error message')
		expect(response).toEqual(
			MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
		)
	})

	test('It should a successProposal function should return success proposal response', () => {
		const urlCartRedirect =
			MOCKS.FACTORY_CONTROLLERRESPONSE.VALID_URL_CART_REDIRECT()
		const commerceCartId =
			MOCKS.FACTORY_CONTROLLERRESPONSE.CREATECART_VALID_RETURN()
		const commerceQuotationId =
			MOCKS.FACTORY_CONTROLLERRESPONSE.QUOTATION_VALID_RETURN()
		const createLeadData =
			MOCKS.API_SUPPORTCREATELEAD.POSTCREATELEAD_VALID_RETURN_TEMP()
		const proposalData =
			MOCKS.FACTORY_CONTROLLERRESPONSE.PROPOSAL_VALID_RETURN()

		const response = factory.controllerResponse.success(
			urlCartRedirect,
			commerceCartId,
			commerceQuotationId,
			createLeadData,
			proposalData
		)
		expect(response).toEqual(
			MOCKS.FACTORY_CONTROLLERRESPONSE.CONTROLLER_SUCCESS_RETURN()
		)
	})
})

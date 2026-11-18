const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('ProposalServicesControllerResponse', () => {
	test('It should an error function should return error response with message', () => {
		const response = factory.controllerResponse.error({
			code: 500,
			codeError: 'ex01',
			name: 'ExternalApiError',
			message: 'Some error message',
			stack: 'AxiosError: Request failed with status code 500',
		})
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
		const response = factory.controllerResponse.success(
			MOCKS.FACTORY_CONTROLLER_REQUEST_PROCESSEDRETURNPAYLOAD.PAYLOAD_RETURN()
		)
		expect(response).toEqual(
			MOCKS.FACTORY_CONTROLLERRESPONSE.CONTROLLER_SUCCESS_RETURN()
		)
	})
	test('It should a successProposal function should return success proposal response with a new schedule data', () => {
		const orderBookData =
			MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKRESPONSEPAYLOAD.PAYLOAD_RETURN()

		const response = factory.controllerResponse.newSchedule(orderBookData)
		expect(response).toEqual(
			MOCKS.FACTORY_CONTROLLERRESPONSE.CONTROLLER_SUCCESS_NEW_SCHEDULE_RETURN()
		)
	})
})

const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')
describe('createServiceOrderDataRequest', () => {
	test('It should return correct structure with all fields', () => {
		const createServiceOrderDataRequest =
			MOCKS.FACTORY_CONTROLLER_CREATESERVICEORDERDATAREQUEST.PARSEDSQSMESSAGE_VALID_INPUT()

		const createServiceOrderResponse =
			MOCKS.API_HUBVENDASCARBON_CREATE_SERVICE_ORDER.SUCCESS_RESPONSE_DATA()

		const getPayloadExpectedReturn =
			MOCKS.FACTORY_CONTROLLER_CREATESERVICEORDERDATAREQUEST.VALID_RETURN()

		const getPayloadReturn =
			factory.controller.createServiceOrderDataRequest.getPayload(
				createServiceOrderDataRequest,
				createServiceOrderResponse
			)
		expect(getPayloadReturn).toEqual(getPayloadExpectedReturn)
	})
})

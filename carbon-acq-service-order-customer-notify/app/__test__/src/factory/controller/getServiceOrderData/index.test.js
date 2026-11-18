const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')
describe('getServiceOrderData', () => {
	test('It should return correct structure', () => {
		const parsedCustomerNotifyPayload =
			MOCKS.FACTORY_CONTROLLER_GETSERVICEORDERDATA.GETPAYLOAD_PARSEDSNSSQSMESSAGE_VALID_INPUT()

		const getPayloadExpectedReturn =
			MOCKS.FACTORY_CONTROLLER_GETSERVICEORDERDATA.GETPAYLOAD_VALID_RETURN()

		const getPayloadReturn = factory.controller.getServiceOrderData.getPayload(
			parsedCustomerNotifyPayload
		)
		expect(getPayloadReturn).toEqual(getPayloadExpectedReturn)
	})
})

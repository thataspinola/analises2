const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')
describe('getUpdateCustomerNotify', () => {
	test('It should return correct structure with all fields', () => {
		const parsedCustomerNotifyPayload =
			MOCKS.FACTORY_CONTROLLER_SETSERVICEORDERCUSTOMERNOTIFYDATA.GETPAYLOAD_PARSEDSNSSQSMESSAGE_VALID_INPUT()

		const getPayloadExpectedReturn =
			MOCKS.FACTORY_CONTROLLER_SETSERVICEORDERCUSTOMERNOTIFYDATA.GETPAYLOAD_VALID_RETURN()

		const getPayloadReturn =
			factory.controller.setServiceOrderCustomerNotifyData.getPayload(
				parsedCustomerNotifyPayload
			)
		expect(getPayloadReturn).toEqual(getPayloadExpectedReturn)
	})
})

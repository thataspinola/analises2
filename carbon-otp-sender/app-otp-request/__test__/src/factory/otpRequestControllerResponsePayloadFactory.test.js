const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Given an getPayload call', () => {
	test('It should a response with the expected value', async () => {
		const returnValue = factory.otpRequestControllerResponsePayload.getPayload(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_EMAIL_INPUT()
		)
		expect(returnValue).toEqual(
			MOCKS.FACTORY_OTPREQUESTCONTROLLERRESPONSEPAYLOAD_GETPAYLOAD_VALID_RETURN()
		)
	})
})

const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('Given an getPayload call', () => {
	test('It should a response with the expected value', async () => {
		const returnValue =
			factory.corporativo.smsservice.sendSmsPayload.getPayload(
				MOCKS.FACTORY_CORPORATIVO_SMSSERVICE_SENDSMSPAYLOAD_GETPAYLOAD_CELLPHONE_INPUT(),
				MOCKS.FACTORY_CORPORATIVO_SMSSERVICE_SENDSMSPAYLOAD_GETPAYLOAD_OTPCODE_INPUT()
			)
		expect(returnValue).toEqual(
			MOCKS.FACTORY_CORPORATIVO_SMSSERVICE_SENDSMSPAYLOAD_GETPAYLOAD_RETURN()
		)
	})
})

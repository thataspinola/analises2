const factory = require('../../../../../../../../src/factory')
const MOCKS = require('../../../../../../../mocks/index.mock')

describe('getPayload', () => {
	test('should return when all values are valid', () => {
		const input =
			MOCKS.FACTORY_API_ASSISTENCIA_WEBHOOK_OSCHASSI_CHECKINOSAPI_POSTCHECKINOSPAYLOAD.GETPAYLOAD_PARSEDSNSMESSAGEPAYLOAD_VALID_INPUT()
		const expectedOutput =
			MOCKS.FACTORY_API_ASSISTENCIA_WEBHOOK_OSCHASSI_CHECKINOSAPI_POSTCHECKINOSPAYLOAD.GETPAYLOAD_EXPECTEDOUPUT()
		expect(
			factory.api.asssitencia.webhook.oschassi.checkinOsApi.postCheckinOsPayload.getPayload(
				input
			)
		).toEqual(expectedOutput)
	})
	test('should return expected response number property with "0" when receives streetNumber = ""', () => {
		const input =
			MOCKS.FACTORY_API_ASSISTENCIA_WEBHOOK_OSCHASSI_CHECKINOSAPI_POSTCHECKINOSPAYLOAD.GETPAYLOAD_PARSEDSNSMESSAGEPAYLOAD_EMPTYSTREETNUMBER_VALID_INPUT()
		const expectedOutput =
			MOCKS.FACTORY_API_ASSISTENCIA_WEBHOOK_OSCHASSI_CHECKINOSAPI_POSTCHECKINOSPAYLOAD.GETPAYLOAD_EMPTY_STREETNUMBER_EXPECTEDOUPUT()
		expect(
			factory.api.asssitencia.webhook.oschassi.checkinOsApi.postCheckinOsPayload.getPayload(
				input
			)
		).toEqual(expectedOutput)
	})
})

const factory = require('../../../../src/factory')
const MOCKS = require('../../../mocks/index.mock')

describe('Given an getSendConsentMessagePayload call', () => {
	test('It should a response with the expected value', async () => {
		const returnValue = factory.sns.consents.getSendConsentMessagePayload(
			MOCKS.FACTORY_SNS_CONSENTS.GETSENDCONSENTMESSAGEPAYLOAD_CLIENTDATA_INPUT(),
			MOCKS.FACTORY_SNS_CONSENTS.GETSENDCONSENTMESSAGEPAYLOAD_MARKETINGOPTOUTFLAG_INPUT(),
			MOCKS.FACTORY_SNS_CONSENTS.GETSENDCONSENTMESSAGEPAYLOAD_PRODUCT_INPUT(),
			MOCKS.FACTORY_SNS_CONSENTS.GETSENDCONSENTMESSAGEPAYLOAD_PESCOD_INPUT()
		)
		expect(returnValue).toEqual(
			MOCKS.FACTORY_SNS_CONSENTS.GETSENDCONSENTMESSAGEPAYLOAD_VALID_RETURN()
		)
	})
})

describe('Given an getSendConsentMessageAttributes call', () => {
	test('It should a response with the expected value', async () => {
		const returnValue = factory.sns.consents.getSendConsentMessageAttributes(
			MOCKS.FACTORY_SNS_CONSENTS.GETSENDCONSENTMESSAGEATTRIBUTES_PESCOD_INPUT()
		)
		expect(returnValue).toEqual(
			MOCKS.FACTORY_SNS_CONSENTS.GETSENDCONSENTMESSAGEATTRIBUTES_VALID_RETURN()
		)
	})
})

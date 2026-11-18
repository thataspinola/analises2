const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

describe('Given an getPayload call', () => {
	test('It should a response with the expected value', async () => {
		const getPayloadReturnValue =
			factory.seguranca.corporativa.portocom.geraTokenAaPayload.getPayload(
				MOCKS.FACTORY_SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAAPAYLOAD_GETPAYLOAD_VALID_CPF_INPUT()
			)
		expect(getPayloadReturnValue).toEqual(
			MOCKS.FACTORY_SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAAPAYLOAD_GETPAYLOAD_VALID_RETURN()
		)
	})
})

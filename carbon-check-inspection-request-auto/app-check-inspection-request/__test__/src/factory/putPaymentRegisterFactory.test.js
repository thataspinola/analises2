const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Given an getPayload call', () => {
	test('It should a response with the expected value', async () => {
		const returnValue =
			factory.putPaymentRegister.getPayload(
				MOCKS.PUT_PAYMENT_REGISTER_FACTORY.GETPAYLOAD_PAYMENTREADYSTATUS_INPUT(),
				MOCKS.PUT_PAYMENT_REGISTER_FACTORY.GETPAYLOAD_TRANSACTIONID_INPUT(),
				MOCKS.PUT_PAYMENT_REGISTER_FACTORY.GETPAYLOAD_PROPOSALID_INPUT(),
				MOCKS.PUT_PAYMENT_REGISTER_FACTORY.GETPAYLOAD_PROPOSALORIGIN_INPUT()
			)
		expect(returnValue).toEqual(
			MOCKS.PUT_PAYMENT_REGISTER_FACTORY.GETPAYLOAD_PAYMENTREADY_VALID_RETURN()
		)
	})
})

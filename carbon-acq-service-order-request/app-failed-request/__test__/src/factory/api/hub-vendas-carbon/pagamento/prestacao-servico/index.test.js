const factory = require('../../../../../../../src/factory')
const MOCKS = require('../../../../../../mocks/index.mock')
describe('getPayload', () => {
	test('It should return correct structure with all fields', () => {
		const parsedSnsMessagePayload =
			MOCKS.FACTORY_API_HUBVENDASCARBON_PAYMENT_SERVICE_PROVISION_CHECKOUT.PARSEDSQSMESSAGEPAYLOAD_VALID_INPUT()
				.transactionId

		const getPayloadExpectedReturn =
			MOCKS.FACTORY_API_HUBVENDASCARBON_PAYMENT_SERVICE_PROVISION_CHECKOUT.VALID_RETURN()

		const getPayloadReturn =
			factory.api.hubVendasCarbon.pagamento.prestacaoServico.paymentCheckout.getPayload(
				parsedSnsMessagePayload
			)
		expect(getPayloadReturn).toEqual(getPayloadExpectedReturn)
	})
})

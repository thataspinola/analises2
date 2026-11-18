const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')
describe('getPayload', () => {
	test('should return a payload object with the correct values', () => {
		const result =
			factory.automovel.propostaCriticasApi.postPagamentoCheckoutPayload.getPayload(
				MOCKS.FACTORY_AUTOMOVEL_PROPOSTA_CRITICAS_POSTPAGAMENTOCHECKOUTPAYLOAD.GETPAYLOAD_PARSEDSQSMESSAGE_INPUT()
			)
		expect(typeof result).toBe('object')
		expect(result).toEqual(
			MOCKS.FACTORY_AUTOMOVEL_PROPOSTA_CRITICAS_POSTPAGAMENTOCHECKOUTPAYLOAD.GETPAYLOAD_VALID_RETURN()
		)
	})
})

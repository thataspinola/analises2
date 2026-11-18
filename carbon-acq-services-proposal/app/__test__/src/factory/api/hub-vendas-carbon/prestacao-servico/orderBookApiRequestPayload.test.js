const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

describe('getRequestPayload', () => {
	test('It should return the correct payload for valid input', () => {
		const inputData = MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()

		const expectedPayload =
			MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKREQUESTPAYLOAD.PAYLOAD_RETURN()

		expect(
			factory.api.hubVendasCarbon.prestacaoServico.orderBookApiRequestPayload.getRequestPayload(
				inputData
			)
		).toEqual(expectedPayload)
	})

	test('It should throw an error for missing serviceProvision', () => {
		expect(() =>
			factory.api.hubVendasCarbon.prestacaoServico.orderBookApiRequestPayload.getRequestPayload(
				MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKREQUESTPAYLOAD.PAYLOAD_INPUTDATA_MISSING_SERVICEPROVISION()
			)
		).toThrow()
	})
})

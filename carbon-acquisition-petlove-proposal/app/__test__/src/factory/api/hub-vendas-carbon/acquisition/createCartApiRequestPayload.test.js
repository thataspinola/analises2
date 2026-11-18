const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

describe('getRequestPayload', () => {
	test('It should return the correct payload for valid input', () => {
		const inputData = MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()

		const expectedPayload =
			MOCKS.FACTORY_API_HUBVENDASCARBON_ACQUISITION_CREATECARTREQUESTPAYLOAD.PAYLOAD_RETURN()

		expect(
			factory.api.hubVendasCarbon.acquisition.cartCheckoutApiRequest.getRequestPayload(
				inputData
			)
		).toEqual(expectedPayload)
	})
})

const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

describe('getRequestPayload', () => {
	test('It should return the correct response payload for valid input', () => {
		const input = MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()

		const expectedOutput =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD.REQUEST_PAYLOAD_EXPECTED_OUTPUTVALID()

		expect(
			factory.api.commerce.porto.commerceQuotationApiRequestPayload.getRequestPayload(
				input
			)
		).toEqual(expectedOutput)
	})
})

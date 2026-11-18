const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

describe('getRequestPayload', () => {
	test('It should return the correct response payload for valid input', () => {
		const input =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD.PAYLOAD_VALID_INPUT()

		const expectedOutput =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD.PAYLOAD_EXPECTED_OUTPUTVALID()

		expect(
			factory.api.commerce.porto.commerceQuotationApiRequestPayload.getRequestPayload(
				input
			)
		).toEqual(expectedOutput)
	})
	test('It should handle empty payment methods gracefully', () => {
		const input =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD.PAYLOAD_EMPTY_PAYMENTMETHODS_INPUT()

		const expectedOutput =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD.PAYLOAD_EXPECTED_OUTPUTEMPTY()

		expect(
			factory.api.commerce.porto.commerceQuotationApiRequestPayload.getRequestPayload(
				input
			)
		).toEqual(expectedOutput)
	})
	test('It should return the correct response payload with different final values', () => {
		const input =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD.PAYLOAD_DIFFERENTFINAL_VALUE_INPUT()

		const expectedOutput =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD.PAYLOAD_EXPECTED_OUTPUT_DIFFERENT_FINAL_VALUE()

		expect(
			factory.api.commerce.porto.commerceQuotationApiRequestPayload.getRequestPayload(
				input
			)
		).toEqual(expectedOutput)
	})

	test('It should correctly set result.quotation.porto_service.is_recommendation = true to the payload', () => {
		const input =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD.PAYLOAD_VALID_INPUT()

		const isRecommendation = true

		const result =
			factory.api.commerce.porto.commerceQuotationApiRequestPayload.getRequestPayload(
				input,
				isRecommendation
			)

		expect(result.quotation.porto_service.is_recommendation).toEqual(true)
	})
})

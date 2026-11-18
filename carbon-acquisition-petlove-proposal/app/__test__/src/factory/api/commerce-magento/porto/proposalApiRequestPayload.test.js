const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

describe('getRequestPayload', () => {
	test('It should return the correct payload structure', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_INPUT()
				.parsedInputData

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const expectedPayload =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_RESPONSE()

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				leadData
			)
		expect(result).toEqual(expectedPayload)
	})

	test('It should handle empty input data gracefully', () => {
		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_INPUT()
					.parsedInputData,
				null,
				undefined,
				{}
			)

		expect(result).toEqual({
			proposal: {
				scope: 'petlove',
				petlove: expect.any(Object),
			},
		})
	})

	test('It should correctly use lead values when primary values are missing', () => {
		const parsedInputData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_INPUT()
				.parsedInputData

		parsedInputData.brokerName = ''
		parsedInputData.brokerPhone = null
		delete parsedInputData.brokerEmail
		delete parsedInputData.susepCode

		const commerceQuotationId =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_INPUT()
				.commerceQuotationId

		const leadData =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_INPUT()
				.leadData

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				leadData
			)

		const expectedPayload =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_WITH_LEAD_BROKERDATA_RESPONSE()

		expect(result).toEqual(expectedPayload)
	})

	test('It should maintain correct structure even with missing nested objects', () => {
		const { parsedInputData, commerceQuotationId } =
			MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.COMMERCEPROPOSALAPI_REQUEST_PAYLOAD_PROPOSALDATA_INPUT()

		const result =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				parsedInputData,
				commerceQuotationId,
				{}
			)

		expect(result).toHaveProperty('proposal.petlove')
		expect(result.proposal.petlove).toHaveProperty('client')
		expect(result.proposal.petlove).toHaveProperty('quotation_token')
		expect(result.proposal.petlove).toHaveProperty('lead_identifier')
	})
})

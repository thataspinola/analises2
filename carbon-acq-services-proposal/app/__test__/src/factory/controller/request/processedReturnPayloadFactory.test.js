const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('getPayload', () => {
	test('It should return the correct payload for valid input', () => {
		const inputData =
			MOCKS.FACTORY_CONTROLLER_REQUEST_PROCESSEDRETURNPAYLOAD.PAYLOAD_INPUT()

		const expectedPayload =
			MOCKS.FACTORY_CONTROLLER_REQUEST_PROCESSEDRETURNPAYLOAD.PAYLOAD_RETURN()

		expect(
			factory.controller.request.processedReturnPayload.getPayload(
				inputData.urlCartRedirect,
				inputData.commerceCartId,
				inputData.commerceQuotationId,
				inputData.pricingData,
				inputData.createLeadData,
				inputData.proposalData,
				inputData.orderBookData
			)
		).toEqual(expectedPayload)
	})
})

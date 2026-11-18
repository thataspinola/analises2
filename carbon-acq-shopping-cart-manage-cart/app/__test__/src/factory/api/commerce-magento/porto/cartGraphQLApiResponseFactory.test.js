const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

describe('getRequestPayload', () => {
	test('It should return the correct payload for valid input', () => {
		const inputData =
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_EXISTING_CART_ID()
				.createEmptyCart

		const expectedPayload =
			MOCKS.FACTORY_API_COMMERCE_MAGENTO_PORTO_CARTGRAPHQLAPIRESPONSE.PAYLOAD_RETURN()

		expect(
			factory.api.commerceMagento.porto.cartGraphQLApiResponse.getRequestPayload(
				inputData
			)
		).toEqual(expectedPayload)
	})
})

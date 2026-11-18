const { cartFactory } = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('getRequestPayload', () => {
	test('It should return the correct payload for valid input', () => {
		const inputData = MOCKS.VALID_INPUT_DATA_PARSED

		const expectedPayload = MOCKS.CARTFACTORY_PAYLOAD_RETURN()

		expect(cartFactory.getRequestPayload(inputData)).toEqual(expectedPayload)
	})

	test('It should map commerceCustomerToken to customerToken', () => {
		const inputData = {
			auto: {
				shoppingToken: 'SHOPPING_TOKEN',
				commerceCustomerToken: 'COMMERCE_CUSTOMER_TOKEN',
			},
		}

		expect(cartFactory.getRequestPayload(inputData)).toEqual({
			cartCommerceId: 'SHOPPING_TOKEN',
			customerToken: 'COMMERCE_CUSTOMER_TOKEN',
		})
	})
})

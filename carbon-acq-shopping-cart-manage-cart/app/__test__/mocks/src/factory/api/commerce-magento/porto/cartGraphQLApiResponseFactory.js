const MOCKS = require('../../../../../index.mock')

exports.PAYLOAD_INPUT = () => {
	return MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_NEW_CART_ID()
}

exports.PAYLOAD_RETURN = () => {
	return {
		cartId:
			MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_NEW_CART_ID()
				.createEmptyCart,
	}
}

const MOCKS = require('../../../../../index.mock')

exports.PAYLOAD_INPUT = () => {
	return MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
}

exports.PAYLOAD_RETURN = () => {
	return {
		cartCommerceId: MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
			.cartCommerceId
			? MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT().cartCommerceId
			: '',
		customerToken: MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
			.customerCommerceToken
			? MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT().customerCommerceToken
			: '',
	}
}

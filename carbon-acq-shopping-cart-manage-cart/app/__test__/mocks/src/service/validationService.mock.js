const CONSTANT = require('../../../../src/property')

exports.VALID_INPUT_DATA = () => {
	return {
		cartCommerceId: 'uqkCA0rycsCTpItqWHmOv9tWXP3E8p17',
		customerToken: '',
	}
}

exports.VALID_INPUT_DATA_WITH_CUSTOMER_TOKEN = () => {
	return {
		cartCommerceId: '',
		customerToken: 'exampleCustomerToken',
	}
}

exports.VALIDATION_SCHEMA = () => {
	return CONSTANT.INPUT_DATA_SCHEMA
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	return {}
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'cartCommerceId'
}

exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		cartCommerceId: 1234,
		customerToken: '',
	}
}

exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'cartCommerceId'
}

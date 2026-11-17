const MOCKS = require('../../index.mock')
const CONSTANT = require('../../../../src/property')

exports.VALID_INPUT_DATA = () => {
	return MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
}
exports.VALIDATION_SCHEMA = () => {
	return CONSTANT.REQUEST_SCHEMA
}

exports.INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	return {}
}
exports.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'latitude'
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		latitude: 12345,
		longitude: '-46.633308',
	}
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'latitude'
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	return {
		latitude: '',
		longitude: '-46.633308',
	}
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'latitude'
}
exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY = () => {
	return {
		latitude: '999',
		longitude: '-46.633308',
	}
}
exports.INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME = () => {
	return 'latitude'
}
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	return {
		latitude: 'invalid-lat',
		longitude: '-46.633308',
	}
}
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'latitude'
}

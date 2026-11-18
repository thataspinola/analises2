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
	return 'can not determine property'
}

exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		inspectionKey: 123,
	}
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'inspectionKey'
}

exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	return {
		...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
		inspectionPhotos: {
			...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
				.objectNameWithExtension,
		},
	}
}
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'inspectionPhotos'
}

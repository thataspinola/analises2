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
	return 'capsCodes'
}

exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
		dateAvailability: 1234,
	}
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'dateAvailability'
}

exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	return {
		...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
		address: {
			...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT().address,
			stateCode: 'SPX',
		},
	}
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'stateCode'
}

exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	return {
		...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT(),
		client: {
			...MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT().client,
			email: 'not-an-email',
		},
	}
}
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'email'
}

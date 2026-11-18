exports.PROPERTY = require('./src/property/index.mock')

exports.RESPONSE_FACTORY_DEFAULT_ERROR_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}
}

const RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT = 'Some error message'

exports.RESPONSE_FACTORY_ERROR_MESSAGE = () => {
	return RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT
}

exports.RESPONSE_FACTORY_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT,
		},
	}
}

exports.RESPONSE_FACTORY_DEFAULT_BAD_REQUEST_ERROR_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: 'The supplied request body is invalid',
		},
	}
}

exports.RESPONSE_FACTORY_BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			status: 'error',
			message: RESPONSE_FACTORY_ERROR_MESSAGE_CONTENT,
		},
	}
}

const RESPONSE_FACTORY_SUCCESS_BODY_CONTENT_VALUE = {
	something: 'somevalue',
}

exports.RESPONSE_FACTORY_SUCCESS_BODY_CONTENT = () => {
	return RESPONSE_FACTORY_SUCCESS_BODY_CONTENT_VALUE
}

exports.RESPONSE_FACTORY_SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: RESPONSE_FACTORY_SUCCESS_BODY_CONTENT_VALUE,
	}
}

exports.RESPONSE_FACTORY_SUCCESS_EMPTY_BODY_RETURN = () => {
	return {
		statusCode: 200,
		body: {},
	}
}

exports.VALIDATION_SERVICE_VALID_INPUT_DATA = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'some@domainemail.com',
		channel: 'Channel 1',
	}
}
exports.VALIDATION_SERVICE_SCHEMA = () => {
	return {
		type: 'object',
		properties: {
			fullName: { type: 'string' },
			cellPhone: { type: 'string', minLength: 10 },
			email: { type: 'string', format: 'email' },
			channel: {
				enum: ['Channel 1', 'Channel 2'],
			},
		},
		required: ['fullName', 'cellPhone', 'email', 'channel'],
	}
}
exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'some@domainemail.com',
	}
}
exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'channel'
}
exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: false,
		email: 'some@domainemail.com',
		channel: 'Channel 1',
	}
}
exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'cellPhone'
}
exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '123',
		email: 'some@domainemail.com',
		channel: 'Channel 1',
	}
}
exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'cellPhone'
}
exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'some@domainemail.com',
		channel: 'Channel 3',
	}
}
exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_VALUE_PROPERTY_NAME =
	() => {
		return 'channel'
	}
exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
	return {
		fullName: 'Nomenelson Sobrenomelense',
		cellPhone: '11987456322',
		email: 'somedomainemail.com',
		channel: 'Channel 1',
	}
}
exports.VALIDATION_SERVICE_INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME =
	() => {
		return 'email'
	}

exports.CPFVALIDATION_SERVICE_VALID_CPF = () => {
	return '06963752060'
}

exports.CPFVALIDATION_SERVICE_VALID_CPF_SHORT = () => {
	return '6963752060'
}

exports.CPFVALIDATION_SERVICE_INVALID_CPF_BOTH_VERIFICATION_DIGITS = () => {
	return '6963752099'
}

exports.CPFVALIDATION_SERVICE_INVALID_CPF_UNIT_VERIFICATION_DIGIT = () => {
	return '6963752068'
}

exports.CPFVALIDATION_SERVICE_INVALID_CPF_SIZE = () => {
	return '123456789010'
}

exports.CNPJVALIDATION_SERVICE_VALID_CNPJ = () => {
	return '29259881000141'
}

exports.CNPJVALIDATION_SERVICE_INVALID_CNPJ_BOTH_VERIFICATION_DIGITS = () => {
	return '29259881000187'
}

exports.CNPJVALIDATION_SERVICE_INVALID_CNPJ_UNIT_VERIFICATION_DIGIT = () => {
	return '29259881000144'
}

exports.CNPJVALIDATION_SERVICE_INVALID_CNPJ_SIZE = () => {
	return '292598810001418'
}

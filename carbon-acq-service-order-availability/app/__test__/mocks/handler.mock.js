const MOCKS = require('./index.mock')

exports.VALID_INPUT_PAYLOAD = () => {
	return {
		body: JSON.stringify(MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()),
	}
}
exports.INVALID_INPUT_BODY_PAYLOAD = () => {
	return {
		body: {
			city: 'Santa Luzia',
			stateCode: 'MG',
			specialtyCode: '44',
			latitude: -16.3655573,
			longitude: -46.8938834,
			originCode: '9',
			companyCode: '1',
			sourceSystemCode: '17',
		},
	}
}
exports.INVALID_INPUT_PAYLOAD = () => {
	return {
		body: JSON.stringify(MOCKS.CONTROLLER_REQUEST.INVALID_PARSEDJSON_INPUT()),
	}
}

exports.INVALID_INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT = () => {
	return {
		body: '{ invalid: "JSON" }',
	}
}

exports.SUCCESS_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify(MOCKS.FACTORY_RESPONSE_API.GETPAYLOAD_VALID_RETURN()),
	}
}

exports.BADREQUEST_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 400,
		body: JSON.stringify(
			MOCKS.FACTORY_RESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT()
		),
	}
}

exports.INTERNALERROR_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 500,
		body: JSON.stringify(
			MOCKS.FACTORY_RESPONSE.ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT()
		),
	}
}

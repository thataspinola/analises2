const MOCKS = require('./index.mock')

exports.VALID_INPUT_PAYLOAD = () => {
	return {
		queryStringParameters: { inspectionKey: '123' },
	}
}

exports.INVALID_INPUT_BODY_PAYLOAD = () => {
	return {
		body: MOCKS.CONTROLLER_REQUEST.PROCESS_INVALID_PARSEDJSON_INPUT(),
	}
}

exports.INVALID_INPUT_PAYLOAD = () => {
	return {
		queryStringParameters: { teste: '123' }
	}
}

exports.INVALID_INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT = () => {
	return {
		queryStringParameters: '{ invalid: "JSON" }',
	}
}

exports.SUCCESS_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_RETURN().statusCode,
		body: JSON.stringify(MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_RETURN().body),
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

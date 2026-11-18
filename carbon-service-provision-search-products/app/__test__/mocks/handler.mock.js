const MOCKS = require('./index.mock')

exports.POST_VALID_INPUT_PAYLOAD = () => {
	return {
		httpMethod: 'POST',
		body: JSON.stringify({
			type: 'categories',
			value: 'destaques',
		}),
	}
}

exports.GET_VALID_INPUT_PAYLOAD = () => {
	return {
		httpMethod: 'GET',
		queryStringParameters: {
			type: 'categories',
			value: 'destaques'
		}
	}
}

exports.INVALID_METHOD_PAYLOAD = () => {
	return {
		httpMethod: 'DELETE',
		body: JSON.stringify({
			type: 'categories',
			value: '',
		}),
	}
}

exports.INVALID_JSON_PAYLOAD = () => {
	return {
		httpMethod: 'POST',
		body: 'invalid json',
	}
}

exports.SUCCESS_RETURN = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 200,
		body: JSON.stringify(MOCKS.FACTORY_RESPONSE.SUCCESS_BODY_CONTENT()),
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

exports.UNSUPPORTED_METHOD_RESPONSE = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 400,
		body: JSON.stringify({
			status: 'error',
			message: 'Unsupported HTTP method',
		}),
	}
}

exports.INVALID_JSON_RESPONSE = () => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 400,
		body: JSON.stringify({
			status: 'error',
			message: 'Invalid JSON format',
		}),
	}
}

exports.INTERNAL_ERROR_RESPONSE = (errorMessage) => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: 500,
		body: JSON.stringify({
			status: 'error',
			message: errorMessage,
		}),
	}
}

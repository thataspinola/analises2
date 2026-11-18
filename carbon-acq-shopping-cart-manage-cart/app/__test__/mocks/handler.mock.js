const MOCKS = require('./index.mock')

exports.VALID_INPUT_PAYLOAD_POST = () => ({
	httpMethod: 'POST',
	body: JSON.stringify(MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()),
	queryStringParameters: null,
})

exports.VALID_INPUT_PAYLOAD_GET = () => ({
	httpMethod: 'GET',
	body: null,
	queryStringParameters:
		MOCKS.CONTROLLER_REQUEST.VALID_GET_CART_QUERY_PARAMS_INPUT(),
})

exports.VALID_INPUT_PAYLOAD_GET_WITHOUT_TOKEN = () => ({
	httpMethod: 'GET',
	body: null,
	queryStringParameters:
		MOCKS.CONTROLLER_REQUEST.VALID_GET_CART_WITHOUT_TOKEN_QUERY_PARAMS_INPUT(),
})

exports.VALID_INPUT_PAYLOAD_DELETE = () => ({
	httpMethod: 'DELETE',
	body: null,
	queryStringParameters:
		MOCKS.CONTROLLER_REQUEST.VALID_DELETE_CART_ITEM_QUERY_PARAMS_INPUT(),
})

exports.VALID_INPUT_PAYLOAD_DELETE_WITHOUT_TOKEN = () => ({
	httpMethod: 'DELETE',
	body: null,
	queryStringParameters:
		MOCKS.CONTROLLER_REQUEST.VALID_DELETE_CART_ITEM_WITHOUT_TOKEN_QUERY_PARAMS_INPUT(),
})

exports.INVALID_INPUT_BODY_PAYLOAD = () => ({
	httpMethod: 'POST',
	body: MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT(),
	queryStringParameters: null,
})

exports.INVALID_INPUT_PAYLOAD_POST = () => ({
	httpMethod: 'POST',
	body: JSON.stringify({
		...MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT(),
		cartCommerceId: undefined,
	}),
	queryStringParameters: null,
})

exports.INVALID_INPUT_PAYLOAD_GET_MISSING_CART_ID = () => ({
	httpMethod: 'GET',
	body: null,
	queryStringParameters: {
		customerToken: 'some-token-for-get',
	},
})

exports.INVALID_INPUT_PAYLOAD_DELETE_MISSING_CART_ID = () => ({
	httpMethod: 'DELETE',
	body: null,
	queryStringParameters: {
		cartItemUid: 'some-uid-for-delete',
		customerToken: 'some-token-for-delete',
	},
})

exports.INVALID_INPUT_PAYLOAD_DELETE_MISSING_ITEM_UID = () => ({
	httpMethod: 'DELETE',
	body: null,
	queryStringParameters: {
		cartCommerceId: 'some-cart-id-for-delete',
		customerToken: 'some-token-for-delete',
	},
})

exports.INVALID_INPUT_PAYLOAD_WITH_INVALID_JSON_FORMAT = () => ({
	httpMethod: 'POST',
	body: "{ invalid: 'JSON' ",
	queryStringParameters: null,
})

exports.INVALID_INPUT_PAYLOAD_WITH_NON_STRING_BODY = () => ({
	httpMethod: 'POST',
	body: { invalid: 'data' },
	queryStringParameters: null,
})

exports.UNSUPPORTED_HTTP_METHOD_PAYLOAD = () => ({
	httpMethod: 'PUT',
	body: JSON.stringify(MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()),
	queryStringParameters: null,
})

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' }

exports.SUCCESS_RETURN_NEW_CART = () => ({
	isBase64Encoded: false,
	headers: DEFAULT_HEADERS,
	statusCode: 200,
	body: JSON.stringify(
		MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_EMPTY_CART_RETURN().body
	),
})

exports.SUCCESS_RETURN_EXISTING_CART = () => ({
	isBase64Encoded: false,
	headers: DEFAULT_HEADERS,
	statusCode: 200,
	body: JSON.stringify(
		MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_FETCH_CART_RETURN().body
	),
})

exports.SUCCESS_RETURN_ASSIGNED_CUSTOMER = () => ({
	isBase64Encoded: false,
	headers: DEFAULT_HEADERS,
	statusCode: 200,
	body: JSON.stringify(
		MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_ASSIGN_CUSTOMER_BODY_RETURN().body
	),
})

exports.SUCCESS_RETURN_GET_CART = () => ({
	isBase64Encoded: false,
	headers: DEFAULT_HEADERS,
	statusCode: 200,
	body: JSON.stringify(
		MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_GET_CART_RETURN().body
	),
})

exports.SUCCESS_RETURN_DELETE_ITEM = () => ({
	isBase64Encoded: false,
	headers: DEFAULT_HEADERS,
	statusCode: 200,
	body: JSON.stringify(
		MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_DELETE_ITEM_RETURN().body
	),
})

exports.BADREQUEST_RETURN = (message) => ({
	isBase64Encoded: false,
	headers: DEFAULT_HEADERS,
	statusCode: 400,
	body: JSON.stringify(
		MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN(
			message
		).body
	),
})

exports.INTERNALERROR_RETURN = (message) => ({
	isBase64Encoded: false,
	headers: DEFAULT_HEADERS,
	statusCode: 500,
	body: JSON.stringify(
		MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN(message).body
	),
})

exports.METHOD_NOT_SUPPORTED_RETURN = (method) => ({
	isBase64Encoded: false,
	headers: DEFAULT_HEADERS,
	statusCode: 400,
	body: JSON.stringify(
		MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_METHOD_NOT_SUPPORTED_RETURN(
			method
		).body
	),
})

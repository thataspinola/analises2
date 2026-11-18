const MOCKS = require('../../index.mock')

const ERROR_MESSAGE_CONTENT = 'Some error message'

exports.DEFAULT_ERROR_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}
}

exports.ERROR_MESSAGE = () => {
	return ERROR_MESSAGE_CONTENT
}

exports.ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT = (message) => {
	return {
		status: 'error',
		message: message,
	}
}

exports.ERROR_WITH_MESSAGE_RETURN = (message) => {
	return {
		statusCode: 500,
		body: this.ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT(message),
	}
}

exports.ERROR_WITHOUT_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: { status: 'error' },
	}
}

exports.DEFAULT_BAD_REQUEST_ERROR_RETURN = () => {
	return {
		statusCode: 400,
		body: {
			message: 'Requisição inválida',
		},
	}
}

exports.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT = (message) => {
	return {
		message: message,
	}
}

exports.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN = (
	message = ERROR_MESSAGE_CONTENT
) => {
	return {
		statusCode: 400,
		body: this.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT(message),
	}
}

exports.BAD_REQUEST_ERROR_METHOD_NOT_SUPPORTED_RETURN_BODY_CONTENT = (
	method
) => {
	return {
		message: `Método HTTP não suportado: ${method}`,
	}
}

exports.BAD_REQUEST_ERROR_METHOD_NOT_SUPPORTED_RETURN = (method) => {
	return {
		statusCode: 400,
		body: this.BAD_REQUEST_ERROR_METHOD_NOT_SUPPORTED_RETURN_BODY_CONTENT(
			method
		),
	}
}

exports.SUCCESS_EMPTY_CART_RETURN = () => {
	return {
		statusCode: 200,
		body: MOCKS.FACTORY_API_COMMERCE_MAGENTO_PORTO_CARTGRAPHQLAPIRESPONSE.PAYLOAD_RETURN(),
	}
}

exports.SUCCESS_FETCH_CART_RETURN = () => {
	return {
		statusCode: 200,
		body: MOCKS.FACTORY_API_COMMERCE_MAGENTO_PORTO_CARTGRAPHQLAPIRESPONSE.PAYLOAD_RETURN(),
	}
}

exports.SUCCESS_ASSIGN_CUSTOMER_BODY_RETURN = () => {
	return {
		statusCode: 200,
		body: MOCKS.FACTORY_API_COMMERCE_MAGENTO_PORTO_CARTGRAPHQLAPIRESPONSE.PAYLOAD_RETURN(),
	}
}

exports.SUCCESS_GET_CART_RETURN = () => {
	return {
		statusCode: 200,
		body: MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.VALID_GET_CART_RETURN(),
	}
}

exports.SUCCESS_DELETE_ITEM_RETURN = () => {
	return {
		statusCode: 200,
		body: MOCKS.API_COMMERCEMAGENTO_PORTO_CREATECART.EXPECTED_CART_AFTER_ITEM_REMOVAL(),
	}
}

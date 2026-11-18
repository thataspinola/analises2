const MOCKS = require('../../index.mock')

const VALID_EMPTY_PARSEDJSON_INPUT_VALUE = {
	cartCommerceId: '',
	customerToken: '',
}

const VALID_PARSEDJSON_INPUT_VALUE = {
	cartCommerceId: 'vuZZJ7BBTzyoNbhiIf60mlA7zzWg2trG',
	customerToken:
		'eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjIyMDEsInV0eXBpZCI6MywiaWF0IjoxNzQ4Mjg4NTM4LCJleHAiOjE3NDgyOTIxMzh9.jSGBtc2Oigg5iGsa63KHczkigY3Q1viCScPuEL0lSRs',
}

const VALID_WITHOUT_CUSTOMERTOKEN_PARSEDJSON_INPUT_VALUE = {
	cartCommerceId: 'uqkCA0rycsCTpItqWHmOv9tWXP3E8p17',
	customerToken: '',
}

const VALID_WITHOUT_CARTCOMMERCEID_PARSEDJSON_INPUT_VALUE = {
	cartCommerceId: '',
	customerToken: 'uqkCA0rycsCTpItqWHmOv9tWXP3E8p17',
}

const VALID_GET_CART_PARSEDJSON_INPUT_VALUE = {
	cartCommerceId: 'get-test-cart-id',
	customerToken: 'get-test-customer-token',
}

const VALID_DELETE_CART_ITEM_PARSEDJSON_INPUT_VALUE = {
	cartCommerceId: 'delete-test-cart-id',
	cartItemUid: 'delete-test-item-uid',
	customerToken: 'delete-test-customer-token',
}

const VALID_GET_CART_WITHOUT_TOKEN_PARSEDJSON_INPUT_VALUE = {
	cartCommerceId: 'get-guest-cart-id',
	customerToken: '',
}

const VALID_DELETE_CART_ITEM_WITHOUT_TOKEN_PARSEDJSON_INPUT_VALUE = {
	cartCommerceId: 'delete-guest-cart-id',
	cartItemUid: 'delete-guest-item-uid',
	customerToken: '',
}

const VALID_GET_CART_QUERY_PARAMS_INPUT_VALUE = {
	cartCommerceId: 'get-test-cart-id',
	customerToken: 'get-test-customer-token',
}

const VALID_DELETE_CART_ITEM_QUERY_PARAMS_INPUT_VALUE = {
	cartCommerceId: 'delete-test-cart-id',
	cartItemUid: 'delete-test-item-uid',
	customerToken: 'delete-test-customer-token',
}

const VALID_GET_CART_WITHOUT_TOKEN_QUERY_PARAMS_INPUT_VALUE = {
	cartCommerceId: 'get-guest-cart-id',
	customerToken: '',
}

const VALID_DELETE_CART_ITEM_WITHOUT_TOKEN_QUERY_PARAMS_INPUT_VALUE = {
	cartCommerceId: 'delete-guest-cart-id',
	cartItemUid: 'delete-guest-item-uid',
	customerToken: '',
}

exports.INVALID_PARSEDJSON_INPUT = () => {
	return {
		teste: 'fake teste',
	}
}

exports.EXCEPTION_SIMULATE_VALID_PARSEDJSON_INPUT = () => {
	const payload = { ...VALID_PARSEDJSON_INPUT_VALUE }
	payload.cartCommerceId = 'Except'
	return payload
}

exports.EXCEPTION_SIMULATE_MESSAGE = () => {
	return `Erro recebido da chamada da API: código '500' dados: '{ "message": "Simulação de falha" }'`
}

exports.VALID_EMPTY_PARSEDJSON_INPUT = () => {
	return VALID_EMPTY_PARSEDJSON_INPUT_VALUE
}

exports.VALID_PARSEDJSON_INPUT = () => {
	return VALID_PARSEDJSON_INPUT_VALUE
}

exports.VALID_WITHOUT_CUSTOMERTOKEN_PARSEDJSON_INPUT = () => {
	return VALID_WITHOUT_CUSTOMERTOKEN_PARSEDJSON_INPUT_VALUE
}

exports.VALID_WITHOUT_CARTCOMMERCEID_PARSEDJSON_INPUT = () => {
	return VALID_WITHOUT_CARTCOMMERCEID_PARSEDJSON_INPUT_VALUE
}

exports.VALID_GET_CART_PARSEDJSON_INPUT = () => {
	return VALID_GET_CART_PARSEDJSON_INPUT_VALUE
}

exports.VALID_DELETE_CART_ITEM_PARSEDJSON_INPUT = () => {
	return VALID_DELETE_CART_ITEM_PARSEDJSON_INPUT_VALUE
}

exports.VALID_GET_CART_WITHOUT_TOKEN_PARSEDJSON_INPUT = () => {
	return VALID_GET_CART_WITHOUT_TOKEN_PARSEDJSON_INPUT_VALUE
}

exports.VALID_DELETE_CART_ITEM_WITHOUT_TOKEN_PARSEDJSON_INPUT = () => {
	return VALID_DELETE_CART_ITEM_WITHOUT_TOKEN_PARSEDJSON_INPUT_VALUE
}

exports.INVALID_CART_ID_MESSAGE = () => {
	return 'ID do carrinho é obrigatório para consultar.'
}

exports.INVALID_CART_ITEM_UID_MESSAGE = () => {
	return 'ID do carrinho e UID do item são obrigatórios para remover.'
}

exports.METHOD_NOT_SUPPORTED_MESSAGE = (method) => {
	return `Método HTTP não suportado: ${method}`
}

exports.INVALID_JSON_INPUT_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento: Validation'
}

exports.UNEXPECTED_INPUT_VALIDATION_EXCEPTION_MESSAGE = () => {
	return 'Erro no processamento: Unexpected validation error'
}

exports.VALID_RETURN_NEW_CART = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_EMPTY_CART_RETURN()
}

exports.VALID_RETURN_EXISTING_CART = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_FETCH_CART_RETURN()
}

exports.VALID_RETURN_ASSIGNED_CUSTOMER = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_ASSIGN_CUSTOMER_BODY_RETURN()
}

exports.VALID_RETURN_GET_CART = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_GET_CART_RETURN()
}

exports.VALID_RETURN_DELETED_ITEM = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.SUCCESS_DELETE_ITEM_RETURN()
}

exports.INTERNALERROR_RETURN = (message) => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.ERROR_WITH_MESSAGE_RETURN(message)
}

exports.BADREQUEST_RETURN = () => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
}

exports.BAD_REQUEST_METHOD_NOT_SUPPORTED_RETURN = (method) => {
	return MOCKS.FACTORY_CONTROLLERRESPONSE.BAD_REQUEST_ERROR_METHOD_NOT_SUPPORTED_RETURN(
		method
	)
}

exports.GENERIC_EXCEPTION_MESSAGE_BEGINNING = (errorMessage) => {
	return `Erro no processamento: ${errorMessage}`
}

exports.VALID_GET_CART_QUERY_PARAMS_INPUT = () => {
	return VALID_GET_CART_QUERY_PARAMS_INPUT_VALUE
}

exports.VALID_DELETE_CART_ITEM_QUERY_PARAMS_INPUT = () => {
	return VALID_DELETE_CART_ITEM_QUERY_PARAMS_INPUT_VALUE
}

exports.VALID_GET_CART_WITHOUT_TOKEN_QUERY_PARAMS_INPUT = () => {
	return VALID_GET_CART_WITHOUT_TOKEN_QUERY_PARAMS_INPUT_VALUE
}

exports.VALID_DELETE_CART_ITEM_WITHOUT_TOKEN_QUERY_PARAMS_INPUT = () => {
	return VALID_DELETE_CART_ITEM_WITHOUT_TOKEN_QUERY_PARAMS_INPUT_VALUE
}

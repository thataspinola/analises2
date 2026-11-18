const MOCKS = require('../../index.mock')
const CONSTANT = require('../../../../src/property')

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

const ERROR_WITH_MESSAGE_RETURN_BODY_VALUE = {
	status: 'error',
	message: ERROR_MESSAGE_CONTENT,
}

exports.ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT = () => {
	return ERROR_WITH_MESSAGE_RETURN_BODY_VALUE
}

exports.ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: ERROR_WITH_MESSAGE_RETURN_BODY_VALUE,
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

const BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_VALUE = {
	message: ERROR_MESSAGE_CONTENT,
}

exports.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_CONTENT = () => {
	return BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_VALUE
}

exports.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 400,
		body: BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN_BODY_VALUE,
	}
}

exports.CONTROLLER_SUCCESS_RETURN = () => {
	return {
		statusCode: 200,
		body: {
			urlCartRedirect: this.VALID_URL_CART_REDIRECT(),
			cartCommerceId: this.CREATECART_VALID_RETURN(),
			quotationCommerceId: this.QUOTATION_VALID_RETURN(),
			...MOCKS.API_SUPPORTCREATELEAD.POSTCREATELEAD_VALID_RETURN_TEMP(),
			proposalData: this.PROPOSAL_VALID_RETURN(),
		},
	}
}

exports.SUCCESS_EMPTY_BODY_RETURN = () => {
	return {
		statusCode: 200,
		body: {},
	}
}

exports.CREATECART_VALID_RETURN = () => {
	return CREATECART_VALID_RETURN_VALUE
}

const CREATECART_VALID_RETURN_VALUE = 'tokenCommerceCreateCartGeneration'

exports.QUOTATION_VALID_RETURN = () => {
	return QUOTATION_VALID_RETURN_VALUE
}

const QUOTATION_VALID_RETURN_VALUE = 'tokenCommerceQuotationGeneration'

exports.PROPOSAL_VALID_RETURN = () => {
	return [
		{
			message: 'Success',
		},
	]
}

exports.VALID_URL_CART_REDIRECT = () => {
	return 'url_cart_redirect'
}

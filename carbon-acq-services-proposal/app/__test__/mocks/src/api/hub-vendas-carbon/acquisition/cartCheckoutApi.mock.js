const MOCKS = require('../../../../index.mock')

const VALID_RETURN_VALUE = {
	cartId: 'tokenCommerceCreateCartGeneration',
}

exports.AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: VALID_RETURN_VALUE,
	}
}

const INVALID_RETURN_VALUE = {
	message: 'Error message',
}

exports.AXIOS_INVALID_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: INVALID_RETURN_VALUE,
	}
}

exports.VALID_PAYLOAD_INPUT = () => {
	return MOCKS.FACTORY_API_HUBVENDASCARBON_SUPPORT_CREATELEADAPIREQUESTPAYLOAD.PAYLOAD_RETURN()
}

exports.VALID_RETURN = () => {
	return VALID_RETURN_VALUE
}

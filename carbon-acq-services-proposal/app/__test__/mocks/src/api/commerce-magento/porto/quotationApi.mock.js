const MOCKS = require('../../../../index.mock')

const VALID_RETURN_VALUE = 'tokenCommerceQuotationGeneration'

exports.AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: [
			{
				token: 'tokenCommerceQuotationGeneration',
			},
		],
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
	return MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_QUOTATIONAPIREQUESTPAYLOAD.PAYLOAD_EXPECTED_OUTPUTVALID()
}

exports.VALID_RETURN = () => {
	return VALID_RETURN_VALUE
}

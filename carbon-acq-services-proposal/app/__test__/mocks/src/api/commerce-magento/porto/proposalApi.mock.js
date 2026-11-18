const MOCKS = require('../../../../index.mock')

const VALID_RETURN_VALUE = [
	{
		message: 'Success',
	},
]

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

exports.VALID_PAYLOAD_INPUT = () => ({
	commerceProposalPayload:
		MOCKS.FACTORY_API_COMMERCEMAGENTO_PORTO_PROPOSALAPIREQUESTPAYLOAD.PAYLOAD_PROPOSALDATA_RESPONSE(),
	cartId: MOCKS.API_HUBVENDASCARBON_ACQUISITION_CARTCHECKOUT.VALID_RETURN(),
	customerToken:
		MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT().customerCommerceToken,
})

exports.VALID_RETURN = () => {
	return VALID_RETURN_VALUE
}

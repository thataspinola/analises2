const MOCKS = require('../../index.mock')

exports.VALID_INPUT_REQUEST = () => {
	return MOCKS.VALID_INPUT_DATA
}

exports.VALID_INPUT_DATA_WITH_CUPOM = () => {
	return {
		...MOCKS.VALID_INPUT_DATA,
		portableDevice: {
			...MOCKS.VALID_INPUT_DATA.portableDevice,
			coupon: 'TESTE',
		},
	}
}

exports.PROCESS_BADREQUEST_RETURN = () => {
	return MOCKS.FACTORY_RESPONSEFACTORY.BAD_REQUEST_ERROR_WITH_MESSAGE_RETURN()
}

exports.PROCESS_ERROR_WITH_MESSAGE_RETURN = () => {
	return {
		statusCode: 500,
		body: {
			status: 'error',
			message: 'error message',
		},
	}
}

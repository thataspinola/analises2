const MOCKS = require('../../../../../index.mock')

const SUCCESS_RESPONSE_DATA_VALUE = {
	serviceOrderNumber: '12345-24',
	contingencyService: '0',
	execution: {
		message: 'Sucesso!',
		status: '0',
	},
}

exports.SUCCESS_RESPONSE_DATA = () => {
	return SUCCESS_RESPONSE_DATA_VALUE
}
exports.VALID_PAYLOAD = () => {
	return MOCKS.FACTORY_API_CREATESERVICEORDERDATA.VALID_RETURN()
}
exports.VALID_RETURN = () => {
	return SUCCESS_RESPONSE_DATA_VALUE
}

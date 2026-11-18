const MOCKS = require('../../../../index.mock')

const VALID_RETURN_VALUE = {
	brokerEmail: 'corretor@email.com',
	brokerPhone: '(XX)XX-XXXXXXXX',
	idLead: '1b2bc46f-5428-4073-aa43-709624594e48',
	pescod: 82624114,
	brokerName: 'Corretor da Silva',
	susepCode: 'CMERRJ',
	vdoCode: '1739915904443',
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

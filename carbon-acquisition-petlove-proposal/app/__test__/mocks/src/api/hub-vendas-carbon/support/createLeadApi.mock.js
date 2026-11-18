const MOCKS = require('../../../../index.mock')

const POSTCREATELEAD_VALID_RETURN_VALUE = {
	brokerEmail: 'teste@aguiacorretagem.com.br',
	brokerPhone: '11923932393',
	idLead: '1b2bc46f-5428-4073-aa43-709624594e48',
	pescod: 82624114,
	brokerName: 'Corretor da Silva',
	susepCode: 'CM056J',
	vdoCode: '1739915904443',
}

const POSTCREATELEAD_VALID_RETURN_VALUE_TEMP = {
	brokerEmail: 'diamante@aguiacorretagem.com.br',
	brokerPhone: '11923932393',
	idLead: '1b2bc46f-5428-4073-aa43-709624594e48',
	pescod: 82624114,
	brokerName: 'Corretor da Silva',
	susepCode: 'CM056J',
	vdoCode: '1739915904443',
}

exports.POSTCREATELEAD_AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: POSTCREATELEAD_VALID_RETURN_VALUE,
	}
}

const POSTCREATELEAD_INVALID_RETURN_VALUE = {
	message: 'Error message',
}

exports.POSTCREATELEAD_AXIOS_INVALID_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: POSTCREATELEAD_INVALID_RETURN_VALUE,
	}
}

exports.POSTCREATELEAD_VALID_PAYLOAD_INPUT = () => {
	return MOCKS.FACTORY_API_HUBVENDASCARBON_SUPPORT_CREATELEADAPIREQUESTPAYLOAD.CREATELEADAPI_REQUEST_PAYLOAD_RETURN()
}

exports.POSTCREATELEAD_VALID_RETURN = () => {
	return POSTCREATELEAD_VALID_RETURN_VALUE
}

exports.POSTCREATELEAD_VALID_RETURN_TEMP = () => {
	return POSTCREATELEAD_VALID_RETURN_VALUE_TEMP
}

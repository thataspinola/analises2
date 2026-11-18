const MOCKS = require('../../../../../index.mock')

const VALID_RETURN_VALUE = [
	{
		data: '2025-06-02',
		diaSemana: 'Segunda-feira',
	},
	{
		data: '2025-06-03',
		diaSemana: 'Terça-feira',
	},
	{
		data: '2025-06-04',
		diaSemana: 'Quarta-feira',
	}
]

exports.AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: VALID_RETURN_VALUE,
	}
}

exports.VALID_PAYLOAD_INPUT = () => {
	return {
		inputData:
			MOCKS.FACTORY_API_SERVICO_RESOLVE_APPOINTMENT_SERVICE_V1_APPOINTMENTSERVICEREQUEST.GETPAYLOAD_PARSEDJSON_VALID_INPUT(),
		token: MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN().mulesoftToken,
		certificate: MOCKS.CONTROLLER_REQUEST.API_GATEWAY_TOKEN().ca,
	}
}

exports.VALID_RETURN = () => {
	return VALID_RETURN_VALUE
}

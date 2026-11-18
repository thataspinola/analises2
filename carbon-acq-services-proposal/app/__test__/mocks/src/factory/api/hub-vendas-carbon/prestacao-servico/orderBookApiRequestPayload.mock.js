const MOCKS = require('../../../../../index.mock')

exports.PAYLOAD_INPUT = () => {
	return MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT()
}

exports.PAYLOAD_RETURN = () => {
	return {
		scheduleType: 'agendamento-programado',
		serviceDateTime: '02/11/2024 12:00',
		city: 'São Paulo',
		stateCode: 'SP',
		latitude: -23.514836,
		longitude: -46.3746187,
		specialtyCode: '437',
		originCode: '9',
		problemCode: '586',
	}
}

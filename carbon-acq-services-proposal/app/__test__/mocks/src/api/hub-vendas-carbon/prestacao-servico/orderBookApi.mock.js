const MOCKS = require('../../../../index.mock')

exports.VALID_RETURN_NOT_DISPONIBLE_DATA = [
	{
		status: 'NOK',
		timeSlot: '12:00-14:00',
		serviceDateTime: '05/12/2024 12:00',
		statusDescription: 'SC',
	},
	{
		status: 'NOK',
		timeSlot: '14:00-16:00',
		serviceDateTime: '05/12/2024 14:00',
		statusDescription: 'SC',
	},
]

const VALID_RETURN_VALUE = {
	status: 'OK',
	reservationKey: '0812202406000012887',
	serviceDateTime: '08/12/2024 06:00',
	statusDescription: 'SC',
	scheduledEndDateAndTime: '2024-12-08T08:00:00',
}

const VALID_RETURN_VALUE_IMEDIATO = {
	status: 'OK',
	reservationKey: '0812202406000012887',
	serviceEstimatedTime: '03:30',
	serviceDateTime: '08/12/2024 06:00',
	statusDescription: 'SC',
	scheduledEstimatedTime: '2024-12-08T08:00:00',
}

const VALID_SINGLE_RETURN_VALUE = {
	status: 'NOK',
	timeSlot: '06:00-06:30',
	serviceDateTime: '08/12/2024 06:00',
	statusDescription: 'SC',
}

exports.AXIOS_SUCCESS_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: VALID_RETURN_VALUE,
	}
}

exports.AXIOS_SUCCESS_SINGLE_RESPONSE_DATA = () => {
	return {
		status: 200,
		data: VALID_SINGLE_RETURN_VALUE,
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
	return MOCKS.FACTORY_API_HUBVENDASCARBON_PRESTACAOSERVICO_ORDERBOOKREQUESTPAYLOAD.PAYLOAD_RETURN()
}

exports.VALID_RETURN = () => {
	return VALID_RETURN_VALUE
}

exports.VALID_RETURN_IMEDIATO = () => {
	return VALID_RETURN_VALUE_IMEDIATO
}

exports.SINGLE_VALID_RETURN = () => {
	return VALID_SINGLE_RETURN_VALUE
}

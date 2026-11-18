const MOCKS = require('../../../../index.mock')

const PROCESS_VALID_PARSEDJSON_INPUT_VALUE = {
	serviceDateTime: '26/08/2024 15:30',
	city: 'Santa Luzia',
	stateCode: 'MG',
	specialtyCode: '44',
	latitude: -16.3655573,
	longitude: -46.8938834,
	originCode: '9',
	companyCode: '1',
	problemCode: '0',
}

exports.GETPAYLOAD_API_REGULARAGENDA_VALID_INPUT = () => {
	return {
		serviceAppointmentCallResponsePayload:
			MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_API_REGULARAGENDA_VALID_RETURN(),
		inputParsedData: PROCESS_VALID_PARSEDJSON_INPUT_VALUE,
	}
}

exports.GETPAYLOAD_API_REGULARAGENDA_WITHOUT_AVAILABILITY_VALID_INPUT = () => {
	return {
		serviceAppointmentCallResponsePayload:
			MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_API_REGULARAGENDA_WITHOUT_AVAILABILITY_VALID_RETURN(),
		inputParsedData: PROCESS_VALID_PARSEDJSON_INPUT_VALUE,
	}
}

exports.GETPAYLOAD_API_REGULARAGENDA_SINGLE_AVAILABILITY_VALID_INPUT = () => {
	return {
		serviceAppointmentCallResponsePayload:
			MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_API_REGULARAGENDA_SINGLE_AVAILABILITY_VALID_RETURN(),
		inputParsedData: PROCESS_VALID_PARSEDJSON_INPUT_VALUE,
	}
}

exports.GETPAYLOAD_API_REGULARAGENDA_VALID_RETURN = () => {
	return {
		status: 'OK',
		reservationKey: '2304202111300099025',
		serviceEstimatedTime: '01:00',
		serviceDateTime: '23/04/2021 11:30',
		statusDescription: 'Não possui agenda',
		scheduledEstimatedTime: '23/04/2021 10:42:32',
		scheduledEndDateAndTime: '2021-04-23T12:30:00',
	}
}

exports.GETPAYLOAD_API_REGULARAGENDA_WITHOUT_AVAILABILITY_VALID_RETURN = () => [
	{
		status: 'NOK',
		timeSlot: '12:00-14:00',
		serviceDateTime: '23/04/2021 12:00',
		statusDescription: 'SC',
	},
	{
		status: 'NOK',
		timeSlot: '14:00-16:00',
		serviceDateTime: '23/04/2021 14:00',
		statusDescription: 'SC',
	},
	{
		status: 'NOK',
		timeSlot: '08:00-10:00',
		serviceDateTime: '26/04/2021 08:00',
		statusDescription: 'SC',
	},
]

exports.GETPAYLOAD_API_REGULARAGENDA_SINGLE_AVAILABILITY_VALID_RETURN = () => {
	return {
		status: 'NOK',
		timeSlot: '15:30-16:00',
		serviceDateTime: '26/08/2024 15:30',
		statusDescription: 'SC',
	}
}

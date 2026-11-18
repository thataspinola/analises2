const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('It must be possible to convert the received payload for the API Response', () => {
	test('It should be possible to convert the payload when the API returns the response containing the reservationKey', () => {
		const getPayloadPayloadReturnValue =
			factory.api.serviceAppointment.serviceAppointmentResponsePayload.getPayload(
				MOCKS.FACTORY_API_SERVICE_APPOINTMENT_RESPONSE.GETPAYLOAD_API_REGULARAGENDA_VALID_INPUT()
					.serviceAppointmentCallResponsePayload,
				MOCKS.FACTORY_API_SERVICE_APPOINTMENT_RESPONSE.GETPAYLOAD_API_REGULARAGENDA_VALID_INPUT()
					.inputParsedData
			)
		expect(getPayloadPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_SERVICE_APPOINTMENT_RESPONSE.GETPAYLOAD_API_REGULARAGENDA_VALID_RETURN()
		)
	})
	test('It should be possible to convert the payload when the API returns a response indicating that the selected date is unavailable and provides a list of suggestions', () => {
		const getPayloadPayloadReturnValue =
			factory.api.serviceAppointment.serviceAppointmentResponsePayload.getPayload(
				MOCKS.FACTORY_API_SERVICE_APPOINTMENT_RESPONSE.GETPAYLOAD_API_REGULARAGENDA_WITHOUT_AVAILABILITY_VALID_INPUT()
					.serviceAppointmentCallResponsePayload,
				MOCKS.FACTORY_API_SERVICE_APPOINTMENT_RESPONSE.GETPAYLOAD_API_REGULARAGENDA_WITHOUT_AVAILABILITY_VALID_INPUT()
					.inputParsedData
			)
		expect(getPayloadPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_SERVICE_APPOINTMENT_RESPONSE.GETPAYLOAD_API_REGULARAGENDA_WITHOUT_AVAILABILITY_VALID_RETURN()
		)
	})

	test('It should be possible to convert the payload when the API returns a response indicating that the selected date is unavailable and provides a single suggested date', () => {
		const getPayloadPayloadReturnValue =
			factory.api.serviceAppointment.serviceAppointmentResponsePayload.getPayload(
				MOCKS.FACTORY_API_SERVICE_APPOINTMENT_RESPONSE.GETPAYLOAD_API_REGULARAGENDA_SINGLE_AVAILABILITY_VALID_INPUT()
					.serviceAppointmentCallResponsePayload,
				MOCKS.FACTORY_API_SERVICE_APPOINTMENT_RESPONSE.GETPAYLOAD_API_REGULARAGENDA_SINGLE_AVAILABILITY_VALID_INPUT()
					.inputParsedData
			)
		expect(getPayloadPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_SERVICE_APPOINTMENT_RESPONSE.GETPAYLOAD_API_REGULARAGENDA_SINGLE_AVAILABILITY_VALID_RETURN()
		)
	})

	test('should return an error message for unexpected format in getPayload', () => {
		const fakeResponse = {
			regularAgendaOut: [{ regulacoes: [{ regulacao: {} }] }],
		}

		expect(() => {
			factory.api.serviceAppointment.serviceAppointmentResponsePayload.getPayload(
				fakeResponse
			)
		}).toThrow(
			new Error(
				`Formato inesperado na resposta da API de agendamento: ${JSON.stringify(
					fakeResponse
				)}`
			)
		)
	})
})

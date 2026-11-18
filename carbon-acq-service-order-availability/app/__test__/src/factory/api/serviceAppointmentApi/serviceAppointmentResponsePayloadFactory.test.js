const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('It must be possible to convert the received payload for the API Response', () => {
	test('should format the API response correctly', () => {
		const getPayloadPayloadReturnValue =
			factory.api.serviceAppointmentApi.serviceAppointmentResponsePayload.getPayload(
				MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_RETURN()
			)
		expect(getPayloadPayloadReturnValue).toEqual(
			MOCKS.FACTORY_RESPONSE_API.GETPAYLOAD_VALID_RETURN()
		)
	})
	test('should format the API response correctly when receives an object from obterListaSugestoesOut.regulacoessaps instead of an array', () => {
		const getPayloadPayloadReturnValue =
			factory.api.serviceAppointmentApi.serviceAppointmentResponsePayload.getPayload(
				MOCKS.API_SERVICE_APPOINTMENT.POSTSERVICEAPPOINTMENT_VALID_RETURN_WITH_REGULACOESSAPS_AS_OBJECT()
			)
		expect(getPayloadPayloadReturnValue).toEqual(
			MOCKS.FACTORY_RESPONSE_API.GETPAYLOAD_VALID_RETURN_FROM_INPUT_WITH_REGULACOESSAPS_AS_OBJECT()
		)
	})

	test('should throw an error for invalid date format in getPayload', () => {
		expect(() => {
			const invalidPayload = {
				obterListaSugestoesOut: {
					regulacoessaps: [
						{
							dataHoraServico: 'invalidDate',
							faixaHorario: '15:30-16:00',
						},
					],
				},
			}
			factory.api.serviceAppointmentApi.serviceAppointmentResponsePayload.getPayload(
				invalidPayload
			)
		}).toThrow(new Error('Data inválida: invalidDate'))
	})
})

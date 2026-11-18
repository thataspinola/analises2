const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('It must be possible to convert the received payload for the API Request', () => {
	test('It should format the API response for the first time correctly', () => {
		const getRequestPayloadReturnValue =
			factory.api.serviceAppointment.serviceAppointmentRequestPayload.getPayload(
				MOCKS.FACTORY_API_SERVICE_APPOINTMENT_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT_FORMATTED_DATE()
			)
		expect(getRequestPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_SERVICE_APPOINTMENT_REQUEST.GETPAYLOAD_API_REGULARAGENDA_VALID_RETURN()
		)
	})

	test('It should format the API response for the first time correctly with complete input payload', () => {
		const getRequestPayloadReturnValue =
			factory.api.serviceAppointment.serviceAppointmentRequestPayload.getPayload(
				MOCKS.FACTORY_API_SERVICE_APPOINTMENT_REQUEST.PROCESS_COMPLETE_VALID_PARSEDJSON_FORMATTED_DATE_INPUT()
			)
		expect(getRequestPayloadReturnValue).toEqual(
			MOCKS.FACTORY_API_SERVICE_APPOINTMENT_REQUEST.GETPAYLOAD_API_REGULARAGENDA_COMPLETE_VALID_RETURN()
		)
	})
})

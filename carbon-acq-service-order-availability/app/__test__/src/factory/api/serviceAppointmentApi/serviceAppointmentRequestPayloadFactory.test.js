const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')
const CONSTANT = require('../../../../../src/property')

describe('It must be possible to convert the received payload for the API Request', () => {
	test('It should format the API response correctly', () => {
		const date = '2024-08-05T00:00:00.000Z'
		const getRequestPayloadReturnValue =
			factory.api.serviceAppointmentApi.serviceAppointmentRequestPayload.getPayload(
				MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT(),
				date
			)
		expect(getRequestPayloadReturnValue).toEqual(
			MOCKS.FACTORY_REQUEST_API.GETPAYLOAD_VALID_RETURN()
		)
	})

	test('It should set parCodigoOrigem to default value "9" if originCode is not provided', () => {
		const date = '2024-08-05T00:00:00.000Z'

		const inputPayloadWithoutOriginCode = {
			...MOCKS.CONTROLLER_REQUEST.VALID_PARSEDJSON_INPUT(),
			originCode: undefined,
		}

		const expectedOutputPayload =
			MOCKS.FACTORY_REQUEST_API.GETPAYLOAD_VALID_RETURN()

		expect(
			factory.api.serviceAppointmentApi.serviceAppointmentRequestPayload.getPayload(
				inputPayloadWithoutOriginCode,
				date
			)
		).toEqual(expectedOutputPayload)
	})
})

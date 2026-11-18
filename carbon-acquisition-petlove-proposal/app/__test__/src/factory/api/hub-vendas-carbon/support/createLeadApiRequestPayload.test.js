const factory = require('../../../../../../src/factory')
const MOCKS = require('../../../../../mocks/index.mock')

beforeEach(() => {
	jest.useFakeTimers('modern').setSystemTime(new Date('2024-11-29').getTime())
})

describe('getRequestPayload', () => {
	test('It should return a payload with correct structure', () => {
		const inputData =
			MOCKS.FACTORY_API_HUBVENDASCARBON_SUPPORT_CREATELEADAPIREQUESTPAYLOAD.CREATELEADAPI_REQUEST_PAYLOAD_INPUT_DATA()

		const expectedPayload =
			MOCKS.FACTORY_API_HUBVENDASCARBON_SUPPORT_CREATELEADAPIREQUESTPAYLOAD.CREATELEADAPI_REQUEST_PAYLOAD_RETURN()

		const result =
			factory.api.hubVendasCarbon.support.createLeadApiRequestPayload.getRequestPayload(
				inputData
			)
		expect(result).toEqual(expectedPayload)
	})
})

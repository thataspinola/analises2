const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('getUpdateCheckinConfirm', () => {
	test('It should return correct structure with all fields', () => {
		const parsedCheckinPayload =
			MOCKS.FACTORY_CHECKIN.CHECKINFACTORY_PARSEDINPUT_VALID_PAYLOAD()
		const apiResponse = MOCKS.FACTORY_CHECKIN.CHECKINFACTORY_RESPONSE_SUCCESS()

		const result = factory.controller.serviceOrderCheckinData.getPayload(
			parsedCheckinPayload,
			apiResponse
		)

		expect(result).toEqual({
			carbonTraceId: undefined,
			eCommercePlatform: {
				orderNumber: 'order123',
				loggedCPF: 'cpf123',
			},
			serviceOrderNumber: 'service123',
			sku: 'sku123',
			externalId: 'trans123',
			transactionId: 'e9d9299e-223b-42cd-9178-51f0d3442a2e',
			responseMessageServiceOrderCheckin: 'No response message',
		})
	})

	test('It should return default message when apiResponse.mensagem is missing', () => {
		const parsedCheckinPayload =
			MOCKS.FACTORY_CHECKIN.CHECKINFACTORY_PARSEDINPUT_VALID_PAYLOAD()
		const responseMessageServiceOrderCheckin =
			MOCKS.FACTORY_CHECKIN.CHECKINFACTORY_RESPONSE_EMPTY()

		const result = factory.controller.serviceOrderCheckinData.getPayload(
			parsedCheckinPayload,
			responseMessageServiceOrderCheckin
		)

		expect(result.responseMessageServiceOrderCheckin).toBe(
			'No response message'
		)
	})

	test('It should handle empty apiResponse object', () => {
		const parsedCheckinPayload =
			MOCKS.FACTORY_CHECKIN.CHECKINFACTORY_PARSEDINPUT_VALID_PAYLOAD()
		const responseMessageServiceOrderCheckin =
			MOCKS.FACTORY_CHECKIN.CHECKINFACTORY_RESPONSE_EMPTY()

		const result = factory.controller.serviceOrderCheckinData.getPayload(
			parsedCheckinPayload,
			responseMessageServiceOrderCheckin
		)

		expect(result.responseMessageServiceOrderCheckin).toBe(
			'No response message'
		)
	})
})

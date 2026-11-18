const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')

describe('getPayload', () => {
	test('It should return correct structure with all fields', () => {
		const parsedScheduleConfirmPayload =
			MOCKS.FACTORY_SCHEDULECONFIRM.SCHEDULECONFIRMFACTORY_PARSEDINPUT_VALID_PAYLOAD()
		const apiResponse =
			MOCKS.FACTORY_SCHEDULECONFIRM.SCHEDULECONFIRMFACTORY_RESPONSE_SUCCESS()

		const result =
			factory.controller.setServiceOrderScheduleConfirmData.getPayload(
				parsedScheduleConfirmPayload,
				apiResponse
			)

		expect(result).toEqual({
			carbonTraceId: 'carbon123',
			eCommercePlatform: {
				orderNumber: 'order123',
				loggedCPF: 'cpf123',
			},
			serviceOrderNumber: 'service123',
			sku: 'sku123',
			externalId: 'trans123',
			transactionId: 'e9d9299e-223b-42cd-9178-51f0d3442a2e',
			responseMessageScheduleConfirm: 'Success message',
		})
	})

	test('It should return default message when apiResponse.mensagem is missing', () => {
		const parsedScheduleConfirmPayload =
			MOCKS.FACTORY_SCHEDULECONFIRM.SCHEDULECONFIRMFACTORY_PARSEDINPUT_VALID_PAYLOAD()
		const responseMessageScheduleConfirm =
			MOCKS.FACTORY_SCHEDULECONFIRM.SCHEDULECONFIRMFACTORY_RESPONSE_EMPTY()

		const result =
			factory.controller.setServiceOrderScheduleConfirmData.getPayload(
				parsedScheduleConfirmPayload,
				responseMessageScheduleConfirm
			)

		expect(result.responseMessageScheduleConfirm).toBe('No response message')
	})

	test('It should handle empty apiResponse object', () => {
		const parsedScheduleConfirmPayload =
			MOCKS.FACTORY_SCHEDULECONFIRM.SCHEDULECONFIRMFACTORY_PARSEDINPUT_VALID_PAYLOAD()
		const responseMessageScheduleConfirm =
			MOCKS.FACTORY_SCHEDULECONFIRM.SCHEDULECONFIRMFACTORY_RESPONSE_EMPTY()

		const result =
			factory.controller.setServiceOrderScheduleConfirmData.getPayload(
				parsedScheduleConfirmPayload,
				responseMessageScheduleConfirm
			)

		expect(result.responseMessageScheduleConfirm).toBe('No response message')
	})
})

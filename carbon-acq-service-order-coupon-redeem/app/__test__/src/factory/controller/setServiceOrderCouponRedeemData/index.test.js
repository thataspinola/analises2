const factory = require('../../../../../src/factory')
const MOCKS = require('../../../../mocks/index.mock')
describe('getUpdateCouponRedeem', () => {
	test('It should return correct structure with all fields', () => {
		const parsedCouponRedeemPayload =
			MOCKS.FACTORY_COUPONREDEEM.COUPONREDEEMFACTORY_PARSEDINPUT_VALID_PAYLOAD()
		const apiResponse =
			MOCKS.FACTORY_COUPONREDEEM.COUPONREDEEMFACTORY_RESPONSE_SUCCESS()

		const result =
			factory.controller.setServiceOrderCouponRedeemData.getPayload(
				parsedCouponRedeemPayload,
				apiResponse
			)

		expect(result).toEqual({
			carbonTraceId: '12345',
			eCommercePlatform: {
				orderNumber: '12345',
				loggedCPF: '48912354892',
			},
			serviceOrderNumber: '1087471-24',
			sku: 'ED001',
			externalId: '2410987',
			transactionId: 'e9d9299e-223b-42cd-9178-51f0d3442a2e',
			responseMessageCouponRedeem: 'No response message',
		})
	})

	test('It should return default message when apiResponse.mensagem is missing', () => {
		const parsedCouponRedeemPayload =
			MOCKS.FACTORY_COUPONREDEEM.COUPONREDEEMFACTORY_PARSEDINPUT_VALID_PAYLOAD()
		const responseMessageCouponRedeem =
			MOCKS.FACTORY_COUPONREDEEM.COUPONREDEEMFACTORY_RESPONSE_EMPTY()

		const result =
			factory.controller.setServiceOrderCouponRedeemData.getPayload(
				parsedCouponRedeemPayload,
				responseMessageCouponRedeem
			)

		expect(result.responseMessageCouponRedeem).toBe('No response message')
	})

	test('It should handle empty apiResponse object', () => {
		const parsedCouponRedeemPayload =
			MOCKS.FACTORY_COUPONREDEEM.COUPONREDEEMFACTORY_PARSEDINPUT_VALID_PAYLOAD()
		const responseMessageCouponRedeem =
			MOCKS.FACTORY_COUPONREDEEM.COUPONREDEEMFACTORY_PAYLOAD_EMPTY()

		const result =
			factory.controller.setServiceOrderCouponRedeemData.getPayload(
				parsedCouponRedeemPayload,
				responseMessageCouponRedeem
			)

		expect(result.responseMessageCouponRedeem).toBe('No response message')
	})
})

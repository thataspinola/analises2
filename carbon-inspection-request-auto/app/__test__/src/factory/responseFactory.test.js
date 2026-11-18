const MOCKS = require('../../mocks/index.mock')
const factory = require('../../../src/factory')

describe('Test suite for the responseFactory.js.', () => {
	describe('Given a error call', () => {
		test('It should receive a error invocation without code', async () => {
			expect(
				factory.response.error(MOCKS.FACTORY_RESPONSE.ERROR_VALID_INPUT())
			).toEqual(MOCKS.FACTORY_RESPONSE.ERROR_VALID_RETURN_WITH_MESSAGE_RETURN())
		})

		test('It should receive a error invocation with 400 code', async () => {
			expect(
				factory.response.error(
					MOCKS.FACTORY_RESPONSE.ERROR_VALID_INPUT(),
					MOCKS.FACTORY_RESPONSE.CODE_400()
				)
			).toEqual(
				MOCKS.FACTORY_RESPONSE.ERROR_VALID_RETURN_WITH_MESSAGE_RETURN_AND_CODE400()
			)
		})
	})
})

describe('Given a success call', () => {
	test('It should receive a success invocation', () => {
		expect(
			factory.response.success(MOCKS.FACTORY_RESPONSE.SUCCESS_VALID_INPUT())
		).toEqual(MOCKS.FACTORY_RESPONSE.SUCCESS_RETURN())
	})
})

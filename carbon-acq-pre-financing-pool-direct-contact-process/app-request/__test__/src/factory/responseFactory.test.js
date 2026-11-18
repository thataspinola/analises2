const MOCKS = require('../../mocks/index.mock')
const factory = require('../../../src/factory')

describe('Given a success call', () => {
	test('It should create a valid response', async () => {
		const successReturnValue = factory.response.success(
			MOCKS.FACTORY_RESPONSE_SUCCESS_INPUT_DATA(),
			MOCKS.FACTORY_RESPONSE_SUCCESS_INPUT_SQS_RESPONSE()
		)
		expect(successReturnValue).toEqual(MOCKS.FACTORY_RESPONSE_SUCCESS_RETURN())
	})
})

const factory = require('../../../src/factory')
const MOCKS = require('../../mocks/index.mock')

describe('Given an getBody call', () => {
	test('It should a response with the expected value when received from sqs', async () => {
		const returnValue = factory.inputBody.getBody(MOCKS.INPUT_BODY_FACTORY.INPUT_RECORD_BODY_FROM_SQS())
		expect(returnValue).toEqual(MOCKS.INPUT_BODY_FACTORY.BODY_FROM_SQS())
	})

	test('It should a response with the expected value when received from db', async () => {
		const returnValue = factory.inputBody.getBody(MOCKS.INPUT_BODY_FACTORY.INPUT_RECORD_BODY_FROM_DB())
		expect(returnValue).toEqual(MOCKS.INPUT_BODY_FACTORY.BODY_FROM_DB())
	})

	test('Should receive null as response when input is invalid', async () => {
		const returnValue = factory.inputBody.getBody(MOCKS.INPUT_BODY_FACTORY.INVALID_INPUT())
		expect(returnValue).toBeNull()
	})
})

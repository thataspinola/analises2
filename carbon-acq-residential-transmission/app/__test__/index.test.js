const MOCKS = require('./mocks/index.mock')
const { mockClient } = require('aws-sdk-client-mock')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const { handler } = require('../index')

global.logger = {
	info: jest.fn(),
	error: jest.fn(),
	warn: jest.fn(),
	debug: jest.fn(),
}

afterEach(() => {
	jest.clearAllMocks()
})

describe('Given a default input', () => {
	test('It should receive a valid travel insurance event, send message to travel integration queue and return success', async () => {
		const sqsMock = mockClient(SQSClient)
		sqsMock
			.on(SendMessageCommand)
			.resolves({ MessageId: 'd5f6aa22-a863-4df9-9763-37ab760a3866' })

		const response = await handler(
			MOCKS.VALID_INPUT_REQUEST_TRAVEL(),
			MOCKS.CONTEXT()
		)

		expect(response).toEqual(MOCKS.CHECKOUT_TRAVEL_SUCCESS_RESPONSE())
	})
})

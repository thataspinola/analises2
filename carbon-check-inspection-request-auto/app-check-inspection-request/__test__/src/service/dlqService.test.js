const { mockClient } = require('aws-sdk-client-mock')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const MOCKS = require('../../mocks/index.mock')
const service = require('../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

const sqsMock = mockClient(SQSClient)

beforeAll(() => {
	sqsMock
		.on(SendMessageCommand)
		.resolves(
			MOCKS.DLQ.SENDMESSAGECOMMAND_VALID_RESPONSE()
		)
})

describe('Given an sendMessage call', () => {
	test('It should a response with the expected value', async () => {
		let returnValue = await service.dlq.sendMessage(MOCKS.DLQ.SENDMESSAGE_MESSAGE_INPUT())
		expect(returnValue).toEqual(MOCKS.DLQ.SENDMESSAGE_VALID_RETURN())

		sqsMock.on(SendMessageCommand).resolves({})

		returnValue = await service.dlq.sendMessage(MOCKS.DLQ.SENDMESSAGE_MESSAGE_INPUT())
		expect(returnValue).toBeNull()
	})
})

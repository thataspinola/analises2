const MOCKS = require('../../../mocks/index.mock')
const CONSTANTS = require('../../../../src/property')

const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const { mockClient } = require('aws-sdk-client-mock')

const service = require('../../../../src/service')

afterEach(() => {
	jest.clearAllMocks()
	jest.restoreAllMocks()
	jest.resetModules()
})

const sqsMock = mockClient(SQSClient)

beforeEach(() => {
	sqsMock
		.on(SendMessageCommand)
		.resolves(MOCKS.SERVICE_SQS_QUEUE.SENDMESSAGECOMMAND_SUCCESS_RETURN())
})

describe('Test suite for the sendMessageQueueService.js', () => {
	test('It should a response with the expected value', async () => {
		await expect(
			service.sqs.queueService.sendMessage(
				MOCKS.SERVICE_SQS_QUEUE.SENDMESSAGE_VALID_INPUT(),
				CONSTANTS.CHECK_INSPECTION_REQUEST_QUEUE_URL
			)
		).resolves.toEqual(MOCKS.SERVICE_SQS_QUEUE.SENDMESSAGE_VALID_RETURN())

		sqsMock.on(SendMessageCommand).resolves({})

		await expect(
			service.sqs.queueService.sendMessage(
				MOCKS.SERVICE_SQS_QUEUE.SENDMESSAGE_VALID_INPUT(),
				CONSTANTS.CHECK_INSPECTION_REQUEST_QUEUE_URL
			)
		).resolves.toBeNull()
	})
})

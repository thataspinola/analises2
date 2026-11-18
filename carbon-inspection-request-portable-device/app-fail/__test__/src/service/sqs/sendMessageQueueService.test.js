const { queue } = require('../../../../src/service/sqs')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const { mockClient } = require('aws-sdk-client-mock')
const sqsMock = mockClient(SQSClient)
const messageId = 'd5f6aa22-a863-4df9-9763-37ab760a3866'

beforeAll(() => {
	jest.useFakeTimers('modern').setSystemTime(new Date(2023, 10, 16, 0, 0, 0, 0))
	sqsMock.on(SendMessageCommand).resolves({ MessageId: messageId })
})

describe('Given validate sendMessageQueueService.js', () => {
	test('It should send message with success', async () => {
		const id = await queue.sendMessage({
			orderNumber: '1',
		})
		expect(id).toEqual(messageId)
	})
})

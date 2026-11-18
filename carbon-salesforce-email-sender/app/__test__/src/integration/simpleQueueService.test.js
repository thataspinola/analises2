// sendMessage.test.js
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const integration = require('../../../src/integration')
const CONSTANTS = require('../../../src/property')

jest.mock('@aws-sdk/client-sqs')

describe('Suite de testes simpleQueueService.js', () => {
	test('Deve enviar uma mensagem com sucesso e retornar o ID da mensagem', async () => {
		const message = { text: 'Test message' }
		const mockMessageId = '12345'

		const sendSpy = jest
			.spyOn(SQSClient.prototype, 'send')
			.mockResolvedValueOnce({ MessageId: mockMessageId })

		const response = await integration.simpleQueueService.sendMessage(message)

		expect(sendSpy).toHaveBeenCalledTimes(1)
		expect(SendMessageCommand).toHaveBeenCalledTimes(1)
		expect(SendMessageCommand).toHaveBeenCalledWith({
			DelaySeconds: CONSTANTS.SQS_DELAY_MESSAGE,
			MessageBody: JSON.stringify(message),
			QueueUrl: CONSTANTS.SALESFORCE_EMAIL_SENDER_QUEUE,
		})
		expect(response).toBe(mockMessageId)
	})
})

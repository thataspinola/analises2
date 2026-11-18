const MOCKS = require('./../../mocks/simpleQueueService.mock')
const { SQSClient } = require('@aws-sdk/client-sqs')
const { sqs } = require('./../../../src/integration')

jest.mock('@aws-sdk/client-sqs')

afterEach(() => {
	jest.clearAllMocks()
})

describe('Suite de testes de integration/sqs.js', () => {
	test('It should invoke the SQSClient.send only once', async () => {
		const spyClient = jest
			.spyOn(SQSClient.prototype, 'send')
			.mockReturnValueOnce(MOCKS.SQS_SUCCESS)

		await sqs.send(MOCKS.SQS_EVENT)

		expect(spyClient).toHaveBeenCalled()
		expect(spyClient).toHaveBeenCalledTimes(1)
	})

	test('Should return the ID of the message posted on the queue', async () => {
		jest
			.spyOn(SQSClient.prototype, 'send')
			.mockReturnValueOnce(MOCKS.SQS_SUCCESS)

		const response = await sqs.send(MOCKS.SQS_EVENT)

		expect(response).toBe('123456')
	})

	test('It should return an error with the following message: Error', async () => {
		jest.spyOn(SQSClient.prototype, 'send').mockImplementationOnce(() => {
			throw new Error('Error')
		})

		expect(sqs.send(MOCKS.SQS_EVENT)).rejects.toThrow('Error')
	})
})

const messageService = require('../../../../src/service/sqs/messageService')
const clientSQS = require('@aws-sdk/client-sqs')
const MOCKS = require('../../../mocks/index.mock')

jest.mock('@aws-sdk/client-sqs', () => {
    return {
        SQSClient: jest.fn(() => ({
            send: jest.fn(),
        })),
        SendMessageCommand: jest.fn(),
    }
})

describe('sendMessage', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('should send message to SQS and return response', async () => {
        const fakeResponse = MOCKS.SERVICE_SQS.VALID_RESPONSE()
        const fakeMessage = MOCKS.SERVICE_SQS.VALID_MESSAGE()
        const fakeQueueUrl = MOCKS.SERVICE_SQS.VALID_QUEUE_URL()
        const mockSend = jest.fn().mockResolvedValue(fakeResponse)

        clientSQS.SQSClient.mockImplementation(() => ({
            send: mockSend
        }))

        const response = await messageService.sendMessage(fakeMessage, fakeQueueUrl)

        expect(clientSQS.SendMessageCommand).toHaveBeenCalledWith({
            DelaySeconds: 0,
            MessageAttributes: null,
            MessageBody: JSON.stringify(fakeMessage),
            QueueUrl: fakeQueueUrl,
        })

        expect(response).toEqual(fakeResponse)
        expect(mockSend).toHaveBeenCalledTimes(1)
    })
})
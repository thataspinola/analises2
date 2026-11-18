const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const MOCKS = require('../../../mocks/service/sqs/queueService.mock')

jest.mock('@aws-sdk/client-sqs', () => {
    return {
        SQSClient: jest.fn(),
        SendMessageCommand: jest.fn(function (params) {
            return { mockedCommand: true, params }
        }),
    }
})

describe('sendMessage', () => {
    let queueService
    let mockSend

    beforeEach(() => {
        mockSend = jest.fn().mockResolvedValue(MOCKS.SQS_SERVICE_RESPONSE)

        SQSClient.mockImplementation(() => ({
            send: mockSend,
        }))

        queueService = require('../../../../src/service/sqs/queueService')
    })

    it('should build params with the correct structure', async () => {
        const message = MOCKS.MESSAGE_BODY
        const result = await queueService.sendMessage(message, MOCKS.QUEUE_URL)
        expect(SendMessageCommand).toHaveBeenCalledWith(MOCKS.SQS_SERVICE_PARAMS)
        expect(mockSend).toHaveBeenCalledTimes(1)
        expect(result).toBe(MOCKS.MESSAGE_ID)
    })
})
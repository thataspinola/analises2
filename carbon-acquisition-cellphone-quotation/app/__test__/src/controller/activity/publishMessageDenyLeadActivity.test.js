const CONSTANT = require('../../../../src/property')
const service = require('../../../../src/service')
const factory = require('../../../../src/factory')
const MOCKS = require('../../../mocks/controller/activity/publishMessageDenyLeadActivity.mock')

const publishMessageDenyLeadActivity = require('../../../../src/controller/activity/publishMessageDenyLeadActivity')

jest.mock('../../../../src/service', () => ({
	logger: {
		error: jest.fn(),
		info: jest.fn(),
	},
	sqs: {
		queue: {
			sendMessage: jest.fn(),
		},
	},
}))
jest.mock('../../../../src/factory')

describe('publishMessageDenyLeadActivity', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    test('should send message to deny lead queue', async () => {
        const idLead = MOCKS.ID_LEAD
        const messageDenyLead = MOCKS.MESSAGE_DENY_LEAD

        factory.sqs.denyLeadQueueMessage.getMessage.mockReturnValue(messageDenyLead)
        service.sqs.queue.sendMessage.mockResolvedValue()

        await publishMessageDenyLeadActivity.execute(idLead)

        expect(factory.sqs.denyLeadQueueMessage.getMessage).toHaveBeenCalledWith(idLead)
        expect(service.sqs.queue.sendMessage).toHaveBeenCalledWith(
            messageDenyLead,
            CONSTANT.DENY_LEAD_QUEUE_URL
        )
        expect(service.logger.error).not.toHaveBeenCalled()
    })

    test('should log error if sending message fails', async () => {
        const idLead = MOCKS.ID_LEAD
        const messageDenyLead = MOCKS.MESSAGE_DENY_LEAD
        const expectedLog = MOCKS.EXPECTED_LOG_ERROR

        factory.sqs.denyLeadQueueMessage.getMessage.mockReturnValue(messageDenyLead)
        service.sqs.queue.sendMessage.mockRejectedValue(new Error('Error sending message'))

        await publishMessageDenyLeadActivity.execute(idLead)

        expect(factory.sqs.denyLeadQueueMessage.getMessage).toHaveBeenCalledWith(idLead)
        expect(service.sqs.queue.sendMessage).toHaveBeenCalledWith(
            messageDenyLead,
            CONSTANT.DENY_LEAD_QUEUE_URL
        )
        expect(service.logger.error).toHaveBeenCalledWith(expectedLog)
        expect(service.logger.error).toHaveBeenCalledTimes(1)
    })

    test('should not rethrow error if sending message fails', async () => {
        factory.sqs.denyLeadQueueMessage.getMessage.mockReturnValue(MOCKS.MESSAGE_DENY_LEAD)
        service.sqs.queue.sendMessage.mockRejectedValue(new Error('Error sending message'))

        await expect(
            publishMessageDenyLeadActivity.execute(MOCKS.ID_LEAD)
        ).resolves.toBeUndefined()
    })

    test('should call getMessage with the provided idLead', async () => {
        const idLead = MOCKS.ID_LEAD

        factory.sqs.denyLeadQueueMessage.getMessage.mockReturnValue(MOCKS.MESSAGE_DENY_LEAD)
        service.sqs.queue.sendMessage.mockResolvedValue()

        await publishMessageDenyLeadActivity.execute(idLead)

        expect(factory.sqs.denyLeadQueueMessage.getMessage).toHaveBeenCalledTimes(1)
        expect(factory.sqs.denyLeadQueueMessage.getMessage).toHaveBeenCalledWith(idLead)
    })
})

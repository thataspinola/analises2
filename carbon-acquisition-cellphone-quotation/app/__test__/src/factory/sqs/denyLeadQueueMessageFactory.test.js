const CONSTANT = require('../../../../src/property')

const denyLeadQueueMessageFactory = require('../../../../src/factory/sqs/denyLeadQueueMessageFactory')

describe('denyLeadQueueMessageFactory', () => {
    it('should create a deny lead queue message with correct structure', () => {
        const leadId = 'lead-123'

        const message = denyLeadQueueMessageFactory.getMessage(leadId)

        expect(message.motivo).toBe(CONSTANT.DENY_LEAD_MESSAGE_REASON)
        expect(message.oportunidadeId).toBe(leadId)
    })
})
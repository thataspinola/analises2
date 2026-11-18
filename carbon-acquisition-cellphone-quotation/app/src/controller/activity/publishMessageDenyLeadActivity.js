const CONSTANT = require('../../property')
const service = require('../../service')
const factory = require('../../factory')

exports.execute = async (idLead) => {
    const messageDenyLead = factory.sqs.denyLeadQueueMessage.getMessage(idLead)

    try {
        await service.sqs.queue.sendMessage(
            messageDenyLead,
            CONSTANT.DENY_LEAD_QUEUE_URL
        )
    } catch (ex) {
        const log = JSON.stringify({
            layer: 'QuotationController',
            currentActivity: `Erro identificado durante a atividade '${CONSTANT.PUBLISH_MESSAGE_DENY_LEAD}'`,
            error: ex.message
        })

        service.logger.error(log)
    }
}

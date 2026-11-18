const CONSTANT = require('../../property')
const service = require('../../service')

exports.execute = async (inputData) => {
    let currentActivity = CONSTANT.MESSAGES.LEAD_CONTROLLER.SENDING_MESSAGE
    try {
        const response = await service.sqs.message.sendMessage(inputData, CONSTANT.LEAD_QUEUE_URL)

        return response?.MessageId ?? null
    } catch (error) {
        service.logger.error(
            `${CONSTANT.MESSAGES.LEAD_CONTROLLER.CURRENT_ACTIVITY}' ${currentActivity}'. ${error.message}`
        )
        throw error
    }
}
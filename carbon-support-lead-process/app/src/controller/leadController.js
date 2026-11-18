const factory = require('../factory')
const service = require('../service')
const CONSTANTS = require('../property')
const activity = require('./activity')
const error = require('./../error')

exports.process = async (inputRequest) => {
	try{
		service.logger.info(
			{request: JSON.stringify(inputRequest)},
			CONSTANTS.MESSAGES.LEAD_CONTROLLER.INPUT_DATA
		)

		activity.validation.execute(inputRequest)

		const messageId = await activity.sendSqs.execute(inputRequest)

		service.logger.info(`${CONSTANTS.MESSAGES.LEAD_CONTROLLER.CREATED_MESSAGE_SUCCESS} ${messageId}`)

		return factory.response.success(messageId)
	}catch(ex){
		const log = {
			rawError: ex,
			carbonErrorData: {
				layer:  CONSTANTS.MESSAGES.LAYER.LEAD_CONTROLLER,
				currentActivity: `${CONSTANTS.MESSAGES.LEAD_CONTROLLER.ACTIVITY} '${ex.message}'`,
				errorMessage: ex.message
			}
		}

		if (ex.name == error.ValidationError.name) {
			service.logger.warn(log, log.carbonErrorData.currentActivity)
			return factory.response.badRequestError(ex.message)
		}

		service.logger.error(log, log.carbonErrorData.currentActivity)
		return factory.response.error(ex.message)
	}
}
const controller = require('./src/controller')
const error = require('./src/error')
const service = require('./src/service')
const factory = require('./src/factory')
const CONSTANTS = require('./src/property')

module.exports.handler = async (event) => {
	let responseBody = null
    let responseStatusCode = null

	try {
		if (!event?.body)
			throw new error.ValidationError(CONSTANTS.MESSAGES.HANDLER.INVALID_BODY)

		const inputData = JSON.parse(event.body)

		const response = await controller.leadController.process(inputData)

		responseBody = JSON.stringify(response.body)
		responseStatusCode = response.statusCode

	} catch (ex) {
		const log = {
			rawError: ex,
			carbonErrorData: {
				layer: CONSTANTS.MESSAGES.LAYER.HANDLER,
				currentActivity: `${CONSTANTS.MESSAGES.HANDLER.CURRENT_ACTIVITY}' ${CONSTANTS.MESSAGES.LEAD_CONTROLLER.SENDING_MESSAGE}'`,
				errorMessage: ex.message
			}
		}
		service.logger.error(log, log.carbonErrorData.currentActivity)
		
		let httpErrorData = null
        if(ex?.name === error.ValidationError.name){
            httpErrorData = factory.response.badRequestError(ex.message)
        }else{
            httpErrorData = factory.response.error(ex.message)
        }

		responseBody = JSON.stringify(httpErrorData.body)
		responseStatusCode = httpErrorData.statusCode
	}

	const response = {
		isBase64Encoded: false,
		headers: null,
		statusCode: responseStatusCode,
		body: responseBody,
	}

	return response
}

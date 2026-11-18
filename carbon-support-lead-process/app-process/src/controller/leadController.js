const service = require('../service')
const activity = require('./activity')
const error = require('./../error')
const CONSTANTS = require('./../property')

exports.process = async (inputRequest) => {
    try{
        activity.validation.execute(inputRequest)

        service.logger.info(
            {request: JSON.stringify(inputRequest)},
            CONSTANTS.MESSAGES.LEAD_CONTROLLER.INPUT_DATA
        )

        const tokenCarbonCloud = await activity.getTokenCarbonCloud.execute()
        const tokenHubCloud = await activity.getTokenCloud.execute()
        const certificates = await activity.getCertificate.execute()

        const dynamicsResponse = await activity.createLeadDynamics.execute(
            inputRequest,
            tokenCarbonCloud,
            tokenHubCloud,
            certificates
        )
        
        service.logger.info(
            {response: JSON.stringify(dynamicsResponse)},
            CONSTANTS.MESSAGES.LEAD_CONTROLLER.RESPONSE_DAYNAMICS
        )

        return
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
		}else{
            service.logger.error(log, log.carbonErrorData.currentActivity)
        }

		throw ex
    }
}
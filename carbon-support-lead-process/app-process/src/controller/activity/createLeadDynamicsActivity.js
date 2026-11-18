const CONSTANT = require('../../property')
const dynamics = require(CONSTANT.DYNAMICS_LIBRARY_LOCATION)
const service = require('../../service')

exports.execute = async (leadPayload, tokenCarbonCloud, tokenHubCloud, certificates) => {
    let currentActivity = CONSTANT.MESSAGES.LEAD_CONTROLLER.GETTING_LEAD_LEAYER
    try{
        const response = await dynamics.createLead(
            leadPayload, 
            tokenCarbonCloud, 
            tokenHubCloud,
            certificates
        )

        return response
    }catch(ex){
        service.logger.error(`${CONSTANT.MESSAGES.LEAD_CONTROLLER.CURRENT_ACTIVITY} '${currentActivity}' ${ex.message}`)
        throw ex
    }
}
const CONSTANT = require('../../property')
const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const errors = require('../../error')
const service = require('../../service')

exports.execute = async () => {
    let currentActivity = CONSTANT.MESSAGES.LEAD_CONTROLLER.GETTING_TOKEN_CARBON_CLOUD
    try{
        return await tokenLayer.getSensediaTokenCarbonCloud()
    }catch(ex){
        service.logger.error(`${CONSTANT.MESSAGES.LEAD_CONTROLLER.CURRENT_ACTIVITY} '${currentActivity}' ${ex.message}`)
        throw new errors.TokenError()
    }
}
const CONSTANT = require('../../property')
const errors = require('../../error')
const service = require('../../service')
const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)

exports.execute = async () => {
    let currentActivity = CONSTANT.MESSAGES.LEAD_CONTROLLER.GETTING_CERTIFICATE
    try{
        return await tokenLayer.getPortoCertificates()
    }catch(ex){
        service.logger.error(`${CONSTANT.MESSAGES.LEAD_CONTROLLER.CURRENT_ACTIVITY} '${currentActivity}' ${ex.message}`)
        throw new errors.TokenError()
    }
}
const CONSTANT = require('../../property')
const errors = require('./../../error')
const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)

exports.execute = async () => {
    let currentActivity = CONSTANT.MESSAGES.TRANSMISSION_CONTROLLER.GETTING_CERTIFICATE
    try{
        return await tokenLayer.getPortoCertificates()
    }catch(ex){
        const errorReporting = JSON.stringify({
            rawError: ex,
            carbonErrorData: {
                layer: 'Activity',
                currentActivity: `${CONSTANT.MESSAGES.TRANSMISSION_CONTROLLER.CURRENT_ACTIVITY}: '${currentActivity}'`,
                errorMessage: ex.message
            }
        })

        logger.error(errorReporting,`${CONSTANT.MESSAGES.TRANSMISSION_CONTROLLER.CURRENT_ACTIVITY}' ${currentActivity}'`)

        throw new errors.TokenError()
    }
}
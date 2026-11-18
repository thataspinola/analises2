const CONSTANT = require('../../property')
const errors = require('../../error')
const service = require('../../service')
const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)

exports.execute = async (traceId) => {
    let currentActivity = CONSTANT.MESSAGES.CONSENT_CONTROLLER.GETTING_CERTIFICATE
    try{
        return await tokenLayer.getPortoCertificates()
    }catch(ex){
        const errorReporting = JSON.stringify({
            rawError: ex,
            carbonErrorData: {
                identifiers: `carbon-trace-id: ${traceId}`,
                layer: 'ConsentsController',
                currentActivity: `${CONSTANT.MESSAGES.CONSENT_CONTROLLER.CURRENT_ACTIVITY}: '${currentActivity}'`,
                errorMessage: ex.message
            }
        })

        service.logger.error(errorReporting,`${CONSTANT.MESSAGES.CONSENT_CONTROLLER.CURRENT_ACTIVITY}' ${currentActivity}'`)

        throw new errors.TokenError()
    }
}
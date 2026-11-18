const CONSTANT = require('../../property')
const tokenLayer = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const errors = require('../../error')
const service = require('../../service')

exports.execute = async (traceId) => {
    let currentActivity = CONSTANT.MESSAGES.CONSENT_CONTROLLER.GETTING_TOKEN
    try{
        return await tokenLayer.getMulesoftTokenHub()
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
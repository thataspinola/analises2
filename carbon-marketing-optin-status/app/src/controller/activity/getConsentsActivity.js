const CONSTANT = require('../../property')
const service = require('../../service')
const api = require('../../api')

exports.execute = async (inputData, token, certificate, traceId) => {
    let currentActivity = CONSTANT.MESSAGES.CONSENT_CONTROLLER.GETTING_API
    
    try{
        return await api.privacidade.consentimentos.v1.customer.get(
            inputData,
            token,
            certificate,
            traceId
        )
    }catch(ex){
        const errorReporting = JSON.stringify({
            rawError: ex,
            carbonErrorData: {
                identifiers: `carbon-trace-id: ${traceId} | document: ${service.dataMask.maskCpf(inputData?.document)}`,
                layer: 'ConsentsController',
                currentActivity: `${CONSTANT.MESSAGES.CONSENT_CONTROLLER.CURRENT_ACTIVITY}: '${currentActivity}'`,
                errorMessage: ex.message
            }
        })
        
        service.logger.error(
            errorReporting,
            `${CONSTANT.MESSAGES.CONSENT_CONTROLLER.CURRENT_ACTIVITY}: '${currentActivity}'`
        )
        
        throw ex
    }
}


const service = require('../service')
const factory = require('../factory')
const activity = require('./activity')

/**
 * 
 * @param {Object} inputData - Os dados de entrada.
 * @return {Object} - Return um objeto factory.response
 */
exports.process = async (inputData, traceId) => {
    try {
        activity.validation.execute(inputData, traceId)
        
        const token = await activity.getToken.execute(traceId)

        const certificates = await activity.getCertificate.execute(traceId)
        
        const consentsData = await activity.consentsAPI.execute(inputData, token, certificates, traceId)

        const consents = factory.consent.createMarketingOptInStatusResponse(consentsData)

        return factory.response.success(consents)
    } catch (ex) {
        const errorReporting = JSON.stringify({
            rawError: ex,
            carbonErrorData: {
                identifiers: `carbon-trace-id: ${traceId} | taxvat: ${service.dataMask.maskCpf(inputData?.document)}`,
                layer: 'ConsentsController',
                currentActivity: `Erro identificado durante a atividade de obter status do optin marketing`,
                errorMessage: ex.message
            }
        })
        
        if (ex.name === 'ValidationError') {
            service.logger.warn(
                errorReporting,
                `Warn identificado durante a atividade de obter status do optin marketing`
            )
            
            return factory.response.badRequestError(ex?.message)
		}else if(ex.name === 'NotFoundError') {
            const consents = factory.consent.createMarketingOptInStatusResponse(undefined)
            return factory.response.success(consents)
        }

        service.logger.error(
            errorReporting,
            `Erro identificado durante a atividade de obter status do optin marketing`
        )

        return factory.response.error(ex?.message)
    }
}
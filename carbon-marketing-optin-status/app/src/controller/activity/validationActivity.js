const CONSTANT = require('../../property')
const service = require('../../service')
const errors = require('../../error')

exports.execute = (inputData, traceId) => {
    let currentActivity = CONSTANT.MESSAGES.CONSENT_CONTROLLER.VALIDATION
    
    try {
        service.validation.inputData(inputData, CONSTANT.CONSENTS_SCHEMA)

        const isValidCpf = service.cpfValidation.isValidCPF(
			inputData.taxvat
		)

        if (!isValidCpf) {
			throw new errors.ValidationError('Número de CPF inválido')
		}
    }catch(ex){
        const errorReporting = JSON.stringify({
            rawError: ex,
            carbonErrorData: {
                identifiers: `carbon-trace-id: ${traceId}`,
                layer: 'consentActivity',
                currentActivity: `${CONSTANT.MESSAGES.CONSENT_CONTROLLER.CURRENT_ACTIVITY}' ${currentActivity}'`,
                errorMessage: ex.message
            }
        })

        if (ex.name == 'ValidationError') {
            service.logger.warn(errorReporting, `${CONSTANT.MESSAGES.CONSENT_CONTROLLER.CURRENT_ACTIVITY}' ${currentActivity}'`)
        }else{
            service.logger.error(errorReporting, `${CONSTANT.MESSAGES.CONSENT_CONTROLLER.CURRENT_ACTIVITY}' ${currentActivity}'`)
        }
        
        throw ex
    }
}
const CONSTANT = require('../../property')
const service = require('../../service')
const error = require('../../error')

exports.execute = (inputData) => {
    let currentActivity = CONSTANT.MESSAGES.LEAD_CONTROLLER.VALIDATION
    
    try {
        service.validation.validate(
            inputData, 
            CONSTANT.LEAD_SCHEMA
        )
    } catch (ex) {
        service.logger.warn(
            `${CONSTANT.MESSAGES.LEAD_CONTROLLER.CURRENT_ACTIVITY} '${currentActivity}': ${ex.message}`
        )
        
        throw ex
    }
}
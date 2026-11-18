const CONSTANT = require('../../../../../src/property/index')

exports.LOGGER_ERROR_MESSAGE = (message) => {
    return `${CONSTANT.MESSAGES.LEAD_CONTROLLER.CURRENT_ACTIVITY} '${CONSTANT.MESSAGES.LEAD_CONTROLLER.VALIDATION}': ${message}`
}

exports.INVALID_INPUT_MESSAGE = () => {
    return 'Invalid input data'
}
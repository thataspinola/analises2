const CONSTANT = require("../../../../../src/property")

const MESSAGE_ID = '1234567890'

exports.MESSAGE_ID = () => {
    return MESSAGE_ID
}

exports.SUCCESS_RETURN = () => {
    return {
        MessageId: MESSAGE_ID,
    }
}

exports.NULL_RETURN = () => {
    return {
        MessageId: null,
    }
}

exports.LOGGER_ERROR_MESSAGE = (errorMessage) => {
    return `${CONSTANT.MESSAGES.LEAD_CONTROLLER.CURRENT_ACTIVITY}' ${CONSTANT.MESSAGES.LEAD_CONTROLLER.SENDING_MESSAGE}'. ${errorMessage}`
}
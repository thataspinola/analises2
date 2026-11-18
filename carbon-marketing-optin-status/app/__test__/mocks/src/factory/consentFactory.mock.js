const CONSTANT = require('./../../../../src/property')

exports.NOT_FOULD = () => {
    return undefined
}

exports.OPT_IN = () => {
    return {
        opt: true
    }
}

exports.OPT_OUT = () => {
    return {
        opt: false
    }
}

exports.CONSENTS_NOT_FOULD = () => {
    return {
        status: CONSTANT.STATUS_CONSENTS.NOT_FOUND
    }
}

exports.CONSENTS_OPT_IN = () => {
    return {
        status: CONSTANT.STATUS_CONSENTS.OPT_IN
    }
}

exports.CONSENTS_OPT_OUT = () => {
    return {
        status: CONSTANT.STATUS_CONSENTS.OPT_OUT
    }
}
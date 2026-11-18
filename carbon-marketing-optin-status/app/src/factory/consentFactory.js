const CONSTANT = require('./../property')

exports.createMarketingOptInStatusResponse = (data) => {
    let consent = {
        status: CONSTANT.STATUS_CONSENTS.OPT_IN
    } 

    if(data === undefined || data === null){
        consent.status = CONSTANT.STATUS_CONSENTS.NOT_FOUND
        return consent
    }

    if(data.opt === false){
        consent.status = CONSTANT.STATUS_CONSENTS.OPT_OUT
    }

    return consent
}
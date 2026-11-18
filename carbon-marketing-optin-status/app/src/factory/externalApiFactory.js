const CONSTANT = require('./../property')
const error = require('../error')

exports.externalApiErrorFactory = (ex) => {
    if(ex.code == CONSTANT.STATS_CODE.BAD_REQUEST){
        return new error.ExternalApiError.BadRequest(ex)
    }else if(ex.code == CONSTANT.STATS_CODE.NOT_FOUND){
        return new error.ExternalApiError.NotFoundError(ex)
    }else{
        return new error.ExternalApiError.ExternalApiError(ex)
    }
}
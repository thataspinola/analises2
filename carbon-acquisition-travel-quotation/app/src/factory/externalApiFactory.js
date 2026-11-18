const { ExternalApiError } = require('../error')

exports.externalApiErrorFactory = (error) => {
    if(error.code == 400){
        return new ExternalApiError.BadRequest(error)
    }else if(error.code == 404){
        return new ExternalApiError.NotFoundError(error)
    }else{
        return new ExternalApiError.ExternalApiError(error)
    }
}
const errors = require('./../../../../../src/error')

exports.VALIDATION_ERROR = () => {
    return new errors.ValidationError('error')
}

exports.VALIDATION_ERROR_CPF = () => {
    return new errors.ValidationError('Número de CPF inválido')
}

exports.EXTERNAL_API_ERROR = () => {
    return new errors.ValidationError('error')
}

exports.VALID_SCHEMA = () => {
    return  {
        taxvat: '12345678901'
    }
}

exports.IS_NOT_VALID_SCHEMA = () => {
    return  {
        taxvat: '12345678'
    }
}
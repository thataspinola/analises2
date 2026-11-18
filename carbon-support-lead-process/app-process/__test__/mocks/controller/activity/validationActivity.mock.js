const CONSTANT = require('./../../../../src/property')
const error = require('../../../../src/error')

exports.CREATE_VALIDATION_ERROR = () => {
    return new error.ValidationError(CONSTANT.ERROR_MESSAGES)
}

const VALIDATION_ERROR = this.CREATE_VALIDATION_ERROR()

exports.GET_VALIDATION_ERROR = () => {
    return VALIDATION_ERROR
}

exports.INPUT_DATA_VALID = () => {
    return {
        "scope": "auto",
        "client": {
            "cpf": "58489669074",
            "name": "Maria Santos",
            "socialName": "José Santos",
            "cellPhone": "11222225555",
            "residentialPhone": "(11)2222-3333",
            "email": "email@dominio.com"
        },
        "address": {
            "zipCode": "13013161"
        },
        "idBranch": "27",
        "idProduct": "1",
        "idProductType": "2",
        "origin": "35",
        "reference": "hub",
        "vdoCode": "1747741319817",
        "pmcInfo": "string - pmc_observacoes",
        "marketingOptInFlag": true,
        "sessionId": "2023102119547179841726-6T4XUGKR",
        "ipAddress": "10.95.174.37",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "susepCode": null,
        "phoneOperationCode": "570"
    }
}

exports.INPUT_DATA_INVALID = () => {
    return {
        "scope": "travel",
        "client": {
            "cpf": "58489669075",
            "name": "Maria Santos",
            "socialName": "José Santos",
            "cellPhone": "11222225555",
            "residentialPhone": "(11)2222-3333",
            "email": "email@dominio.com"
        }
    }
}
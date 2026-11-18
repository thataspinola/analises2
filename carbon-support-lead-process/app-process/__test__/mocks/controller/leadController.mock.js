const CONSTANT = require('./../../../src/property')
const error = require('../../../src/error')

exports.TOKEN_CLOUD = () => {
    return "token_cloud"
}

exports.TOKEN = () => {
    return "token"
}

exports.CERTIFICATE = () => {
    return "CERTIFICATE"
}

exports.LEAD_DAYNAMICS = () => {
    return "success"
}

exports.INPUT_DATA_TOKEN_ERROR = () => {
    return {
        "cpf": "58489669075",
        "origem": "35",
        "nome": "Maria Santos",
        "nome_social": "José Santos",
        "email": "email@dominio.com",
        "ddd_celular": "11",
        "tel_celular": "222225555",
    }
}

exports.INPUT_DATA_VALID = () => {
    return {
        "cpf": "58489669074",
        "origem": "35",
        "nome": "Maria Santos",
        "nome_social": "José Santos",
        "email": "email@dominio.com",
        "ddd_celular": "11",
        "tel_celular": "222225555",
        "ddd_residencial": "11",
        "tel_residencial": "22223333",
        "cep": "13013161",
        "referencia": "hub",
        "id_ramo": "27",
        "susep_origem_LP": null,
        "codigo_vdo": "1747741501745",
        "pmc_observacoes": "string - pmc_observacoes",
        "id_produto": "1",
        "lgpd": {
            "data_aceite": "2025-05-20T11:45:04.560Z",
            "aceite": "true",
            "compartilhamento": "true",
            "consentimento": "true",
            "marketing": true,
            "channel": "portal do cliente",
            "domain": "http://portoseguro.com.br",
            "environmentType": "Site",
            "managementArea": "portocom",
            "nameArea": "portal cliente",
            "vertical": "Institucional"
        },
        "detalhes_produto": {},
        "id_tipo_produto": "2",
        "codigo_operacao_celular": "570"
    }
}

//======CREATE_VALIDATION_ERROR=======
exports.CREATE_VALIDATION_ERROR = () => {
    return new error.ValidationError(CONSTANT.ERROR_MESSAGES)
}

const VALIDATION_ERROR = this.CREATE_VALIDATION_ERROR()

exports.GET_VALIDATION_ERROR = () => {
    return VALIDATION_ERROR
}

exports.LOG_VALIDATION_ERROR = () => {
    return {
        rawError: this.GET_VALIDATION_ERROR(),
        carbonErrorData: {
            layer:  CONSTANT.MESSAGES.LAYER.LEAD_CONTROLLER,
            currentActivity: `${CONSTANT.MESSAGES.LEAD_CONTROLLER.ACTIVITY} '${this.GET_VALIDATION_ERROR().message}'`,
            errorMessage: this.GET_VALIDATION_ERROR().message
        }
    }
}

exports.LOG_VALIDATION_ERROR_MESSAGE = () => {
    return this.LOG_VALIDATION_ERROR().carbonErrorData.currentActivity
}

//======TOKEN_ERROR=======
exports.MESSAGE_TOKEN_ERROR = () => {
    return 'TOKEN_ERROR'
}

exports.CREATE_TOKEN_ERROR = () => {
    return new Error(this.MESSAGE_TOKEN_ERROR())
}

const TOKEN_ERROR = this.CREATE_TOKEN_ERROR()

exports.GET_TOKEN_ERROR = () => {
    return TOKEN_ERROR 
}

exports.LOG_TOKEN_ERROR = () => {
    return {
        rawError: this.GET_TOKEN_ERROR(),
        carbonErrorData: {
            layer:  CONSTANT.MESSAGES.LAYER.LEAD_CONTROLLER,
            currentActivity: `${CONSTANT.MESSAGES.LEAD_CONTROLLER.ACTIVITY} '${this.GET_TOKEN_ERROR().message}'`,
            errorMessage: this.GET_TOKEN_ERROR().message
        }
    }
}

exports.LOG_TOKEN_ERROR_MESSAGE = () => {
    return this.LOG_TOKEN_ERROR().carbonErrorData.currentActivity
}
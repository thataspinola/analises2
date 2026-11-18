const errors = require('../../../../../../../src/error')
const CONSTANTS = require('../../../../../../../src/property')
const https = require('https')

exports.RESPONSE_CONSENTS_API = () => {
    return {
        opt: true
    }
}

exports.VALID_INPUT_DATA = () => {
    return {
        taxvat: "123456789"
    }
}

exports.INVALID_INPUT_DATA = () => {
    return {
        taxvat: "123456",
    }
}


exports.MESSAGE_ERROR = () => {
    return 'External Api Error'
}

exports.NOT_FOUND_ERROR = () => {
    return new errors.ExternalApiError.NotFoundError({
        message: this.MESSAGE_ERROR(),
        stack: 'stack',
    })
}

exports.AXIOS_DATA_ERROR = () => {
    return { message: this.MESSAGE_ERROR(), status: 404 }
}

exports.TOKEN = () => {
    return 'token'
}

exports.TRACE_ID = () => {
    return 'TRACE_ID'
}

exports.CERTIFICATE = () => {
    return 'CERTIFICATE'
}

exports.CREATE_HTTPS_AGENT = () => {
    return new https.Agent({ ca: this.CERTIFICATE()})
}

const HTTPS_AGENT = this.CREATE_HTTPS_AGENT()

exports.GET_HTTPS_AGENT = () => {
    return HTTPS_AGENT
}

exports.AXIOS_CONFIG = () => {
    return {
        method: 'GET',
        url: `${CONSTANTS.GATEWAY_URL}/${CONSTANTS.CONSENTS_API_PATH}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer token`,
            'partner': CONSTANTS.PARTNER_HEADER_VALUE,
            'carbon-trace-id': this.TRACE_ID()
        },
        params: {cpf: this.VALID_INPUT_DATA().taxvat},
        httpsAgent: this.GET_HTTPS_AGENT()
    }
}

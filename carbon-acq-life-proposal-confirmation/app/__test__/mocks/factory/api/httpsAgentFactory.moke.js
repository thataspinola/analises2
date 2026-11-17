const https = require('https')

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
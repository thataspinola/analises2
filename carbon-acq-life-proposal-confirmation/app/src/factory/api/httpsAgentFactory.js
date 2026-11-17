const https = require('https')

exports.createHttpsAgent = (certificate) => {
    const httpsAgent = new https.Agent({ ca: certificate })
    return httpsAgent
}
const service = require('././../service')

exports.create = (input) => {
    let quotation = input
    delete quotation.isFromNewPdp
    if (service.string.isNullOrEmpty(quotation?.meioComercializacao)) {
        quotation.meioComercializacao = "HUB"
    }
    return quotation
}
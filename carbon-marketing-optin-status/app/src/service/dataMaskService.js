const CONSTANT = require('../property')

const dataMaskTemplateApply = (data, mask, regexRemove, regexReplacement = '') => {
    if (!data || typeof data !== 'string') return 'N/A'

    const dataNotFormat = data.trim().replace(regexRemove, regexReplacement)
    return mask(dataNotFormat)
}

exports.maskCpf = (document) => {
    return dataMaskTemplateApply(document, (doc) => `${doc.substring(0, 3)}.***.***-**`, CONSTANT.NUMERIC_EXTRACTOR)
}

exports.maskCnpj = (document) => {
    return dataMaskTemplateApply(document, (doc) => `${doc.substring(0, 2)}.${doc.substring(2, 3)}**.***/****-**`, CONSTANT.NUMERIC_EXTRACTOR)
}
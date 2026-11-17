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

exports.maskEmail = (emailAddress) => {
    return emailAddress && typeof emailAddress === 'string' ? 
        emailAddress.replace(CONSTANT.EMAIL_MASK_REGEX, '*') : 'N/A'
}

exports.maskPhoneBrazil = (numero) => {
    return dataMaskTemplateApply(numero, (num) => {
        const baseNumber = num.substr(-4)
        if (num.length === 11) {
            const ddd = num.substring(0, 2)
            return `(${ddd}) *****-${baseNumber}`
        }
        return `*****-${baseNumber}`
    }, CONSTANT.NUMERIC_EXTRACTOR)
}

exports.maskName = (inputName) => {
    return dataMaskTemplateApply(inputName, (name) => {
        const parts = name.split(' ')

        let article = 0
        const maskedName = parts.map((part, index) => {
            if (index === 0 || ((index === parts.length - 1 && parts.length - article >= 3) && part.length >= 3)) {
                return part
            }

            if(part.length <= 2) article++

            return '*'.repeat(part.length)
        }).join(' ')

        return maskedName
    }, 
    CONSTANT.REMOVE_EXTRERNAL_SPACES, ' ')
}
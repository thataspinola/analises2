// Mocks para CPF
exports.CPF_ONE_NOT_FORMATTED = () => {
    return '123.123.123-12'
}

exports.CPF_ONE_FORMATTED = () => {
    return '123.***.***-**'
}

// Mocks para CNPJ
exports.CNPJ_ONE_NOT_FORMATTED = () => {
    return '56.412.312/3124-12'
}

exports.CNPJ_ONE_FORMATTED = () => {
    return '56.4**.***/****-**'
}

// Mocks para asserções toBe
exports.N_A = () => {
    return 'N/A'
}
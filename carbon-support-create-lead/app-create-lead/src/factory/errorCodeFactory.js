const { PRODUCT_CODE, PRODUCT_STEP, ERROR_CODE } = require("../property")

/**
 * Função responsável pelo tratamento de erros
 * @param {String} errorMessage mensagem de erro a ser filtrada
 * @param {Number} status parametro opcional onde pode ser passado o statusCode para ajudar na filtragem
 * @return string com o 'errorCode'
 */
exports.getCode = (errorMessage, status) => {
    let errorCode = ERROR_CODE.DEFAULT

    if (errorMessage.includes('Dynamics responded with a Blocklist error') && status == 422) {
        errorCode = ERROR_CODE.BLOCKLIST
    } 

    return `${PRODUCT_CODE}${PRODUCT_STEP}${errorCode}`
}

exports.getDefaultCode = () => `${PRODUCT_CODE}${PRODUCT_STEP}${ERROR_CODE.DEFAULT}`

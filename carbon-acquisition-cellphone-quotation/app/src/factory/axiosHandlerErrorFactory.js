const { PRODUCT_CODE, PRODUCT_STEP, DEFAULT_ERROR_CODE } = require("../property")

/**
 * Função responsável pelo tratamento de erros vindos de chamadas feitas com o Axios
 * @param {Object} error objeto de erro a ser manipulado
 * @return Objeto com os campos `status` e `message`
 */
module.exports = (error) => {
	if (error.response) {
		// A requisição foi feita e o servidor respondeu com um código de status
		// que sai do alcance de 2xx

		let errorCode
		if (error.response.data && typeof error.response.data === 'object') {
			if (typeof error.response.data.payload?.scoreAceito === 'boolean' && error.response.data.payload?.scoreAceito === false) {
				error.response.status = 400
				errorCode = '001'
			}
			error.response.data = JSON.stringify(error.response.data)
		}
		
		return {
			status: error.response.status,
			message: error.response.data,
			errorCode: `${PRODUCT_CODE}${PRODUCT_STEP}${errorCode || DEFAULT_ERROR_CODE}`
		}
	} else if (error.request) {
		// A requisição foi feita mas nenhuma resposta foi recebida

		return {
			status: 500,
			message: `${error.code} - ${error.message}`,
			errorCode: `${PRODUCT_CODE}${PRODUCT_STEP}${DEFAULT_ERROR_CODE}`
		}
	} else {
		return {
			status: 500,
			message: error.message,
			errorCode: `${PRODUCT_CODE}${PRODUCT_STEP}${DEFAULT_ERROR_CODE}`
		}
	}
}

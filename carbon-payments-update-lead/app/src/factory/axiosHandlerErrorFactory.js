const INTERNAL_SERVER_ERROR = 500

/**
 * Função responsável pelo tratamento de erros vindos de chamadas feitas com o Axios
 * @param {Object} error objeto de erro a ser manipulado
 * @return Objeto com os campos `status` e `message`
 */
module.exports = (error) => {
	if (error.response) {
		const { status, data } = error.response
		const message = typeof data === 'object' ? JSON.stringify(data) : data
		return { status, message }
	}

	if (error.request) {
		return {
			status: INTERNAL_SERVER_ERROR,
			message: `No response received - ${error.code}: ${error.message}`,
		}
	}

	return {
		status: INTERNAL_SERVER_ERROR,
		message: `Request setup failed - ${error.message}`,
	}
}

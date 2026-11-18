const TIMEOUT_ERROR_CODES = ['ECONNABORTED', 'ETIMEDOUT', 'ERR_CANCELED']

module.exports = (error) => {
	if (error.response) {
		// A requisição foi feita e o servidor respondeu com um código de status
		// que sai do alcance de 2xx

		if (typeof error.response.data === 'object')
			error.response.data = JSON.stringify(error.response.data)

		return {
			status: error.response.status,
			message: error.response.data,
		}
	} else if (error.request) {
		// A requisição foi feita mas nenhuma resposta foi recebida

		return {
			status: TIMEOUT_ERROR_CODES.includes(error.code) ? 504 : 500,
			message: `${error.code} - ${error.message}`,
		}
	} else {
		return {
			status: 500,
			message: error.message,
		}
	}
}

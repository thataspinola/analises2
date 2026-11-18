/**
 * Função responsável construir o retorno de erro a partir do objeto de erro resultado de chamadas feitas com o Axios que resultaram um erro
 * @param {Object} responseError objeto de erro a ser manipulado
 * @return Objeto com os campos `status` e `message`
 */
exports.getErrorData = (responseError) => {
	if (responseError.response) {
		// A requisição foi feita e o servidor respondeu com um código de status
		// que sai do alcance de 2xx

		let responseMessage = `Erro recebido da chamada da API: código '${
			responseError.response.status
		}' dados: '${JSON.stringify(responseError.response.data)}'`
		const errorMessage = responseError.response?.data?.payload?.message
		if (errorMessage) responseMessage = errorMessage

		return {
			status: responseError.response?.status || 500,
			message: responseMessage,
		}
	} else if (responseError.request) {
		// A requisição foi feita mas nenhuma resposta foi recebida

		return {
			status: 500,
			message: 'API não respondeu à chamada',
		}
	} else {
		return {
			status: 500,
			message: `Erro inesperado recebido da chamada da API: ${responseError.message}`,
		}
	}
}

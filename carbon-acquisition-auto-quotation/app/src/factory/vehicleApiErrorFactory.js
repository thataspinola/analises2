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
		
		if (typeof error.response.data === 'object') {
			const errors = error.response.data.errors

			errors?.forEach(err => {
				const { errorMessage, field } = err

				if (errorMessage.includes("ReadTimeoutException") || errorMessage.includes("ConnectTimeoutException") || errorMessage.includes("AnnotatedConnectException") || error.response.status === 504) {
					errorCode = '001'
				} else if (errorMessage === "Atributo em desacordo com a regra de negócio" && field === "nomeSocial") {
					errorCode = '002'
				} else if (errorMessage.includes("Cálculo de Renovação de Congênere para a mesma Empresa não permitido. Favor retirar a Empresa informada nesta Cotação e reenviar a solicitação de orçamento.")) {
					errorCode = '003'
				} else if (errorMessage.includes("Nenhuma pessoa encontrada para o cpfCnpj") && field.includes("pessoa")) {
					errorCode = '004'
				} else if (errorMessage.includes("Não foi possível realizar o enquadramento da Cotação. O servidor retornou um erro inesperado.")) {
					errorCode = '005'
				} else if (errorMessage.includes("Segmento de veículo não comercializado neste produto.")) {
					errorCode = '006'
				} else if (errorMessage.includes("Nenhum logradouro encontrado para numeroCep") && field.includes("cepPernoite")) {
					errorCode = '007'
				} else if (errorMessage.includes("Não foi possível consultar Domínio BFB Service. Por favor tente mais tarde.")) {
					errorCode = '008'
				} else if (errorMessage.includes("Tipo de veículo não comercializado neste canal, contate seu Corretor para realizar a cotação do seguro.")) {
					errorCode = '009'
				} else if (errorMessage.includes("Ocorreu um erro não esperado durante a validação.") && field === "nomeSocial") {
					errorCode = '010'
				} else if (errorMessage.includes("Atributo com valor diferente do domínio aceito") && field.includes("congenere")) {
					errorCode = '011'
				} else if (error.response.data.code === 500 && errorMessage.includes("Ocorreu um erro não esperado durante a validação.") && field.includes("pessoa")) {
					errorCode = '012'
				} else {
					errorCode = '000'
				} 
			})

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
			errorCode: `${PRODUCT_CODE}${PRODUCT_STEP}${DEFAULT_ERROR_CODE}`,
		}
	} else {
		return {
			status: 500,
			message: error.message,
			errorCode: `${PRODUCT_CODE}${PRODUCT_STEP}${DEFAULT_ERROR_CODE}`,
		}
	}
}
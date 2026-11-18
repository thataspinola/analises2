const MOCKS_FACTORY_RESPONSE = require('./src/factory/searchProductsControllerResponse.mock')

exports.VALIDATION_UNEXPECTED_ERROR_ERROR_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Validação dos dados': Unexpected validation error`
}

exports.VALIDATION_ERROR_WARNING_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Validação dos dados': Validation`
}

exports.EXCEPTION_SIMULATION_ERROR_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Teste de exceção': Erro recebido da chamada da API: código '500' dados: '{ "message": "Simulação de falha" }'`
}

exports.CONTROLLER_PRODUCT_PROCESS_SUCCESS_INFO_MESSAGE = () => {
	return JSON.stringify(MOCKS_FACTORY_RESPONSE.SUCCESS_RETURN())
}

exports.TOKEN_RETRIEVAL_ERROR_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Obtenção do token do API Gateway Commerce': Token retrieval error`
}

exports.API_CALL_ERROR_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Obtendo lista de produtos a partir do tipo de busca definido': Any getAllProducts unexpected error`
}

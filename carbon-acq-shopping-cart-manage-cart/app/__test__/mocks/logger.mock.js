const MOCKS = require('./index.mock')

exports.VALIDATION_UNEXPECTED_ERROR_ERROR_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Validação dos dados': Unexpected validation error`
}

exports.VALIDATION_ERROR_WARNING_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Validação dos dados': Validation`
}

exports.EXCEPTION_SIMULATION_ERROR_MESSAGE = () => {
	return `Erro identificado durante a atividade 'Teste de exceção': Fake failure`
}

exports.CONTROLLER_REQUEST_SUCCESS_INFO_MESSAGE = () => {
	return JSON.stringify(
		MOCKS.FACTORY_CONTROLLERRESPONSE.CONTROLLER_SUCCESS_RETURN()
	)
}

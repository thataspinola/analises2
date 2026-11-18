const API_PROPOSTA_MOCKS = require('../api/propostaApi.mock')

exports.SUCCESS_RESPONSE = () => {
	return {
		statusCode: 200,
		body: API_PROPOSTA_MOCKS.SUCCESS_RETURN_BODY_VALUE(),
	}
}

exports.VALID_INPUT_DATA = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		codigoCampanha: '86',
	}
}

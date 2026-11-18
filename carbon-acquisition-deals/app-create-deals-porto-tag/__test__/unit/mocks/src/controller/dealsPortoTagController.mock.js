const API_TAGS_MOCKS = require('../api/tagsApi.mock')

exports.SUCCESS_RESPONSE = () => {
	return {
		statusCode: 200,
		body: API_TAGS_MOCKS.SUCCESS_RETURN_BODY_VALUE(),
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

const MOCKS = require('../../../../../../index.mock')

exports.GETPAYLOAD_VALID_RETURN = () => {
	return {
		codigoVistoria: '22259',
		codigoReparoAuto: '8511218',
	}
}

exports.GETPAYLOAD_PARSEDJSON_VALID_INPUT = () => {
	return MOCKS.CONTROLLER_REQUEST.PROCESS_VALID_PARSEDJSON_INPUT()
}

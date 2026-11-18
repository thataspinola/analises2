exports.VALID_INPUT_DATA = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		codigoCampanha: '86',
	}
}

exports.INPUT_DATA_CODIGO_CAMPANHA_NULL = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		codigoCampanha: null,
	}
}

exports.INPUT_DATA_CODIGO_CAMPANHA_MISSING = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
	}
}

exports.INVALID_INPUT_DATA_INVALID_PROPERTY = () => {
	return {
		teste: '31033230006',
	}
}

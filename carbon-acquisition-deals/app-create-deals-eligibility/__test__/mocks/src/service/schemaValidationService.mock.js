exports.VALID_INPUT_DATA = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		codigoCampanha: '86',
	}
}

exports.INVALID_INPUT_DATA_INVALID_PROPERTY = () => {
	return {
		teste: '31033230006',
	}
}

exports.INVALID_INPUT_DATA_INVALID_TYPE = () => {
	return {
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: 12354617400,
		codigoCampanha: '86',
	}
}

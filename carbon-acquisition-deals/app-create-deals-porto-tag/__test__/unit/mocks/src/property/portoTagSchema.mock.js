exports.VALID_DATA = () => {
	return {
		codigoCanal: 1,
		tipoDocumento: 'CPF',
		documento: '12345678901',
		codigoCampanha: 'ABC123',
	}
}

exports.VALID_DATA_CODIGO_CAMPANHA_NULL = () => {
	return {
		codigoCanal: 1,
		tipoDocumento: 'CPF',
		documento: '12345678901',
		codigoCampanha: null,
	}
}

exports.VALID_DATA_CODIGO_CAMPANHA_MISSING = () => {
	return {
		codigoCanal: 1,
		tipoDocumento: 'CPF',
		documento: '12345678901',
	}
}

exports.INVALID_DATA_MISSING_REQUIRED_PROPERTY = () => {
	return {
		codigoCanal: 1,
		tipoDocumento: 'CPF',
		codigoCampanha: 'ABC123',
	}
}

exports.INVALID_DATA_WITH_ADDITIONAL_PROPERTY = () => {
	return {
		codigoCanal: 1,
		tipoDocumento: 'CPF',
		documento: '12345678901',
		codigoCampanha: 'ABC123',
		extraProperty: 'extraValue',
	}
}

exports.INVALID_DATA_WITH_INVALID_TYPE = () => {
	return {
		codigoCanal: '1',
		tipoDocumento: 'CPF',
		documento: '12345678901',
		codigoCampanha: 'ABC123',
	}
}

exports.INVALID_DATA_WITH_INVALID_ENUM_VALUE = () => {
	return {
		codigoCanal: 1,
		tipoDocumento: 'RG',
		documento: '12345678901',
		codigoCampanha: 'ABC123',
	}
}

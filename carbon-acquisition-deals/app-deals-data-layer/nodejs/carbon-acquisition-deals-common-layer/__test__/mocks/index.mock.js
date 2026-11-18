exports.VALID_INPUT_DATA_SAVE = () => {
	return {
		scope: 'eligibility',
		document: '00000017400',
		data: {
			codigoOferta: '0add969e-6b62-42a3-860f-1de4070bee88',
			codigoCanal: 83,
			tipoDocumento: 'CPF',
			documento: '00000017400',
			situacao: 'Incluída',
		},
	}
}

exports.INVALID_INPUT_DATAS = () => {
	return [
		this.INVALID_INPUT_DATA_INVALID_SCOPE_SAVE,
		this.INVALID_INPUT_DATA_WITHOUT_DATA_SAVE,
		this.INVALID_INPUT_DATA_WITHOUT_DOCUMENT_SAVE,
	]
}

exports.INVALID_INPUT_DATA_INVALID_SCOPE_SAVE = {
	scope: 'eligibility',
	document: '00000017400',
	data: {
		codigoOferta: '0add969e-6b62-42a3-860f-1de4070bee88',
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		situacao: 'Incluída',
	},
}

exports.INVALID_INPUT_DATA_WITHOUT_DOCUMENT_SAVE = {
	scope: 'eligibility',
	data: {
		codigoOferta: '0add969e-6b62-42a3-860f-1de4070bee88',
		codigoCanal: 83,
		tipoDocumento: 'CPF',
		documento: '00000017400',
		situacao: 'Incluída',
	},
}

exports.INVALID_INPUT_DATA_WITHOUT_DATA_SAVE = {
	scope: 'eligibility',
	document: '00000017400',
}

exports.INVALID_INPUT_DATA_INVALID_SCOPE = () => {
	return { scope: 'eligibilit', document: '00000017400', data: {} }
}

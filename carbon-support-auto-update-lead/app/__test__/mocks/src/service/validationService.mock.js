exports.VALID_INPUT_REQUEST = () => {
	return {
		codigo_vdo: '1234565',
		pmc_observacoes: 'PENDENTE PAGAMENTO',
		id_ramo: 27,
	}
}

exports.INVALID_INPUT_REQUEST_MISSING_CODIGO_VDO = () => {
	return {
		pmc_observacoes: 'PENDENTE PAGAMENTO',
		id_ramo: 27,
	}
}

exports.INVALID_INPUT_REQUEST_WRONG_FIELD_TYPE = () => {
	return {
		codigo_vdo: '1234',
		pmc_observacoes: {},
		id_ramo: 27,
	}
}

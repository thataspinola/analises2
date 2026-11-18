const GET_SUCCESS_RESPONSE_DATA_FIRST_DOCUMENTOSIDENTIFICACAO_VALUE = {
	numeroRaizCpfPessoa: 401458948,
	digitoCpfPessoa: 0,
	tipoDocumentoIdentificacao: {
		codigoTipoDocumentoIdentificacao: 1,
		nomeTipoDocumentoIdentificacao: 'Cadastro de Pessoa Física',
		siglaTipoDocumentoIdentificacao: 'CPF',
	},
	orgaoExpedidorDocumento: {
		codigoOrgaoExpedidorDocumento: 34,
		nomeOrgaoExpedidorDocumento: 'Receita Federal',
		siglaOrgaoExpedidorDocumento: 'SRF',
	},
}

exports.GET_SUCCESS_RESPONSE_DATA = () => {
	return {
		pessoa: {
			codigoPessoaBCP: 82240051,
			codigoPessoa: 338496,
			nomeLegalPessoa: 'ANDRESSA FRANCISCA MEIRA',
			tipoPessoa: {
				codigoTipoPessoa: 1,
				nomeTipoPessoa: 'Pessoa Fisica',
				siglaTipoPessoa: 'PF',
			},
			documentosIdentificacao: [
				GET_SUCCESS_RESPONSE_DATA_FIRST_DOCUMENTOSIDENTIFICACAO_VALUE,
			],
			nomeSocialPessoaFisica: 'ANDRESSA FRANCISCA MEIRA',
			dataNascimentoPessoaFisica: '1991-11-15',
			sexo: {
				codigoSexo: 2,
				nomeSexo: 'Feminino',
				siglaSexo: 'F',
			},
		},
	}
}

exports.GET_EXISTS_RETURN = () => {
	return GET_SUCCESS_RESPONSE_DATA_FIRST_DOCUMENTOSIDENTIFICACAO_VALUE
}

exports.GET_EXISTENT_PESCOD = () => {
	return '338496'
}

exports.GET_NOT_EXISTS_RESPONSE_DATA = () => {
	return {}
}

exports.GET_NOT_EXISTS_PESCOD = () => {
	return '989898'
}
exports.GET_NOT_EXISTS_RETURN = () => {
	return null
}

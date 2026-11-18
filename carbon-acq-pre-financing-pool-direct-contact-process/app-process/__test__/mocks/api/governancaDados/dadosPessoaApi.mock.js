const FACTORY_API_GOVERNANCADADOS_DADOSPESSOA_PESSOAPAYLOAD_MOCKS = require('../../factory/api/governancaDados/dadosPessoa/pessoaPayloadFactory.mock')
const GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_VALUE = {
	codigoPessoaBCP: 82674864,
	codigoPessoa: 82674864,
	nomeLegalPessoa: 'Nomeir Sobrenomeson',
	tipoPessoa: {
		codigoTipoPessoa: 1,
		nomeTipoPessoa: 'Pessoa Fisica',
		siglaTipoPessoa: 'PF',
	},
	nomeSocialPessoaFisica: 'Nomeir Sobrenomeson',
}

const GETPESSOA_PJ_SUCCESS_RESPONSE_DATA_FIRST_ITEM_VALUE = {
	codigoPessoaBCP: 82674864,
	codigoPessoa: 82674864,
	nomeLegalPessoa: 'Nomeir Sobrenomeson',
	tipoPessoa: {
		codigoTipoPessoa: 2,
		nomeTipoPessoa: 'Pessoa Juridica',
		siglaTipoPessoa: 'PJ',
	},
	tipoSituacaoPessoaJuridica: {
		codigoTipoSituacaoPessoaJuridica: 1,
		nomeTipoSituacaoPessoaJuridica: 'Ativa',
	},
	tipoPessoaJuridica: {
		codigoTipoPessoaJuridica: 3,
		nomeTipoPessoaJuridica: 'Pessoa Jurídica não pertencente ao Grupo Porto',
	},
}

exports.GETPESSOA_SUCCESS_RESPONSE_DATA = () => {
	return {
		pessoas: [GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_VALUE],
	}
}

exports.GETPESSOA_PJ_SUCCESS_RESPONSE_DATA = () => {
	return {
		pessoas: [GETPESSOA_PJ_SUCCESS_RESPONSE_DATA_FIRST_ITEM_VALUE],
	}
}

exports.GETPESSOA_EXISTS_RETURN = () => {
	return GETPESSOA_SUCCESS_RESPONSE_DATA_FIRST_ITEM_VALUE
}

exports.GETPESSOA_PJ_EXISTS_RETURN = () => {
	return GETPESSOA_PJ_SUCCESS_RESPONSE_DATA_FIRST_ITEM_VALUE
}

exports.POSTPESSOA_SUCCESS_RETURN = () => {
	return {
		codigoPessoa: '75315984',
		codigoPessoaBCP: '75315984',
	}
}

exports.POSTPESSOA_SUCCESS_RESPONSE_DATA = () => {
	return {
		pessoa: {
			codigoPessoa: '75315984',
			codigoPessoaBCP: '75315984',
		},
	}
}

exports.GETPESSOA_EXISTENT_CPF = () => {
	return '06963752060'
}

exports.GETPESSOA_NOT_EXISTS_RESPONSE_DATA = () => {
	return {}
}

exports.GETPESSOA_NOT_EXISTS_CPF = () => {
	return '26538041078'
}
exports.GETPESSOA_NOT_EXISTS_RETURN = () => {
	return null
}

exports.POSTPESSOA_VALID_PAYLOAD = () => {
	return FACTORY_API_GOVERNANCADADOS_DADOSPESSOA_PESSOAPAYLOAD_MOCKS.GETPAYLOAD_VALID_RETURN_VALUE
}

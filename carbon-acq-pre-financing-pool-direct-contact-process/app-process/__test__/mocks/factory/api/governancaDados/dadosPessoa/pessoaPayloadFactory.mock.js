const HANDLER_MOCKS = require('../../../../handler.mock')

exports.GETPAYLOAD_VALID_CLIENTDATA_INPUT = () => {
	return HANDLER_MOCKS.VALID_INPUT_PAYLOAD_WHATSAPP_RECORD_BODY_FORMDATA_CLIENT()
}

exports.PJ_GETPAYLOAD_VALID_CLIENTDATA_INPUT = () => {
	return HANDLER_MOCKS.VALID_INPUT_PAYLOAD_PJ_WHATSAPP_RECORD_BODY_FORMDATA_CLIENT()
}

const GETPAYLOAD_VALID_RETURN_VALUE = {
	codigoOrigemBCP: 174,
	nomeLegalPessoa: 'Nomeir Sobrenomeson',
	tipoPessoa: {
		codigoTipoPessoa: 1,
	},
	nomeSocialPessoaFisica: 'Nomeir Sobrenomeson',
	documentosIdentificacao: [
		{
			tipoDocumentoIdentificacao: {
				codigoTipoDocumentoIdentificacao: 1,
			},
			numeroRaizCpfPessoa: '069637520',
			digitoCpfPessoa: '60',
			orgaoExpedidorDocumento: {
				codigoOrgaoExpedidorDocumento: 10,
			},
		},
	],
	enderecosEletronicos: [
		{
			tipoFinalidadeEnderecoEletronico: {
				codigoTipoFinalidadeEnderecoEletronico: 1,
			},
			textoEnderecoEletronico: 'cliente@clienteproduto.com.br',
		},
	],
	telefones: [
		{
			codigoDDITelefone: 55,
			codigoDDDTelefone: '11',
			numeroTelefone: '98754422',
			tipoLinhaTelefonica: {
				codigoTipoLinhaTelefonica: 1,
			},
			tipoFinalidadeTelefone: {
				codigoTipoFinalidadeTelefone: 1,
			},
		},
	],
}

const PJ_GETPAYLOAD_VALID_RETURN_VALUE = {
	codigoOrigemBCP: 174,
	nomeLegalPessoa: 'Nomeir Sobrenomeson',
	tipoSituacaoPessoaJuridica: {
		codigoTipoSituacaoPessoaJuridica: 1,
	},
	tipoPessoaJuridica: {
		codigoTipoPessoaJuridica: 3,
	},
	tipoPessoa: {
		codigoTipoPessoa: 2,
	},
	documentosIdentificacao: [
		{
			tipoDocumentoIdentificacao: {
				codigoTipoDocumentoIdentificacao: 2,
			},
			numeroOrdemCnpjPessoa: '0001',
			numeroRaizCnpjPessoa: '02860136',
			digitoCnpjPessoa: '05',
			orgaoExpedidorDocumento: {
				codigoOrgaoExpedidorDocumento: 34,
			},
		},
	],
	enderecosEletronicos: [
		{
			tipoFinalidadeEnderecoEletronico: {
				codigoTipoFinalidadeEnderecoEletronico: 1,
			},
			textoEnderecoEletronico: 'cliente@clienteproduto.com.br',
		},
	],
	telefones: [
		{
			codigoDDITelefone: 55,
			codigoDDDTelefone: '11',
			numeroTelefone: '98754422',
			tipoLinhaTelefonica: {
				codigoTipoLinhaTelefonica: 1,
			},
			tipoFinalidadeTelefone: {
				codigoTipoFinalidadeTelefone: 1,
			},
		},
	],
}
exports.GETPAYLOAD_VALID_RETURN = () => {
	return GETPAYLOAD_VALID_RETURN_VALUE
}

exports.PJ_GETPAYLOAD_VALID_RETURN = () => {
	return PJ_GETPAYLOAD_VALID_RETURN_VALUE
}

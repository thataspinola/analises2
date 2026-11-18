const CONSTANT = require('../../../../property')

const getPayloadForCpf = (clientData) => {
	const cpfCnpjBase = clientData.cpfCnpj.substring(
		0,
		clientData.cpfCnpj.length - 2
	)
	const cpfCnpjDigit = clientData.cpfCnpj.substring(
		clientData.cpfCnpj.length - 2
	)

	const cellphone = clientData.cellPhone.replace(
		CONSTANT.PHONENUMBER_CLEANUP_REGEX,
		''
	)

	const payload = {
		codigoOrigemBCP: CONSTANT.PESSOA_CODIGO_ORIGEM_BCP_HDV,
		nomeLegalPessoa: clientData.fullName,
		tipoPessoa: {
			codigoTipoPessoa: CONSTANT.PESSOA_CODIGO_TIPO_PESSOA_FISICA,
		},
		nomeSocialPessoaFisica: clientData.fullName,
		documentosIdentificacao: [
			{
				tipoDocumentoIdentificacao: {
					codigoTipoDocumentoIdentificacao:
						CONSTANT.PESSOA_CODIGO_TIPO_DOCUMENTO_IDENTIFICACAO_CPF,
				},

				numeroRaizCpfPessoa: cpfCnpjBase,
				digitoCpfPessoa: cpfCnpjDigit,
				orgaoExpedidorDocumento: {
					codigoOrgaoExpedidorDocumento:
						CONSTANT.PESSOA_CODIGO_ORGAO_EXPEDIDOR_PF,
				},
			},
		],
		enderecosEletronicos: [
			{
				tipoFinalidadeEnderecoEletronico: {
					codigoTipoFinalidadeEnderecoEletronico:
						CONSTANT.PESSOA_CODIGO_FINALIDADE_ENDERECO_ELETRONICO_PESSOAL,
				},
				textoEnderecoEletronico: clientData.email,
			},
		],
		telefones: [
			{
				codigoDDITelefone: CONSTANT.PESSOA_CODIGO_DDI_TELEFONE_BRASIL,

				codigoDDDTelefone: cellphone.substring(0, 2),
				numeroTelefone: cellphone.substring(2),

				tipoLinhaTelefonica: {
					codigoTipoLinhaTelefonica:
						CONSTANT.PESSOA_CODIGO_LINHA_TELEFONICA_MOVEL,
				},
				tipoFinalidadeTelefone: {
					codigoTipoFinalidadeTelefone:
						CONSTANT.PESSOA_CODIGO_FINALIDADE_TELEFONE_CELULAR,
				},
			},
		],
	}

	return payload
}

const getPayloadForCnpj = (clientData) => {
	const cpfCnpjBase = clientData.cpfCnpj.substring(
		0,
		clientData.cpfCnpj.length - 6
	)
	const cpfCnpjDigit = clientData.cpfCnpj.substring(
		clientData.cpfCnpj.length - 2
	)

	const cpfCnpjOrdem = clientData.cpfCnpj.substring(
		clientData.cpfCnpj.length - 6,
		clientData.cpfCnpj.length - 2
	)

	const cellphone = clientData.cellPhone.replace(
		CONSTANT.PHONENUMBER_CLEANUP_REGEX,
		''
	)

	const payload = {
		codigoOrigemBCP: CONSTANT.PESSOA_CODIGO_ORIGEM_BCP_HDV,
		nomeLegalPessoa: clientData.fullName,
		tipoPessoa: {
			codigoTipoPessoa: CONSTANT.PESSOA_CODIGO_TIPO_PESSOA_JURIDICA,
		},
		tipoSituacaoPessoaJuridica: {
			codigoTipoSituacaoPessoaJuridica:
				CONSTANT.PESSOA_CODIGO_TIPO_SITUACAO_PESSOA_JURIDICA_ATIVO,
		},
		tipoPessoaJuridica: {
			codigoTipoPessoaJuridica:
				CONSTANT.PESSOA_CODIGO_TIPO_PESSOA_JURIDICA_NAO_PORTO,
		},
		documentosIdentificacao: [
			{
				tipoDocumentoIdentificacao: {
					codigoTipoDocumentoIdentificacao:
						CONSTANT.PESSOA_CODIGO_TIPO_DOCUMENTO_IDENTIFICACAO_CNPJ,
				},
				numeroOrdemCnpjPessoa: cpfCnpjOrdem,
				numeroRaizCnpjPessoa: cpfCnpjBase,
				digitoCnpjPessoa: cpfCnpjDigit,
				orgaoExpedidorDocumento: {
					codigoOrgaoExpedidorDocumento:
						CONSTANT.PESSOA_CODIGO_ORGAO_EXPEDIDOR_RF,
				},
			},
		],
		enderecosEletronicos: [
			{
				tipoFinalidadeEnderecoEletronico: {
					codigoTipoFinalidadeEnderecoEletronico:
						CONSTANT.PESSOA_CODIGO_FINALIDADE_ENDERECO_ELETRONICO_PESSOAL,
				},
				textoEnderecoEletronico: clientData.email,
			},
		],
		telefones: [
			{
				codigoDDITelefone: CONSTANT.PESSOA_CODIGO_DDI_TELEFONE_BRASIL,

				codigoDDDTelefone: cellphone.substring(0, 2),
				numeroTelefone: cellphone.substring(2),

				tipoLinhaTelefonica: {
					codigoTipoLinhaTelefonica:
						CONSTANT.PESSOA_CODIGO_LINHA_TELEFONICA_MOVEL,
				},
				tipoFinalidadeTelefone: {
					codigoTipoFinalidadeTelefone:
						CONSTANT.PESSOA_CODIGO_FINALIDADE_TELEFONE_CELULAR,
				},
			},
		],
	}

	return payload
}

exports.getPayload = (clientData, fromCNPJ) => {
	if (Boolean(fromCNPJ)) {
		return getPayloadForCnpj(clientData)
	}
	return getPayloadForCpf(clientData)
}

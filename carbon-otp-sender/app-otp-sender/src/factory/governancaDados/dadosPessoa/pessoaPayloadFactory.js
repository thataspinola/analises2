const CONSTANT = require('../../../property')

exports.getPayload = (clientData) => {
	const cpfBase = clientData.taxvat.substring(0, clientData.taxvat.length - 2)
	const cpfDigit = clientData.taxvat.substring(clientData.taxvat.length - 2)

	const payload = {
		codigoOrigemBCP: CONSTANT.PESSOA_CODIGO_ORIGEM_BCP,
		nomeLegalPessoa: clientData.nome,
		tipoPessoa: {
			codigoTipoPessoa: CONSTANT.PESSOA_CODIGO_TIPO_PESSOA,
		},
		nomeSocialPessoaFisica: clientData.nomeSocial || '',
		documentosIdentificacao: [
			{
				tipoDocumentoIdentificacao: {
					codigoTipoDocumentoIdentificacao:
						CONSTANT.PESSOA_CODIGO_TIPO_DOCUMENTO_IDENTIFICACAO,
				},

				numeroRaizCpfPessoa: cpfBase,
				digitoCpfPessoa: cpfDigit,
				orgaoExpedidorDocumento: {
					codigoOrgaoExpedidorDocumento: CONSTANT.PESSOA_CODIGO_ORGAO_EXPEDIDOR,
				},
			},
		],
		enderecosEletronicos: [
			{
				tipoFinalidadeEnderecoEletronico: {
					codigoTipoFinalidadeEnderecoEletronico:
						CONSTANT.PESSOA_CODIGO_FINALIDADE_ENDERECO_ELETRONICO,
				},
				textoEnderecoEletronico: clientData.email,
			},
		],
		telefones: [
			{
				codigoDDITelefone: CONSTANT.PESSOA_CODIGO_DDI_TELEFONE,

				codigoDDDTelefone: clientData.celular.substring(0, 2),
				numeroTelefone: clientData.celular.substring(2),

				tipoLinhaTelefonica: {
					codigoTipoLinhaTelefonica: CONSTANT.PESSOA_CODIGO_LINHA_TELEFONICA,
				},
				tipoFinalidadeTelefone: {
					codigoTipoFinalidadeTelefone:
						CONSTANT.PESSOA_CODIGO_FINALIDADE_TELEFONE,
				},
			},
		],
	}

	return payload
}

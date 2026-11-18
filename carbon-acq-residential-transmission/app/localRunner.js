const handler = require('.')

const mockedLocalData = {
	body: JSON.stringify({
		numeroPedido: '00006',
		itens: [
			{
				escopo: 'travel',
				idItem: 1010,
				dadosAdicionais: {
					idCobranca: '5254203b-f7cd-4c53-b0c4-7319845a1838',
					idCartao: '9aa090b4-7b54-4b75-b47e-87de8385d159',
					numeroOrcamento: '570004',
					dataOperacao: '2022-08-26 08:00:00',
					estado: 'PAGA',
					valor: 108.52,
					bandeira: 'MASTERCARD',
					codigoFormaPagamento: 62,
					quantidadeParcelas: 5,
					idFormaPagamento: 'a0a0t000001jSQwAAM',
					propostas: [
						{
							numero: '01504196',
							tokenProposta: '',
						},
					],
				},
			},
			// {
			// 	escopo: 'life',
			// 	idItem: 1011,
			// 	dadosAdicionais: {
			// 		idCobranca: '5254203b-f7cd-4c53-b0c4-7319845a1838',
			// 		idCartao: '9aa090b4-7b54-4b75-b47e-87de8385d159',
			// 		numeroOrcamento: '570004',
			// 		dataOperacao: '2022-08-26 08:00:00',
			// 		estado: 'PAGA',
			// 		valor: 255.52,
			// 		bandeira: 'MASTERCARD',
			// 		codigoFormaPagamento: 62,
			// 		quantidadeParcelas: 5,
			// 		idFormaPagamento: 'b0a0t000001jSQwAAM',
			// 		propostas: [
			// 			{
			// 				numero: '01504196',
			// 				tokenProposta: '',
			// 			},
			// 		],
			// 	},
			// },
			// {
			// 	escopo: 'home',
			// 	idItem: 1012,
			// 	dadosAdicionais: {
			// 		codigoCanal: 58,
			// 		orcamento: {
			// 			susep: 'AR26YJ',
			// 			dataInicioVigencia: '10-02-2023',
			// 			dataFimVigencia: '10-02-2024',
			// 			codigoTipoResidencia: 2,
			// 			codigoPlanoPacote: 6,
			// 			codigoPlanoServico: 1329,
			// 		},
			// 		proposta: {
			// 			idExterno: '2707208909508',
			// 			numeroProposta: 1152071668,
			// 		},
			// 		segurado: {
			// 			nomeProponente: 'GOHAN',
			// 			tipoPessoa: 'F',
			// 			cpfCnpjProponente: '029468910-97',
			// 			dataNascimento: '26-12-1988',
			// 			tipoSexo: 'F',
			// 			codigoEstadoCivil: 1,
			// 			codigoFaixaRenda: 3,
			// 			codigoAtividadeProfissional: 160,
			// 			codigoNacionalidade: 1,
			// 			flagResidenteNacional: 'S',
			// 			codigoPessoaPoliticamenteExposta: 3,
			// 			contato: {
			// 				email: 'raul.seixas99999@email.com',
			// 				numeroDddTelefoneCelular: '11',
			// 				numeroTelefoneCelular: '911111111',
			// 			},
			// 			documentoIdentificacao: {
			// 				tipo: 2,
			// 				numero: '3332266000000',
			// 				orgaoExpedidor: 'SSP',
			// 				dataExpedicao: '03-02-2010',
			// 				dataValidade: '01-01-2025',
			// 			},
			// 			pep: {
			// 				nomePep: 'VIDEL',
			// 				cpfPep: '176381659-18',
			// 				grauRelacionamentoPep: 3,
			// 			},
			// 		},
			// 		objetoSeguro: {
			// 			logradouro: 'Praça Antônio Prado',
			// 			numero: '123',
			// 			bairro: 'Centro',
			// 			cidade: 'São Paulo',
			// 			complemento: 'apto 101',
			// 			uf: 'SP',
			// 			cep: '01010010',
			// 			tipoLogradouro: 'PC',
			// 		},
			// 		pagamento: {
			// 			codigoFormaPagamento: 62,
			// 			quantidadeParcelas: 4,
			// 			cartaoCredito: {
			// 				idCartao: '3dd2dd96-a48b-49c8-abb9e4b82c14',
			// 				cartaoPorto: false,
			// 				ultimosDigitos: 2459,
			// 				codigoBandeiraCartao: 1,
			// 			},
			// 		},
			// 		corretor: {
			// 			codigoOperacao: 115,
			// 			flagCopiaCorretor: 'S',
			// 		},
			// 	},
			// },
		],
	}),
}

handler
	.handler(mockedLocalData, {})
	.then((res) => {
		console.log('LOCAL res: ', JSON.stringify(res, null, 2))
	})
	.catch((err) => {
		console.log('LOCAL err: ', err)
	})

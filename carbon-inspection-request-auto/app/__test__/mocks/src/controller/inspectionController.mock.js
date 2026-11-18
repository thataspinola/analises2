const CONSTANTS = require('../../../../src/property')

const VALID_INPUT = {
	orderNumber: '00006',
	externalId: '00001',
	productCode: 61,
	scope: 'auto',
	amount: 100,
	contactEmail: 'teste@teste.com.br',
	installments: 1,
	leadIdentifier: '12345',
	charges: [
		{
			paymentMethod: 'CREDIT_CARD',
			amount: 300.0,
			creditCard: {
				id: '7dc64d75-63a7-46a0-8ed6-9ab11d52f3eb',
				preferred: true,
				saveCard: false,
			},
		},
	],
	integrationData: {
		numeroCotacao: '3000672475',
		codigoParceiro: CONSTANTS.PARTNER_CODE,
		orcamento: {
			codigo: 3,
			itens: [
				{
					veiculo: {
						placa: 'xyz1234',
						nomeBeneficiario: 'maria rosaria',
						chassi: 'abc123def456',
					},
				},
			],
			formaPagamentoEscolhida: {
				codigoFormaPagamento: 97,
				quantidadeParcelas: 12,
				flagCheckout: true,
				meioPagamento: {
					dadosCartao: {
						numeroCartao: null,
						mesValidade: 12,
						anoValidade: 2028,
						tipoClasseCalculoPremio: 2,
						bandeiraCartao: {
							codigoBandeiraCartao: 21,
						},
						nomeCartao: 'Joao da silva',
					},
				},
			},
		},
		segurado: {
			pessoa: {
				documentos: {
					numeroDocumento: '96914496846',
				},
				enderecos: [
                    {
                        bairro: "Jardim Filhos da Terra",
                        descricaoComplementoEndereco: null,
                        flagEndCorrespondencia: true,
                        nomeLogradouro: "R Cb PM J C R da Silva",
                        numeroCep: "02325",
                        numeroCepComplemento: "030",
                        numeroImovelLogradouro: "82",
                        tipoFinalidade: {
                            codigo: 1,
                            descricao: null
                        },
                        tipoLogradouro: 8
                    }
                ],
			},
		},
		idProductType: 31,
	},
}

exports.CONTROLLER_VALID_INPUT = () => {
	return VALID_INPUT
}

exports.CONTROLLER_VALID_INPUT_WITHOUT_PLATE = () => {
	const inputWithOutPlate = JSON.parse(JSON.stringify(VALID_INPUT))
	delete inputWithOutPlate.integrationData.orcamento.itens[0].veiculo.placa
	return inputWithOutPlate
}

exports.CONTROLLER_VALID_INPUT_WITHOUT_DATACARD = () => {
	let returnValue = JSON.parse(JSON.stringify(VALID_INPUT))
	const dados = {
		numeroCartao: null,
		mesValidade: 0,
		anoValidade: 0,
		tipoClasseCalculoPremio: 2,
		bandeiraCartao: {
			codigoBandeiraCartao: 21,
		},
		nomeCartao: null,
	}
	returnValue.integrationData.orcamento.formaPagamentoEscolhida.meioPagamento.dadosCartao =
		dados
	return returnValue
}

exports.CONTROLLER_VALID_INPUT_WITHOUT_CHASSI = () => {
	const inputWithOutPlate = JSON.parse(JSON.stringify(VALID_INPUT))
	delete inputWithOutPlate.integrationData.orcamento.itens[0].veiculo.chassi
	return inputWithOutPlate
}

exports.CONTROLLER_SUCCESS_RESPONSE = () => {
	return {
		body: 'Success',
		statusCode: 200,
	}
}

exports.VALID_ID_TRANSACTION = () => {
	return (
		`${VALID_INPUT.integrationData.numeroCotacao}` +
		`${VALID_INPUT.integrationData.orcamento.codigo}`
	)
}

const { handler } = require('../../')

const mockedLocalData = {
	Records: [
		{
			messageId: 123456789,
			body: JSON.stringify({
				customerName: 'José das Couves Pereira',
				proposalId: null,
				externalId: '58000000007370',
				productCode: 'eb12742c-0cd5-4a4c-ae37-6b3cf248bc6b',
				amount: 1,
				installments: 1,
				scope: 'phone',
				itemId: '3192',
				contactEmail: 'jose.pereira@portoseguro.com.br',
				paymentData: {
					tipo_documento_comercial: '01',
					endosso: '',
					codigo_empresa: '001',
					composicao_valor_parcela: '01',
					codigo_ramo: '171',
					parcela: '',
					contrato_comercial: '',
					evento_emissao: '01',
					flag_sinalizador_processo: 'O',
					flag_produto_seguro: 'S',
					codigo_agregador: '',
					codigo_modalidade: '434',
				},
				integrationData: {
					correlationId: 'a0fc6060-ad27-4559-8786-8dee32120d1c',
					vdoCode: '1704301942460',
					pacote: 4,
					codigoCanal: 58,
					proponente: {
						cpf: '86203960055',
						dataNascimento: '13/10/1987',
						nomePessoa: 'José das Couves Pereira',
						faixaRenda: '5',
						estadoCivil: '1',
						sexo: 'F',
						codigoOcupacao: 135,
						descricaoOcupacao: 'ACOUGUEIRO',
						enderecos: [
							{
								bairro: 'Recreio',
								cidade: 'Rio das Ostras',
								complemento: '',
								complementoCep: '350',
								latitude: 41.19301,
								logradouro: 'Rua Nova Iguaçu',
								longitude: 41.19301,
								numero: 123,
								numeroCep: '28895',
								tipoLogradouro: 'R',
								uf: 'RJ',
							},
						],
						telefone: 22992290616,
						tipoTelefone: 1,
						tipoPessoa: 'F',
						codigoTipoPessoa: 1,
						email: 'jose.pereira@portoseguro.com.br',
					},
					pagamento: {
						encargos: 0,
						iof: 94.83,
						juros: 0,
						parcela: 1,
						codigoPagamento: 62,
						valor: '1,379.76',
						valorReais: '1,379.76',
						cartao: {
							tokenCartao: 'd3d56cd1-e508-491f-8785-664537205bff',
							bandeira: 2,
						},
						numeroOrcamento: 58000000007370,
					},
				},
				leadIdentifier: '1704301942460',
				isOnline: false,
				status: 'PENDING',
				orderNumber: '000005334',
				charges: [
					{
						paymentMethod: 'CREDIT_CARD',
						amount: 1,
						creditCard: {
							id: 'd3d56cd1-e508-491f-8785-664537205bff',
							flag: 'MASTERCARD',
						},
					},
				],
				loggedCPF: '862.039.600-55',
			}),
		},
	],
}

handler(mockedLocalData)
	.then((response) => {
		console.log('SUCCESS: ', JSON.stringify(response, null, 2))
	})
	.catch((error) => {
		console.error('ERROR: ', error)
	})

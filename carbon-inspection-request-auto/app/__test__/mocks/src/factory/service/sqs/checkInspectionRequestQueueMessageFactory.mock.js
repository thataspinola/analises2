exports.GETMESSAGE_VALID_INPUT = () => {
	return {
		orderNumber: '00006',
		externalId: '00001',
		productCode: 61,
		scope: 'auto',
		amount: 100,
		contactEmail: 'teste@teste.com.br',
		installments: 1,
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
			orcamento: {
				codigo: 1,
				itens: [
					{
						tipoEnvioApolice: '1',
						veiculo: {
							placa: 'SNT0A01',
							chassi: '9BFZH55J0H8384623',
							renavam: 992110483,
							nomeBeneficiario: 'auto teste',
						},
					},
				],
				formaPagamentoEscolhida: {
					codigoFormaPagamento: 62,
					quantidadeParcelas: 6,
					flagCheckout: true,
					meioPagamento: {
						dadosCartao: {
							mesValidade: 8,
							anoValidade: 2027,
							bandeiraCartao: {
								codigoBandeiraCartao: 14,
							},
							tipoClasseCalculoPremio: 1,
							melhorDiaPagamento: 5,
							flagSeguroPerdaRoubo: 'N',
							nomeMae: 'mae do jose da silva',
							nomeCartao: 'jose da silva',
						},
					},
				},
			},
		},
	}
}

exports.GETMESSAGE_SUCCESS_RETURN = () => {
	const actualDate = new Date()
	return {
		amount: 100,
		charges: [
			{
				amount: 300,
				creditCard: {
					id: '7dc64d75-63a7-46a0-8ed6-9ab11d52f3eb',
					preferred: true,
					saveCard: false,
				},
				paymentMethod: 'CREDIT_CARD',
			},
		],
		contactEmail: 'teste@teste.com.br',
		externalId: '00001',
		idTransaction: '30006724753',
		inspectionRequestDate: actualDate.toISOString(),
		inspectionStatusProcessCount: 0,
		installments: 1,
		orderNumber: '00006',
		productCode: 61,
		scope: 'auto',
		inspectionStatus: 'PENDING',
		quotationNumber: '3000672475',
	}
}

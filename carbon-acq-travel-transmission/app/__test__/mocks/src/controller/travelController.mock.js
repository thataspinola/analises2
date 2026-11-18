exports.VALID_CONTROLLER_INPUT_REQUEST = (constructor = {}) => {
	return {
		orderNumber: '00006',
		orderPaymentId: '19283192983012-akjshdkjhasd-aksjdla',
		chargeId: 'alkjsdklajlskdjakljsdkl',
		scope: 'travel',
		itemId: 1010,
		contactEmail: 'teste@teste.com.br',
		status: 'PAGA',
		installments: 1,
		externalId: '00001',
		productCode: '18',
		amount: 100,
		integrationData: {
			idCartao: '198751dd-c3e1-4b28-9a08-f4e22161d357',
			numeroOrcamento: '00620217',
			dataOperacao: '2023-09-05T03:00:00.000Z',
			estado: 'PAGA',
			valor: 5455.06,
			bandeira: 'MASTERCARD',
			codigoFormaPagamento: 62,
			quantidadeParcelas: '1',
			opcaoPrecificacao: 0,
			idFormaPagamento: 'a0a0t000002RsveAAC',
			propostas: [{ numero: '01517758' }, { numero: '1801517759' }],
		},
		charges: [
			{
				paymentMethod: 'CREDIT_CARD',
				amount: 247.24,
				creditCard: {
					id: '1b1aa8bd-d3d7-4ea2-a979-57115949dfb8',
					flag: 'MASTERCARD',
				},
			},
		],
	}
}

exports.API_TRAVEL_VALID_REQUEST = () => {
	return {
		idCartao: '19283192983012-akjshdkjhasd-aksjdla',
		idCobranca: 'alkjsdklajlskdjakljsdkl',
		numeroOrcamento: '00620217',
		dataOperacao: '2023-09-05T03:00:00.000Z',
		estado: 'PAGA',
		valor: 5455.06,
		bandeira: 'MASTERCARD',
		codigoFormaPagamento: 62,
		quantidadeParcelas: '1',
		opcaoPrecificacao: 0,
		idFormaPagamento: 'a0a0t000002RsveAAC',
		propostas: [{ numero: '01517758' }, { numero: '01517759' }],
	}
}

exports.API_TRAVEL_SUCCESS_RESPONSE = () => {
	return {
		validacoes: {
			valido: true,
			mensagens: [
				{
					codigo: 'PR10',
					message:
						'Os vouchers das propostas também serão enviados por e-mail, assim como as apólices do seguros contratados',
				},
			],
		},
		propostas: [
			{
				numero: '1801504196',
				voucher: null,
			},
		],
		dataOperacao: '2023-06-30 09:01:12',
	}
}

exports.DEFAULT_SUCCESS_RESPONSE = (constructor = {}) => {
	return {
		statusCode: 200,
		body: {
			validacoes: {
				valido: true,
				mensagens: [
					{
						codigo: 'PR10',
						message:
							'Os vouchers das propostas também serão enviados por e-mail, assim como as apólices do seguros contratados',
					},
				],
			},
			propostas: [
				{
					numero: '1801504196',
					voucher: null,
				},
			],
			dataOperacao: '2023-06-30 09:01:12',
		},
	}
}

exports.CERTIFICATE = () => { 
	return 'CERTIFICATE'
}

exports.FAKE_TOKEN = () => {
	return '123456'
}
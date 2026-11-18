exports.GETPAYLOAD_VALID_RETURN = () => {
	return {
		origem: '20',
		proposta: '1131479',
		idTransacaoPagamento: '30006958801',
		codigoFormaPagamento: 62,
		quantidadeParcelas: 6,
		payment: {
			status: 'APPROVED',
			orderId: '8c931e0a-06ee-49df-b248-1f9db6223239',
			charges: [
				{
					id: '9cddfa67-30d3-4d53-b843-f12b2737d559',
				},
			],
		},
	}
}

exports.GETPAYLOAD_PARSEDSQSMESSAGE_INPUT = () => {
	return {
		amount: 100,
		chargeId: '9cddfa67-30d3-4d53-b843-f12b2737d559',
		charges: [
			{
				amount: 100,
				creditCard: {
					id: '7dc64d75-63a7-46a0-8ed6-9ab11d52f3eb',
					preferred: true,
					saveCard: false,
				},
				paymentMethod: 'CREDIT_CARD',
			},
		],
		contactEmail: 'teste@teste.com.br',
		externalId: '2001131479',
		installments: 1,
		integrationData: {
			orcamento: {
				formaPagamentoEscolhida: {
					codigoFormaPagamento: 62,
					quantidadeParcelas: 6,
				},
			},
		},
		orderNumber: '00006',
		orderPaymentId: '8c931e0a-06ee-49df-b248-1f9db6223239',
		productCode: '61',
		proposalId: '1131479',
		scope: 'auto',
		status: 'PAGA',
		transactionId: '30006958801',
	}
}

exports.PROCESS_SUCCESS_RETURN = () => {
	return {
		status: 'status',
	}
}

exports.PROCESS_VALID_MESSAGEID_INPUT = () => {
	return 'fc76aa22-a863-4df9-9763-37ab999a3866'
}

exports.PROCESS_VALID_PARSEDMESSAGEBODY_INPUT = () => {
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
		externalId: '201131479',
		installments: 1,
		integrationData: {
			orcamento: {
				formaPagamentoEscolhida: {
					codigoFormaPagamento: 62,
					quantidadeParcelas: 6,
				},
			},
		},
		orderNumber: '3000662188',
		orderPaymentId: '8c931e0a-06ee-49df-b248-1f9db6223239',
		productCode: '61',
		proposalId: '1131479',
		scope: 'auto',
		status: 'PAGA',
		transactionId: '30006958801',
	}
}

exports.INPUT_REQUEST_SIMPLE_PAYLOAD = (constructor = {}) => {
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
	}
}

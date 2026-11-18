const VALID_INPUT_VALUE = {
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
		idCartao: '198751dd-c3e1-4b28-9a08-f4e22161d357',
		numeroOrcamento: '00620217',
		dataOperacao: '2023-09-05T03:00:00.000Z',
		valor: 5455.06,
		bandeira: 'MASTERCARD',
		codigoFormaPagamento: 62,
		quantidadeParcelas: '1',
		opcaoPrecificacao: 0,
		idFormaPagamento: 'a0a0t000002RsveAAC',
		propostas: [{ numero: '01517758' }, { numero: '1801517759' }],
	},
}

exports.VALID_INPUT = () => {
	return VALID_INPUT_VALUE
}

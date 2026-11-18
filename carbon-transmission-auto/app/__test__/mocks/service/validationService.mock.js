exports.VALID_INPUT_DATA = () => {
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
exports.VALIDATION_SCHEMA = () => {
	return {
		type: 'object',
		properties: {
			amount: { type: 'number' },
			chargeId: { type: 'string' },
			charges: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						amount: { type: 'number' },
						creditCard: {
							type: 'object',
							properties: {
								id: { type: 'string' },
								preferred: { type: 'boolean' },
								saveCard: { type: 'boolean' },
							},
							required: [],
						},
						paymentMethod: { type: 'string' },
					},
					required: [],
				},
			},
			contactEmail: { type: 'string', format: 'email' },
			externalId: { type: 'string' },
			installments: { type: 'number', minimum: 1 },
			integrationData: {
				type: 'object',
				properties: {
					orcamento: {
						type: 'object',
						properties: {
							formaPagamentoEscolhida: {
								type: 'object',
								properties: {
									codigoFormaPagamento: { type: 'number' },
									quantidadeParcelas: { type: 'number' },
								},
								required: ['codigoFormaPagamento', 'quantidadeParcelas'],
							},
						},
						required: ['formaPagamentoEscolhida'],
					},
				},
				required: ['orcamento'],
			},
			orderNumber: { type: 'string' },
			orderPaymentId: { type: 'string' },
			productCode: { type: 'string' },
			proposalId: { type: 'string' },
			scope: { type: 'string' },
			status: { type: 'string' },
			transactionId: { type: 'string' },
		},
		required: [
			'amount',
			'chargeId',
			'charges',
			'contactEmail',
			'externalId',
			'installments',
			'integrationData',
			'orderNumber',
			'orderPaymentId',
			'productCode',
			'proposalId',
			'scope',
			'status',
			'transactionId',
		],
	}
}
exports.INVALID_INPUT_DATA_MISSING_PROPERTY = () => {
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
	}
}
exports.INVALID_INPUT_DATA_MISSING_PROPERTY_NAME = () => {
	return 'transactionId'
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY = () => {
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
		status: false,
		transactionId: '30006958801',
	}
}
exports.INVALID_INPUT_DATA_WRONG_TYPE_PROPERTY_NAME = () => {
	return 'status'
}
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY = () => {
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
		installments: null,
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
exports.INVALID_INPUT_DATA_WRONG_SIZE_PROPERTY_NAME = () => {
	return 'installments'
}

exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY = () => {
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
		contactEmail: 'testeteste.com.br',
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
exports.INVALID_INPUT_DATA_WRONG_FORMAT_PROPERTY_NAME = () => {
	return 'contactEmail'
}

exports.VALID_INPUT_PAYLOAD = () => {
	return {
		Records: [
			{
				messageId: '1234567890',
				receiptHandle: 'MessageReceiptHandle',
				body: JSON.stringify({
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
				}),
				attributes: {
					ApproximateReceiveCount: '1',
					SentTimestamp: '1523232000000',
					SenderId: '123456789012',
					ApproximateFirstReceiveTimestamp: '1523232000001',
				},
				messageAttributes: {},
				md5OfBody: '{{{md5_of_body}}}',
				eventSource: 'aws:sqs',
				eventSourceARN: 'arn:aws:sqs:ca-central-1:123456789012:MyQueue',
				awsRegion: 'ca-central-1',
			},
		],
	}
}

exports.INVALID_INPUT_PAYLOAD = () => {
	return {
		Records: [
			{ messageId: `1313991234`, body: JSON.stringify({ foo: 'bar' }) },
			{ messageId: `1234567890`, body: 'Not a JSON string' },
		],
	}
}

exports.SUCCESS_RETURN = () => {
	return {
		batchItemFailures: [],
	}
}

exports.FAIL_RETURN = () => {
	return {
		batchItemFailures: [
			{
				itemIdentifier: '1234567890',
			},
		],
	}
}

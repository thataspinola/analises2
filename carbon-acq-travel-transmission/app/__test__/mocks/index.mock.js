const mockNotification = (events) => {
	let records = []
	for (const event of events) {
		const response = {
			messageId: `1234567890`,
			receiptHandle: 'MessageReceiptHandle',
			body: JSON.stringify(event),
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
		}

		records.push(response)
	}

	return {
		Records: records,
	}
}

exports.VALID_INDEX_INPUT_REQUEST = (constructor = {}) => {
	return mockNotification([
		{
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
		},
	])
}

exports.INVALID_INDEX_INPUT_REQUEST = (constructor = {}) => {
	return {
		Records: [
			{ messageId: `1313991234`, body: JSON.stringify({ foo: 'bar' }) },
			{ messageId: `1234567890`, body: 'Not a JSON string' },
		],
	}
}

exports.CONTROLLER_SUCCESS_RESPONSE = (constructor = {}) => {
	return {
		statusCode: 200,
		body: constructor.body,
	}
}

exports.INDEX_SUCCESS_RESPONSE = (constructor = {}) => {
	return {
		batchItemFailures: [],
	}
}

exports.INDEX_ERROR_RESPONSE = (constructor = {}) => {
	return {
		batchItemFailures: [{ itemIdentifier: '1234567890' }],
	}
}

exports.CONTEXT = () => {
	return {}
}

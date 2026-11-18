exports.HANDLER_INVALID_REQUEST_INPUT_DATA = (constructor = {}) => {
	return {
		Records: [
			{ messageId: `1313991234`, body: JSON.stringify({ foo: 'bar' }) },
			{ messageId: `1234567890`, body: 'Not a JSON string' },
		],
	}
}

exports.HANDLER_REQUEST_SUCCESS_RETURN = () => {
	return {
		batchItemFailures: [],
	}
}

exports.HANDLER_REQUEST_ERROR_RETURN = () => {
	return {
		batchItemFailures: [
			{
				itemIdentifier: '1234567890',
			},
		],
	}
}

exports.CONTROLLER_SUCCESS_RESPONSE = () => {
	return {
		statusCode: 200,
		body: CONTROLLER_SUCCESS_RETURN_BODY_VALUE,
	}
}

exports.HANDLER_VALID_REQUEST_INPUT_DATA = () => {
	return mockInspectionRequest([
		{
			codigoCanal: 83,
			tipoDocumento: 'CPF',
			documento: '00000017400',
			codigoCampanha: '86',
		},
	])
}

const mockInspectionRequest = (events) => {
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

const CONTROLLER_SUCCESS_RETURN_BODY_VALUE = {
	codigoOferta: '9cdbd131-6963-4fda-9cfd-7d121e3ab2e6',
	codigoCanal: 83,
	tipoDocumento: 'CPF',
	documento: '05636844964',
	situacao: 'Incluída',
	dataHoraInclusao: '2023-11-17T13:16:37.713Z',
	dataHoraValidadeOferta: '2023-11-17T14:16:31.973Z',
	elegibilidade: {
		codigoElegibilidade: '2be8c653-6e6f-42e7-98a4-b7bb44728b6e',
		produtos: [
			{
				codigoProduto: 1,
				nomeProduto: 'Cartao',
				propensao: 0,
				valor: null,
				valorDesconto: 0,
			},
			{
				codigoProduto: 8,
				nomeProduto: 'Tag ConnectCar',
				propensao: 0,
				valor: null,
				valorDesconto: 0,
			},
		],
	},
	valorTransacao: 0,
}

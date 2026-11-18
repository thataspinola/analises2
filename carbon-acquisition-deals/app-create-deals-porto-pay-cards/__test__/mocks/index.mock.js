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

const CONTROLLER_SUCCESS_RETURN_BODY_VALUE = [
	{
		idCartao: '018828ed-8c8d-3245-9853-ebbb5c546eea',
		numeroCartao: '415274XXXXXX9119',
		bandeira: 'VISA',
		cartaoPorto: true,
		cartaoOculto: false,
	},
]

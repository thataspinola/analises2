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
		riskScore: 0,
		accountNumber: 10406,
		accountCreationDate: 20201007,
		aditionalCard: 'N',
		cardNumber: '412177XXXXXX2112',
		accountScore: 0,
		dueDate: 0,
		expirationDateCrypt: 'SkGJ2wo/88PaqsC6bY10bw==',
		expirationDate: 202310,
		cvvNumberCrypt: 'NH6ICXHYW7jmToibkHVrwQ==',
		cycleDate: 26,
		cardStatus: 'M',
		accountStatus1: '',
		product: 1,
		accountStatus2: '',
		behaviourScore: 0,
		goodCard: 'S',
		cardNumberCrypt: 'bI7jQXtI7yRTJzSVKm7L2+SbdNAik92b0VHiuGqLu5M=',
	},
]

exports.VALID_INPUT_REQUEST = () => {
	return {
		Records: [
			{
				messageId: `1234567890`,
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
				receiptHandle: 'MessageReceiptHandle',
				body: JSON.stringify({
					codigo_vdo: '1234456',
					pmc_observacoes: 'Produto precisa de vistoria',
					id_ramo: '23456788',
				}),
			},
		],
	}
}

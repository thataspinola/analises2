exports.getPayload = (queueRecordsBody) => {
	const queueRecords = []
	for (const queueRecordBody of queueRecordsBody) {
		const currentDateTime = new Date()
		const queueRecord = {
			messageId: ``,
			receiptHandle: 'MessageReceiptHandle',
			body: queueRecordBody,
			attributes: {
				ApproximateReceiveCount: '1',
				SentTimestamp: `${currentDateTime.getTime() - 8754}`,
				SenderId: '791702935403',
				ApproximateFirstReceiveTimestamp: `${currentDateTime.getTime() - 7000}`,
			},
			messageAttributes: {},
			eventSource: 'aws:sqs',
			eventSourceARN:
				'arn:aws:sqs:ca-central-1:791702935403:carbon-support-lead',
			awsRegion: 'ca-central-1',
		}

		queueRecords.push(queueRecord)
	}

	return {
		Records: queueRecords,
	}
}

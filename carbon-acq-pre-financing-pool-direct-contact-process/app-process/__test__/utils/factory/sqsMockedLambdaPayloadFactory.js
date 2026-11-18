const nodeCrypto = require('node:crypto')

exports.getPayload = (queueRecordsBody) => {
	const queueRecords = []
	for (const queueRecordBody of queueRecordsBody) {
		const currentDateTime = new Date()
		const queueRecord = {
			messageId: `${nodeCrypto.randomUUID()}`,
			receiptHandle: 'MessageReceiptHandle',
			body: queueRecordBody,
			attributes: {
				ApproximateReceiveCount: '1',
				SentTimestamp: `${currentDateTime.getTime() - 8754}`,
				SenderId: '791702935403',
				ApproximateFirstReceiveTimestamp: `${currentDateTime.getTime() - 7000}`,
			},
			messageAttributes: {},
			md5OfBody: nodeCrypto
				.createHash('md5')
				.update(queueRecordBody)
				.digest('hex'),
			eventSource: 'aws:sqs',
			eventSourceARN:
				'arn:aws:sqs:ca-central-1:791702935403:carbon-acq-pre-financing-pool-direct-contact-requests',
			awsRegion: 'ca-central-1',
		}

		queueRecords.push(queueRecord)
	}

	return {
		Records: queueRecords,
	}
}

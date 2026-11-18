const nodeCrypto = require('node:crypto')

const getQueueRecord = (
	queueRecordBody,
	currentDateTime,
	senderId,
	awsRegion,
	awsUserId,
	queueName,
	queueRecordMessageAttributes
) => {
	const queueRecordBodyJsonString = JSON.stringify(queueRecordBody)
	const queueRecord = {
		messageId: `${nodeCrypto.randomUUID()}`,
		receiptHandle: 'MessageReceiptHandle',
		body: queueRecordBodyJsonString,
		attributes: {
			ApproximateReceiveCount: '1',
			SentTimestamp: `${currentDateTime.getTime() - 8754}`,
			SenderId: senderId,
			ApproximateFirstReceiveTimestamp: `${currentDateTime.getTime() - 7000}`,
		},
		messageAttributes: queueRecordMessageAttributes ?? {},
		md5OfBody: nodeCrypto
			.createHash('md5')
			.update(queueRecordBodyJsonString)
			.digest('hex'),
		eventSource: 'aws:sqs',
		eventSourceARN: `arn:aws:sqs:${awsRegion}:${awsUserId}:${queueName}`,
		awsRegion: awsRegion,
	}

	return queueRecord
}

exports.getPayloadFromSqs = (
	queueRecordsBody = [],
	senderId,
	awsRegion,
	awsUserId,
	queueName
) => {
	const queueRecords = []
	for (const queueRecordBody of queueRecordsBody) {
		const currentDateTime = new Date()
		const queueRecord = getQueueRecord(
			queueRecordBody,
			currentDateTime,
			senderId,
			awsRegion,
			awsUserId,
			queueName
		)
		queueRecords.push(queueRecord)
	}

	return {
		Records: queueRecords,
	}
}

const getQueueMessageAttributes = (currentDateTime, customAttributes) => {
	return {
		eventTime: `${currentDateTime.getTime() - 61000}`,
		...customAttributes,
	}
}

exports.getQueueMessageAttributes = getQueueMessageAttributes

exports.getQueueMessage = (messageAttributes, messagePayload) => {
	const queueMessage = {
		...messageAttributes,
		payload: messagePayload,
	}
	return queueMessage
}

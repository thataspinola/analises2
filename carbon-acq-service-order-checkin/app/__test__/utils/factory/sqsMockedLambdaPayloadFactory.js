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

exports.getPayload = (
	queueRecordsBody,
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

const getConsentsSnsMessageAttributes = (
	currentDateTime,
	pescod,
	eventType
) => {
	const snsMessageAttributes = {
		eventTime: `${currentDateTime.getTime() - 61000}`,
		eventId: `${pescod}`,
		eventType: `${eventType}`,
	}
	return snsMessageAttributes
}

exports.getConsentsSnsMessageAttributes = getConsentsSnsMessageAttributes

exports.getConsentsSnsMessage = (messageAttributes, messagePayload) => {
	const snsMessage = {
		...messageAttributes,
		payload: messagePayload,
	}
	return snsMessage
}

const getSnsGeneratedQueueRecordBody = (
	currentDateTime,
	awsRegion,
	awsUserId,
	topicName,
	snsMessage
) => {
	const queueRecordBody = {
		Type: 'Notification',
		MessageId: `${nodeCrypto.randomUUID()}`,
		TopicArn: `arn:aws:sns:${awsRegion}:${awsUserId}:${topicName}`,
		Message: snsMessage,
		Timestamp: `${currentDateTime.getTime() - 60000}`,
		SignatureVersion: '1',
		Signature:
			'AcjXaZA967H2KAwwGM/X7gVNyWDTl83GztPQw5/toBQwfn90K25jtDaZ2L338yhQpNAXM++FgnJVY/vbsA9CisdOMASaw1Ca1AhxV+FvyhtQ8aHmUNYC4+Y94BJYGe+Ov56BCsoz4R9elqEMotzLnwjGL4Jowetmi4Qbcf7Jbk09rbU2s817YUfvZPEDh9BLv45V7760CJoyJAKQQSJF2r8u+zRIZ/wFAHDmi/z0XRZ94iiKBIqxfVR04wcsIT+W+bShYiQK0Y3BEaXq6yIpwFj/CEIUBGbXmJdi07do6djOwEbbnG5Zl6ICYMhn8oW8CtyTJpPY6kLMi6LLN7TT9g==', //Fake value
		SigningCertURL: `https://sns.${awsRegion}.amazonaws.com/SimpleNotificationService-60eadc530605d63b8e62a523676ef735.pem`,
		UnsubscribeURL: `https://sns.${awsRegion}.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:${awsRegion}:${awsUserId}:${topicName}:${nodeCrypto.randomUUID()}`,
	}
	return queueRecordBody
}
exports.getSnsGeneratedQueueRecordBody = getSnsGeneratedQueueRecordBody

exports.getPayloadFromSnsTopic = (
	snsTopicMessages,
	senderId,
	awsRegion,
	awsUserId,
	queueName,
	topicName
) => {
	const queueRecords = []
	for (const snsTopicMessage of snsTopicMessages) {
		const currentDateTime = new Date()
		const queueRecordBody = getSnsGeneratedQueueRecordBody(
			currentDateTime,
			awsRegion,
			awsUserId,
			topicName,
			snsTopicMessage.Message
		)
		const queueRecordAttributes = snsTopicMessage.Attributes ?? {}
		const queueRecord = getQueueRecord(
			queueRecordBody,
			currentDateTime,
			senderId,
			awsRegion,
			awsUserId,
			queueName,
			queueRecordAttributes
		)
		queueRecords.push(queueRecord)
	}

	return {
		Records: queueRecords,
	}
}

exports.getSnsTopicMessage = (Message, Attributes) => {
	let snsTopicMessage = {
		Message: JSON.stringify(Message),
	}
	if (Attributes) {
		snsTopicMessage = {
			...snsTopicMessage,
			Attributes,
		}
	}
	return snsTopicMessage
}

const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')

const CONSTANT = require('../../property')

const sqsClient = new SQSClient({ region: CONSTANT.AWS_REGION })

exports.sendMessage = async (message) => {
	const params = {
		DelaySeconds: 0,
		MessageAttributes: null,
		MessageBody: JSON.stringify(message),
		QueueUrl: CONSTANT.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL,
	}

	const response = await sqsClient.send(new SendMessageCommand(params))

	return response?.MessageId
}

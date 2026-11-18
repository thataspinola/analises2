const CONSTANT = require('../../property')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const sqsClient = new SQSClient({ region: CONSTANT.AWS_REGION })

exports.sendMessage = async (message, queueUrl) => {
	const params = {
		DelaySeconds: 0,
		MessageAttributes: null,
		MessageBody: JSON.stringify(message),
		QueueUrl: queueUrl,
	}
	const response = await sqsClient.send(new SendMessageCommand(params))
	return response?.MessageId
}

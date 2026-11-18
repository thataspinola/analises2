const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const CONSTANT = require('../property')
const service = require('../service')

const sqsClient = new SQSClient({ region: CONSTANT.AWS_REGION })

module.exports.send = async (message) => {
	const params = {
		DelaySeconds: 5,
		MessageAttributes: null,
		MessageBody: JSON.stringify(message),
		QueueUrl: CONSTANT.INSPECTION_CELLPHONE_DLQ,
	}

	const response = await sqsClient.send(new SendMessageCommand(params))

	return response.MessageId
}

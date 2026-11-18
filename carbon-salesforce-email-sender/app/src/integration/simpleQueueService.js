const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const CONSTANTS = require('../property')

const sqsClient = new SQSClient({ region: CONSTANTS.AWS_REGION })

module.exports.sendMessage = async (message) => {
	const params = {
		DelaySeconds: CONSTANTS.SQS_DELAY_MESSAGE,
		MessageBody: JSON.stringify(message),
		QueueUrl: CONSTANTS.SALESFORCE_EMAIL_SENDER_QUEUE,
	}

	const command = new SendMessageCommand(params)
	const response = await sqsClient.send(command)
	return response.MessageId
}

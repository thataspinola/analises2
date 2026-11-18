const CONSTANT = require('../../property')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const sqsClient = new SQSClient({ region: CONSTANT.AWS_REGION })
/**
 * Function to send message to queue
 * @param {Object} message message to be sent
 * @returns {String} message id
 */
exports.sendMessage = async (message) => {
	const params = {
		DelaySeconds: 0,
		MessageAttributes: null,
		MessageBody: JSON.stringify(message),
		QueueUrl: CONSTANT.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL,
	}
	const response = await sqsClient.send(new SendMessageCommand(params))
	return response?.MessageId ?? null
}

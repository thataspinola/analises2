const CONSTANTS = require('../../property')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const sqsClient = new SQSClient({ region: CONSTANTS.AWS_REGION })
/**
 * Function to send message to queue
 * @param {Object} message message to be sent
 * @returns {String} message id
 */
exports.sendMessage = async (message, queueUrl) => {
	const params = {
		DelaySeconds: 0,
		MessageAttributes: null,
		MessageBody: JSON.stringify(message),
		QueueUrl: queueUrl,
	}
	const response = await sqsClient.send(new SendMessageCommand(params))
	return response?.MessageId ?? null
}

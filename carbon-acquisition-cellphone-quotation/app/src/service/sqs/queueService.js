const CONSTANT = require('../../property')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const sqsClient = new SQSClient({ region: CONSTANT.AWS_REGION })
/**
 * Function to send message to queue
 * @param {Object} message message to be sent
 * @param {String} queueUrl queue url
 * @returns {String} message id
 */
exports.sendMessage = async (message, queueUrl) => {
	const params = {
		DelaySeconds: 5,
		MessageAttributes: null,
		MessageBody: JSON.stringify(message),
		QueueUrl: queueUrl,
	}
	const response = await sqsClient.send(new SendMessageCommand(params))
	return response.MessageId
}

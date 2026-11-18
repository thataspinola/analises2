const CONSTANT = require('../../property')
const clientSQS = require('@aws-sdk/client-sqs')

/**
 * Function to send message to queue
 * @param {Object} message message to be sent
 * @returns {String} message id
 */
exports.sendMessage = async (message, queueUrl) => {
	const sqsClient = new clientSQS.SQSClient({ region: CONSTANT.AWS_REGION })
	const params = {
		DelaySeconds: 0,
		MessageAttributes: null,
		MessageBody: JSON.stringify(message),
		QueueUrl: queueUrl,
	}
	const response = await sqsClient.send(new clientSQS.SendMessageCommand(params))
	return response
}

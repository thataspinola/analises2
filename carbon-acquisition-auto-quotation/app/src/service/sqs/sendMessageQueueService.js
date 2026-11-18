const { logger } = require('../../../config')
const CONSTANT = require('../../property')
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs')
const sqsClient = new SQSClient({ region: CONSTANT.AWS_REGION })
/**
 * Function to send message to SQS Inspection Status Gather Queue
 * @param {object} message message to be sent
 * @param {number} messageDelay message to be sent
 * @returns {string|null} Sent message id
 */
exports.sendMessage = async (message, queueUrl) => {
	const params = {
		MessageAttributes: null,
		MessageBody: JSON.stringify(message),
		QueueUrl: queueUrl,
	}

	logger.info(
		{ ...params, MessageBody: JSON.parse(params.MessageBody) },
		'Parametros enviados'
	)
	const sendMessageCommand = new SendMessageCommand(params)
	const response = await sqsClient.send(sendMessageCommand)
	return response?.MessageId ?? null
}

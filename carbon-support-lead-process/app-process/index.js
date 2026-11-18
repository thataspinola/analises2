const controller = require('./src/controller')
const service = require('./src/service')
const CONSTANTS = require('./src/property')

const lambdaHandler = async (event) => {
	const recordPromises = event.Records.map((record, index) => {
		return new Promise((resolve, reject) => {
			try {
				const parsedRequestMessageBody = JSON.parse(record.body)
				controller.leadController.process(parsedRequestMessageBody)
					.then(resolve)
					.catch(reject)
			} catch (error) {
				service.logger.error(`${CONSTANTS.MESSAGES.HANDLER.PROCESSING_ERROR} ${error.message}`)
				reject(error)
			}
		})
	})
	const response = await Promise.allSettled(recordPromises)
	const batchItemFailures = []
	for (const [idx, record] of Object.entries(event.Records)) {
		const { status, reason } = response[idx]
		if (status === 'fulfilled') continue
		batchItemFailures.push({
			itemIdentifier: record.messageId,
		})
	}
	return {
		batchItemFailures,
	}
}

module.exports.handler = lambdaHandler

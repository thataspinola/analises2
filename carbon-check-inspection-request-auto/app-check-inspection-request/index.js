const { logger } = require('./src/service')
const { checkInspectionRequest } = require('./src/controller')
const { inputBody } = require('./src/factory')

const lambdaHandler = async (event) => {
	logger.info(event, 'EVENTO RECEBIDO')
	
	const recordPromises = event.Records.map((record) => {
		return new Promise((resolve, reject) => {
			try {
				const parsedRequestMessageBody = inputBody.getBody(record)
				checkInspectionRequest
					.process(parsedRequestMessageBody)
					.then(resolve)
					.catch(reject)
			} catch (error) {
				logger.error(`Processing JSON parse error:  ${error.message}`)
				reject(new Error(error.message))
			}
		})
	})

	const response = await Promise.allSettled(recordPromises)

	const batchItemFailures = []
	for (const [idx, record] of Object.entries(event.Records)) {
		const { status } = response[idx]

		if (status === 'fulfilled') continue

		batchItemFailures.push({
			itemIdentifier: record.messageId || record.dynamodb.SequenceNumber,
		})
	}
	
	return {
		batchItemFailures,
	}
}

module.exports.handler = lambdaHandler

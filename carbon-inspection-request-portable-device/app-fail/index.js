const controller = require('./src/controller')
const service = require('./src/service')

const lambdaHandler = async (event) => {
	const recordPromises = event?.Records?.map(async (record, _index) => {
		return new Promise((resolve, reject) => {
			try {
				const parsedInput = JSON.parse(record.body)
				service.logger.info(parsedInput, 'EVENTO RECEBIDO')
				controller.inspectionFail
					.process(parsedInput)
					.then(resolve)
					.catch(reject)
			} catch (error) {
				service.logger.error(
					`Error processing the message with id ${record.messageId}: ${error.message}`
				)
				reject(error)
			}
		})
	})

	const responses = await Promise.allSettled(recordPromises)

	const batchItemFailures = []
	for (const [idx, record] of Object.entries(event.Records)) {
		const { status } = responses[idx]
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

const controller = require('./src/controller')
global.logger = require('./config/logger')

const lambdaHandler = async (event) => {
	const recordPromises = event.Records.map(async (record, index) => {
		return new Promise((resolve, reject) => {
			try {
				const parsedInput = JSON.parse(record.body)
				logger.info(parsedInput, 'EVENTO RECEBIDO')
				controller.inspection.process(parsedInput).then(resolve).catch(reject)
			} catch (error) {
				logger.error(`Error to parse input message: ${record.body}`)
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

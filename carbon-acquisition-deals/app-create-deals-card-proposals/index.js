const controller = require('./src/controller')
const service = require('./src/service')

module.exports.handler = async (event) => {
	const records = event.Records.map(async (record, index) => {
		return new Promise((resolve, reject) => {
			try {
				service.logger.info(`EVENTO RECEBIDO: ${record.body}`)

				const parsedInput = JSON.parse(record.body)

				controller.cardProposalsController
					.process(parsedInput)
					.then(resolve)
					.catch(reject)
			} catch (error) {
				service.logger.error(`Error to parse input message: ${record.body}`)
				reject(error)
			}
		})
	})

	const response = await Promise.allSettled(records)

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

const controller = require('./src/controller')
const service = require('./src/service')
const nodeCrypto = require('node:crypto')

const lambdaHandler = async (event) => {
	const recordPromises = event.Records.map((record, index) => {
		let carbonTraceId = null
		return new Promise((resolve, reject) => {
			try {
				const parsedRequestMessageBody = JSON.parse(record.body)

				if (
					parsedRequestMessageBody.carbonTraceId &&
					typeof parsedRequestMessageBody.carbonTraceId === 'string'
				) {
					carbonTraceId = parsedRequestMessageBody.carbonTraceId
				} else {
					carbonTraceId = `${nodeCrypto.randomUUID()}`
				}

				controller.failedRequest
					.process(parsedRequestMessageBody, carbonTraceId)
					.then(resolve)
					.catch(reject)
			} catch (error) {
				service.logger.error(`Processing JSON parse error: ${error.message}`)
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

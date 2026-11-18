const controller = require('./src/controller')
const service = require('./src/service')

async function processRecord(record) {
	try {
		service.logger.info({ inputMessage: record.body }, `EVENTO RECEBIDO`)

		const emailRequest = JSON.parse(record.body)
		await controller.inspectionFail.processInspectionFail(emailRequest)
	} catch (error) {
		service.logger.error(
			`Error processing the message with id ${record.messageId}: ${error.message}`
		)
		throw error
	}
}

module.exports.handler = async (event) => {
	const recordPromises = event?.Records?.map(processRecord) || []
	const responses = await Promise.allSettled(recordPromises)
	const batchItemFailures = responses.reduce((accumulator, response, index) => {
		const record = event.Records[index]
		if (response.status === 'rejected') {
			accumulator.push({ itemIdentifier: record.messageId })
		}
		return accumulator
	}, [])
	return {
		batchItemFailures,
	}
}

const controller = require('./src/controller')
const service = require('./src/service')

const parseRequestBody = (body) => {
	if (typeof body !== 'string') {
		throw new Error('Input must be a string')
	}
	try {
		service.logger.info('Dados recebidos: ' + body)
		return JSON.parse(body)
	} catch (error) {
		throw new Error('Input must be a valid JSON')
	}
}

async function processRecord(record) {
	try {
		const jsonParsedMessage = parseRequestBody(record.body)
		await controller.updateLead.processSqsMessage(jsonParsedMessage)
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

const controller = require('./src/controller')
const service = require('./src/service')

async function processRecord(record, awsRequestId) {
	const logContext = { awsRequestId, messageId: record.messageId }
	try {
		service.logger.info(logContext, 'Mensagem de falha de vistoria recebida')

		const emailRequest = JSON.parse(record.body)
		await controller.inspectionFail.processInspectionFail(emailRequest, logContext)
		service.logger.info(logContext, 'Processamento da falha de vistoria concluído')
	} catch (error) {
		service.logger.error(
			logContext,
			'Falha no processamento da mensagem de vistoria'
		)
		throw error
	}
}

module.exports.handler = async (event, context) => {
	if (!Array.isArray(event?.Records)) {
		throw new Error('Evento SQS inválido: Records deve ser uma lista')
	}
	const recordPromises = event.Records.map(record => processRecord(record, context?.awsRequestId))
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


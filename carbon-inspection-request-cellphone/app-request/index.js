const controller = require('./src/controller')
const logger = require('./config/logger')

const lambdaHandler = async (event, context) => {
	if (!Array.isArray(event?.Records)) {
		throw new Error('Evento SQS inválido: Records deve ser uma lista')
	}
	const recordPromises = event.Records.map(async (record) => {
		const logContext = { awsRequestId: context?.awsRequestId, messageId: record.messageId }
		let operation = 'parse_message'
		try {
			const parsedInput = JSON.parse(record.body)
			logger.info(logContext, 'Mensagem de vistoria recebida')
			operation = 'process_inspection'
			await controller.inspection.process(parsedInput, logContext)
		} catch (error) {
			logger.error({ ...logContext, operation }, 'Falha no processamento da mensagem de vistoria')
			throw error
		}
	})

	const response = await Promise.allSettled(recordPromises)

	const batchItemFailures = []
	for (const [idx, record] of Object.entries(event.Records)) {
		const { status } = response[idx]
		const logContext = { awsRequestId: context?.awsRequestId, messageId: record.messageId }
		if (status === 'fulfilled') {
			logger.info(logContext, 'Processamento da vistoria concluído')
			continue
		}
		logger.error(logContext, 'Mensagem de vistoria será reprocessada')

		batchItemFailures.push({
			itemIdentifier: record.messageId,
		})
	}

	return {
		batchItemFailures,
	}
}

module.exports.handler = lambdaHandler


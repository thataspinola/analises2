const controller = require('./src/controller')
const logger = require('./config/logger')

const lambdaHandler = async (event, context) => {
	const recordPromises = event.Records.map(async (record, index) => {
		return new Promise((resolve, reject) => {
			try {
				const parsedInput = JSON.parse(record.body)
				const logContext = { awsRequestId: context?.awsRequestId, messageId: record.messageId }
				logger.info(logContext, 'Mensagem de vistoria recebida')
				controller.inspection.process(parsedInput, logContext).then(resolve).catch(reject)
			} catch (error) {
				logger.error({ awsRequestId: context?.awsRequestId, messageId: record.messageId, operation: 'parse_message' }, 'Falha ao interpretar mensagem de vistoria')
				reject(error)
			}
		})
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


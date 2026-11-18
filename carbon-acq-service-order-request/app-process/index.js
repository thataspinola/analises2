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

				service.logger.info(
					`Iniciando processamento da mensagem SQS: messageId=${record.messageId}, carbonTraceId=${carbonTraceId}, transactionId=${parsedRequestMessageBody.transactionId}`
				)

				controller.request
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
		if (status === 'fulfilled') {
			service.logger.info(
				`Mensagem processada com sucesso: messageId=${record.messageId}`
			)
			continue
		}
		service.logger.error(
			{
				rawError: reason,
			},
			`Mensagem será reenviada para a fila (reprocessamento automático). messageId=${record.messageId}, erro=${reason?.message}`
		)
		batchItemFailures.push({
			itemIdentifier: record.messageId,
		})
	}
	if (batchItemFailures.length > 0) {
		service.logger.warn(
			`${
				batchItemFailures.length
			} mensagem(s) falharam e serão reprocessadas. Após ${
				process.env.MAX_RECEIVE_COUNT || 'N configurado'
			} tentativas, irão para Dead Letter Queue (app-failed-request).`
		)
	}
	return {
		batchItemFailures,
	}
}

module.exports.handler = lambdaHandler

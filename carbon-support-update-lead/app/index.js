const controller = require('./src/controller')
const error = require('./src/error')
const service = require('./src/service')

module.exports.handler = async (event, context) => {
	if(event.hasOwnProperty("Records")){
		service.logger.info({ awsRequestId: context?.awsRequestId, source: 'sqs' }, 'Início do processamento de atualização de lead')
		return await consumerSqs(event, context?.awsRequestId)
	}

	service.logger.info({ awsRequestId: context?.awsRequestId, source: 'gateway' }, 'Início do processamento de atualização de lead')
	return await gatewayMessageProcessor(event, context?.awsRequestId)
}

async function gatewayMessageProcessor(event, awsRequestId){
	let responseBody = null
	let responseStatusCode = null
	try {
		if (!event?.body) throw new error.ValidationError('The request body is required')
		if (typeof event.body !== 'string') {
			throw new error.ValidationError('The request body must be a string')
		}
		let parsedInputFormData = null
		try {
			const parsedInput = JSON.parse(event.body)
			parsedInputFormData = parsedInput
		} catch (err) {
			service.logger.error({ awsRequestId, operation: 'parse_gateway_body' }, 'Falha ao interpretar corpo JSON')
			throw err
		}

		const requestData = await controller.updateLeadController.process(parsedInputFormData)

		responseBody = JSON.stringify(requestData)
		responseStatusCode = requestData.statusCode
	} catch (error) {
		service.logger.error(
			{ awsRequestId, operation: 'gateway_update_lead', errorType: error.name === 'ValidationError' ? 'validation' : 'internal' },
			'Falha no processamento de atualização de lead'
		)
		responseBody = JSON.stringify({
			status: 'error',
			message: error.message ? error.message : 'Unknown Server Error',
		})
		responseStatusCode = error.name == 'ValidationError' ? 400 : 500
	}
	const response = {
		isBase64Encoded: false,
		headers: {},
		statusCode: responseStatusCode,
		body: responseBody,
	}

	return response
}

async function consumerSqs(event, awsRequestId) {
	const recordPromises = event.Records.map(async (record, index) => {
		return new Promise((resolve, reject) => {
			try {

				const parsedInput = JSON.parse(record.body)

				controller.updateLeadController.process(
					parsedInput
				).then(resolve).catch(reject)
				
				
			} catch (error) {
				service.logger.error({ awsRequestId, messageId: record.messageId, operation: 'parse_sqs_body' }, 'Falha ao interpretar mensagem SQS')
				reject(error)
			}
		})
	})

	const responseSqs = await Promise.allSettled(recordPromises)

	const batchItemFailures = []
	for (const [idx, record] of Object.entries(event.Records)) {
		const { status } = responseSqs[idx]
		if (status === 'fulfilled') {
			service.logger.info({ awsRequestId, messageId: record.messageId, operation: 'sqs_update_lead' }, 'Processamento da mensagem concluído')
			continue
		}

		service.logger.error({ awsRequestId, messageId: record.messageId, operation: 'sqs_update_lead' }, 'Falha no processamento da mensagem')

		batchItemFailures.push({
			itemIdentifier: record.messageId,
		})
	}

	return {
		batchItemFailures,
	}
}
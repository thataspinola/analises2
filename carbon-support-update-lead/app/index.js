const controller = require('./src/controller')
const error = require('./src/error')
const service = require('./src/service')

module.exports.handler = async (event) => {
	if(event.hasOwnProperty("Records")){
		service.logger.info(event, `Sqs`)
		return await consumerSqs(event)
	}

	service.logger.info(event, `Gateway`)
	return await gatewayMessageProcessor(event)
}

async function gatewayMessageProcessor(event){
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
			service.logger.error(`Body JSON parse error: ${err.message}`)
			service.logger.info(`data: ${event.body}`)
			throw err
		}

		const requestData = await controller.updateLeadController.process(parsedInputFormData)

		responseBody = JSON.stringify(requestData)
		responseStatusCode = requestData.statusCode
	} catch (error) {
		service.logger.error(
			`ERROR: ${error.name} |  MESSAGE: ${error.message}  | STACK: ${error.stack}`
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

async function consumerSqs(event) {
	const recordPromises = event.Records.map(async (record, index) => {
		return new Promise((resolve, reject) => {
			try {

				const parsedInput = JSON.parse(record.body)

				controller.updateLeadController.process(
					parsedInput
				).then(resolve).catch(reject)
				
				
			} catch (error) {
				service.logger.error(`Error to parse input message: ${record.body}`)
				reject(error)
			}
		})
	})

	const responseSqs = await Promise.allSettled(recordPromises)

	const batchItemFailures = []
	for (const [idx, record] of Object.entries(event.Records)) {
		const { status, reason } = responseSqs[idx]
		if (status === 'fulfilled') continue

		batchItemFailures.push({
			itemIdentifier: record.messageId,
		})
	}

	return {
		batchItemFailures,
	}
}
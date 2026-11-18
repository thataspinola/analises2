const { quotationController } = require('./src/controller')
const { ValidationError } = require('./src/error')
const { logger } = require('./config')

const lambdaHandler = async (event) => {
	try {
		if (!event || Object.keys(event).length === 0) {
			throw new ValidationError('The request event is required')
		}

		if (typeof event.body !== 'string') {
			throw new ValidationError('Input must be a string')
		}

		const parsedInput = JSON.parse(event.body)

		logger.info(parsedInput, 'EVENTO RECEBIDO')
		const response = await quotationController.process(parsedInput)

		return {
			isBase64Encoded: false,
			headers: {},
			statusCode: 201,
			body: JSON.stringify(response),
		}
	} catch (error) {
		logger.error(
			`ERROR: ${error.name} |  MESSAGE: ${JSON.stringify(
				error.message
			)}  | STACK: ${error.stack}`
		)

		return {
			isBase64Encoded: false,
			headers: {},
			statusCode: error.code || 500,
			body: JSON.stringify({
				statusCode: error.code || 500,
				message: error.message || 'Unknown Server Error',
				errorCode: error.errorCode
			}),
		}
	}
}

module.exports.handler = lambdaHandler

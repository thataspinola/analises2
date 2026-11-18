const { abandonedQuotationController } = require('./src/controller')
const { ValidationError } = require('./src/error')
const { logger } = require('./src/service')

module.exports.handler = async (event) => {
	try {
		if (!event?.Records)
			throw new ValidationError('The request Records is required')

		const response = await abandonedQuotationController.process(event)

		return {
			isBase64Encoded: false,
			headers: {},
			statusCode: 200,
			body: JSON.stringify(response),
		}
	} catch (error) {
		logger.error(
			`ERROR: ${error.name} |  MESSAGE: ${error.message}  | STACK: ${error.stack}`
		)

		return {
			isBase64Encoded: false,
			headers: {},
			statusCode: error.code || 500,
			body: JSON.stringify({
				status: 'error',
				message: error.message || 'Unknown Server Error',
			}),
		}
	}
}

const { quotationController } = require('./src/controller')
const { logger } = require('./src/service')
const factory = require('./src/factory')

module.exports.handler = async (event) => {
	let responseBody = null
	let responseStatusCode
	try {
		if (typeof event.body !== 'string') {
			throw new Error('Input must be a string')
		}
		let parsedInputFormData = JSON.parse(event.body)

		logger.info(parsedInputFormData)

		const requestData = await quotationController.process(parsedInputFormData)

		responseBody = JSON.stringify(requestData.body)
		responseStatusCode = requestData.statusCode
	} catch (error) {
		logger.error(`Error occurred: ${error.message}`, error)
		const httpErrorData = factory.response.error(error.message)
		responseBody = JSON.stringify(httpErrorData.body)
		responseStatusCode = httpErrorData.statusCode || 500
	}

	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: responseStatusCode,
		body: responseBody,
	}
}

const controller = require('./src/controller')
const factory = require('./src/factory')
const service = require('./src/service')

const lambdaHandler = async (event) => {
	let responseBody = null
	let responseStatusCode = null
	try {
		if (typeof event.body !== 'string') {
			throw new Error('Input must be a string')
		}

		let parsedInputFormData = null
		try {
			const parsedInput = JSON.parse(event.body)
			parsedInputFormData = parsedInput
		} catch (err) {
			service.logger.error(`Body JSON parse error: ${err.message}`)
			service.logger.info(`data: ${event.body}`)
			const httpBadRequestErrorData =
				factory.requestControllerResponse.badRequestError(err.message)

			const response = {
				isBase64Encoded: false,
				headers: {},
				statusCode: httpBadRequestErrorData.statusCode,
				body: JSON.stringify(httpBadRequestErrorData.body),
			}

			return response
		}

		const requestData = await controller.request.process(parsedInputFormData)

		responseBody = JSON.stringify(requestData.body)
		responseStatusCode = requestData.statusCode
	} catch (error) {
		const httpErrorData = factory.requestControllerResponse.error(error.message)
		responseBody = JSON.stringify(httpErrorData.body)
		responseStatusCode = httpErrorData.statusCode
	}

	const response = {
		isBase64Encoded: false,
		headers: {},
		statusCode: responseStatusCode,
		body: responseBody,
	}

	return response
}

module.exports.handler = lambdaHandler

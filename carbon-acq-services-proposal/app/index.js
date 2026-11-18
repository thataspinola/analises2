const controller = require('./src/controller')
const factory = require('./src/factory')
const service = require('./src/service')

const parseRequestBody = (body) => {
	if (typeof body !== 'string') {
		throw new Error('Input must be a string')
	}

	try {
		return JSON.parse(body)
	} catch (err) {
		service.logger.error(`Body JSON parse error: ${err.message}`)
		service.logger.info(`data: ${body}`)
		throw new Error('Invalid JSON format')
	}
}

const lambdaHandler = async (event) => {
	let responseBody = null
	let responseStatusCode = null

	try {
		const parsedInputFormData = parseRequestBody(event.body)

		const responseData = await controller.request.process(parsedInputFormData)

		responseBody = JSON.stringify(responseData.body)
		responseStatusCode = responseData.statusCode
	} catch (error) {
		if (error.message === 'Invalid JSON format') {
			const httpBadRequestErrorData =
				factory.controllerResponse.badRequestError(error.message)

			responseBody = JSON.stringify(httpBadRequestErrorData.body)
			responseStatusCode = httpBadRequestErrorData.statusCode
		} else {
			const httpErrorData = factory.controllerResponse.error(error.message)
			responseBody = JSON.stringify(httpErrorData.body)
			responseStatusCode = httpErrorData.statusCode
		}
	}

	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: responseStatusCode,
		body: responseBody,
	}
}

module.exports.handler = lambdaHandler

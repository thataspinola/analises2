const controller = require('./src/controller')
const factory = require('./src/factory')
const service = require('./src/service')

const handleLambdaError = (
	error,
	event,
	message,
	statusCode,
	isBadRequest = false
) => {
	service.logger.error(`${message}: ${error.message}`)

	if (isBadRequest) {
		service.logger.info(`Event data: ${JSON.stringify(event)}`)
	}

	const errorResponseData = isBadRequest
		? factory.controllerResponse.badRequestError(error.message)
		: factory.controllerResponse.error(error.message)

	return buildResponse(errorResponseData.statusCode, errorResponseData.body)
}

const parseRequestBody = (body) => {
	if (typeof body !== 'string') {
		service.logger.error('Input must be a string. Received:', body)
		throw new Error('Input body must be a string')
	}

	try {
		return JSON.parse(body)
	} catch (err) {
		service.logger.error(`Failed to parse request body as JSON: ${err.message}`)
		service.logger.info(`Raw body data: ${body}`)
		throw new Error('Invalid JSON format in request body')
	}
}

const buildParsedInput = (event) => {
	const queryStringParameters = event.queryStringParameters || {}

	if (event.httpMethod === 'GET' || event.httpMethod === 'DELETE') {
		return { ...queryStringParameters }
	}

	return {
		...queryStringParameters,
		...parseRequestBody(event.body),
	}
}

const buildResponse = (statusCode, body) => ({
	isBase64Encoded: false,
	headers: {
		'Content-Type': 'application/json',
	},
	statusCode,
	body: JSON.stringify(body),
})

const lambdaHandler = async (event) => {
	let parsedInput

	try {
		parsedInput = buildParsedInput(event)
	} catch (error) {
		return handleLambdaError(error, event, 'Input parsing error', 400, true)
	}

	try {
		const inputRequest = parsedInput
		const httpMethod = event.httpMethod
		const requestData = await controller.request.process(
			inputRequest,
			httpMethod
		)
		return buildResponse(requestData.statusCode, requestData.body)
	} catch (error) {
		return handleLambdaError(error, event, 'Controller processing error', 500)
	}
}

module.exports.handler = lambdaHandler

const controller = require('./src/controller')
const service = require('./src/service')

const parsePostRequestBody = (body) => {
	try {
		return JSON.parse(body)
	} catch (err) {
		throw new Error('Invalid JSON format')
	}
}

const parseGetRequestQuery = (queryStringParameters) => {
	return { type: queryStringParameters?.type, value: queryStringParameters?.value }
}

const parseEventInput = async (event) => {
	let parsedInput = null

	try {
		switch (event.httpMethod) {
			case 'POST':
				parsedInput = parsePostRequestBody(event.body)
				break
			case 'GET':
				parsedInput = parseGetRequestQuery(event.queryStringParameters)
				break
			default:
				throw new Error('Unsupported HTTP method')
		}

		return { parsedInput }
	} catch (error) {
		service.logger.error(error, 'Failed to parsed event input')
		return { parsedInput, error }
	}
}

const createErrorResponse = (error, statusCode) => {
	return {
		isBase64Encoded: false,
		headers: {},
		statusCode: statusCode || 500,
		body: JSON.stringify({
			status: 'error',
			message: error.message || 'Internal Error',
		}),
	}
}

const lambdaHandler = async (event) => {
	try {
		const parsedEvent = await parseEventInput(event)

		if (!parsedEvent.parsedInput) {
			return createErrorResponse(parsedEvent.error, 400)
		}

		const response = await controller.searchProducts.process(
			parsedEvent.parsedInput
		)

		return {
			isBase64Encoded: false,
			headers: {},
			statusCode: response.statusCode,
			body: JSON.stringify(response.body),
		}
	} catch (error) {
		service.logger.error(error, 'Handler error')
		return createErrorResponse(error)
	}
}

module.exports.handler = lambdaHandler

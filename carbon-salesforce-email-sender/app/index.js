const controller = require('./src/controller')
const factory = require('./src/factory')
const service = require('./src/service')
const errors = require('./src/error')

const parseRequestBody = (body) => {
	if (typeof body !== 'string') {
		throw new Error('Input must be a string')
	}
	try {
		service.logger.info({ body }, 'EVENTO RECEBIDO')
		return JSON.parse(body)
	} catch (error) {
		throw new Error('Input must be a valid JSON')
	}
}

const processRequest = async (parsedInputFormData) => {
	try {
		const response = await controller.emailNotification.processRequest(
			parsedInputFormData
		)
		return {
			body: JSON.stringify(response.body),
			statusCode: response.statusCode,
		}
	} catch (error) {
		service.logger.error(
			{
				transactionId: parsedInputFormData.transactionId,
			},
			`Error processing request: ${error.message}`
		)
		throw error
	}
}

const createErrorResponse = (error) => {
	const httpErrorData =
		error instanceof errors.ValidationError
			? factory.response.badRequestError(error.message)
			: factory.response.error(error.message)

	return {
		body: JSON.stringify(httpErrorData.body),
		statusCode: httpErrorData.statusCode,
	}
}

const createResponse = (
	body,
	statusCode,
	headers = { 'Content-Type': 'application/json' }
) => {
	return { isBase64Encoded: false, headers, statusCode, body }
}

module.exports.handler = async (event) => {
	try {
		const parsedInputFormData = parseRequestBody(event.body)
		const { body, statusCode } = await processRequest(parsedInputFormData)
		return createResponse(body, statusCode)
	} catch (error) {
		service.logger.error(`Error: ${error.message}`)
		const { body, statusCode } = createErrorResponse(error)
		return createResponse(body, statusCode)
	}
}

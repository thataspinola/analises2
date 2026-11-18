const controller = require('./src/controller')
const factory = require('./src/factory')
const logger = require('./logger')
const service = require('./src/service')
const nodeCrypto = require('node:crypto')

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const lambdaHandler = async (event, context) => {
	const correlationId = createdCorrelationId(event)
	let response = {}

	try {
		if (typeof event.body !== 'string') {
			throw new Error('Input must be a string')
		}
		
		const body = JSON.parse(event.body)
		const parsedInput = service.xss.sanitizeInput(body)

		logger.info({ request: { ...parsedInput } }, 'INPUT REQUEST')
		
		const cotation = structuredClone(
			await controller.quotation.create(parsedInput, correlationId, context)
		)

		logger.info({ Response: { ...cotation } }, 'OUTPUT REQUEST')

		const successResponse = factory.response.success(cotation, correlationId)

		response = {
			isBase64Encoded: successResponse.isBase64Encoded,
			headers: successResponse.headers,
			statusCode: successResponse.statusCode,
			body: successResponse.body
		}

	} catch (error) {
		const safeError = error || {}

		logger.error(
			`ERROR: ${safeError.name} |  MESSAGE: ${safeError.message}  | STACK: ${safeError.stack}`,
			`CorrelationId: ${correlationId}`
		)

		const errorResponse = factory.response.Error(
			safeError.message,
			safeError.code,
			correlationId
		)

		response = {
			isBase64Encoded: errorResponse.isBase64Encoded,
			headers: errorResponse.headers,
			statusCode: errorResponse.statusCode,
			body: errorResponse.body,
		}
	}

	return response
}

function createdCorrelationId(event){
	let correlationId = ''

	try{
		const headerValue = event.headers && event.headers['carbon-trace-id']
		const match = typeof headerValue === 'string' ? UUID_REGEX.exec(headerValue) : null
		if (match) {
			correlationId = match[0]
		} else {
			correlationId = `${nodeCrypto.randomUUID()}`
		}
	}catch(error){
		logger.error(
			`ERROR: ${error.name} |  MESSAGE: ${error.message}  | STACK: ${error.stack}`,
			`CorrelationId: ${correlationId}`
		)

		return ''
	}
	
	return correlationId
}

module.exports.handler = lambdaHandler

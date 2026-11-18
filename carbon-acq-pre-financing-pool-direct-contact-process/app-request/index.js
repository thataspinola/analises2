const controller = require('./src/controller')
const factory = require('./src/factory')
const service = require('./src/service')
const CONSTANT = require('./src/property')
const commonLibrary = require(CONSTANT.COMMON_LIBRARY_LOCATION)

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
			throw err
		}

		const flag = parsedInputFormData?.flag
		let requestData = null

		if (flag === commonLibrary.UPDATE_PRE_FINANCING_FLAG) {
			requestData = await controller.directContactUpdate.process(
				parsedInputFormData
			)
		}else {
			requestData = await controller.directContact.processRequest(
				parsedInputFormData
			)
		}
		
		responseBody = JSON.stringify(requestData.body)
		responseStatusCode = requestData.statusCode
	} catch (error) {
		const httpErrorData = factory.response.error(error.message)
		responseBody = httpErrorData.body
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

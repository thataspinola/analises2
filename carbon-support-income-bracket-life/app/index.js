const controller = require('./src/controller')
const factory = require('./src/factory')
const logger = require('./config/logger')

module.exports.handler = async (event) => {
	let requestData
	let responseBody
	try {
		requestData = await controller.incomeBracket.verify(event)
		responseBody = JSON.stringify(requestData.body)
	} catch {
		logger.error({ operation: 'incomeBracket.verify' }, 'Income bracket request failed')
		requestData = factory.response.error()
		responseBody = JSON.stringify(requestData.body)
	}
	const response = {
		isBase64Encoded: false,
		headers: {},
		statusCode: requestData.statusCode,
		body: responseBody,
	}

	return response
}

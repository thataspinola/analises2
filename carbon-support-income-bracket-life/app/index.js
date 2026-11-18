const controller = require('./src/controller')

global.logger = require('./config/logger')

module.exports.handler = async (event) => {
	const requestData = await controller.incomeBracket.verify(event)
	const response = {
		isBase64Encoded: false,
		headers: {},
		statusCode: requestData.statusCode,
		body: JSON.stringify(requestData.body),
	}

	return response
}

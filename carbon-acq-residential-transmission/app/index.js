const controller = require('./src/controller')

global.logger = require('./config/logger')

module.exports.handler = async (event, context) => {
	logger.info(event)
	const checkoutData = await controller.checkout.processCheckout(event)
	const response = {
		isBase64Encoded: false,
		headers: {},
		statusCode: checkoutData.statusCode,
		body: JSON.stringify(checkoutData.body),
	}
	logger.info(response)
	return response
}

require('./config')
const { vehicleController } = require('./src/controller')

module.exports.handler = async (event) => {
	try {
		const plate = event?.queryStringParameters?.plate
		const description = event?.queryStringParameters?.description
		const yearModel = event?.queryStringParameters?.yearModel

		const response = await vehicleController.process(
			plate,
			description,
			yearModel
		)

		return {
			isBase64Encoded: false,
			headers: {},
			statusCode: 200,
			body: JSON.stringify(response),
		}
	} catch (error) {
		logger.error(
			event.queryStringParameters,
			`ERROR: ${error.name} |  MESSAGE: ${error.message}  | STACK: ${error.stack}`
		)

		return {
			isBase64Encoded: false,
			headers: {},
			statusCode: error.code || 500,
			body: JSON.stringify({
				status: 'error',
				message: error.message || 'Unknown Server Error',
			}),
		}
	}
}

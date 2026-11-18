const controller = require('./src/controller')
const { logger } = require('./src/service')

module.exports.handler = async (event, context) => {
	try {
		const query = event?.queryStringParameters?.query
		const professions = await controller.professionController.getProfessions(
			query
		)

		const response =  {
			isBase64Encoded: false,
			headers: {},
			statusCode: professions.statusCode,
			body: JSON.stringify(professions.body),
		}
		return response
	} catch (error) {
		logger.error(
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

const controller = require('./src/controller')
const errors = require('./src/error')
const service = require('./src/service')
const { errorFactory } = require('./src/factory')
const { ERROR_CODE, PRODUCT_CODE, PRODUCT_STEP } = require('./src/property')

module.exports.handler = async (event) => {
	try {
		if (!event?.body)
			throw new errors.ValidationError('The request body is required')

		const inputData = JSON.parse(event.body)

		const response = await controller.createLeadController.process(inputData)

		return {
			isBase64Encoded: false,
			headers: {},
			statusCode: 200,
			body: JSON.stringify(response),
		}
	} catch (error) {
		service.logger.error(
			`ERROR: ${error.name} |  MESSAGE: ${error.message}  | STACK: ${error.stack}`
		)

		if (error.name === 'DynamicsLayerError') {
			error.errorCode = errorFactory.getCode(error.message, error.code)
			if (
				error.errorCode ===
				`${PRODUCT_CODE}${PRODUCT_STEP}${ERROR_CODE.BLOCKLIST}`
			) {
				error.message = 'Dynamics responded with a error'
			}
		}

		return {
			isBase64Encoded: false,
			headers: {},
			statusCode: error.code || 500,
			body: JSON.stringify({
				status: 'error',
				message: error.message || 'Unknown Server Error',
				errorCode: error.errorCode || errorFactory.getDefaultCode(),
			}),
		}
	}
}

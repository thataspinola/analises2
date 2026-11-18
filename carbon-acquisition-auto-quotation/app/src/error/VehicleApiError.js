const { EXTERNAL_API_ERROR_DEFAULT_MESSAGE, PRODUCT_CODE, PRODUCT_STEP, DEFAULT_ERROR_CODE } = require('../property')

class VehicleApiError extends Error {
	constructor(message, status, stack, errorCode) {
		super()
		this.name = this.constructor.name
		this.code = status
		this.stack = stack
		this.message = message || EXTERNAL_API_ERROR_DEFAULT_MESSAGE
		this.errorCode = errorCode || `${PRODUCT_CODE}${PRODUCT_STEP}${DEFAULT_ERROR_CODE}`
	}
}

module.exports = VehicleApiError

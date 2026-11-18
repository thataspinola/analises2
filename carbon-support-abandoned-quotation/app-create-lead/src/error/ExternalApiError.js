const { EXTERNAL_API_ERROR_DEFAULT_MESSAGE } = require('../property')
const { errorFactory } = require("../factory")

class ExternalApiError extends Error {
	constructor(message, code, stack, errorCode) {
		super()
		this.name = this.constructor.name
		this.code = code
		this.stack = stack
		this.message = message || EXTERNAL_API_ERROR_DEFAULT_MESSAGE
		this.errorCode = errorCode || errorFactory.getDefaultCode()
	}
}

module.exports = ExternalApiError

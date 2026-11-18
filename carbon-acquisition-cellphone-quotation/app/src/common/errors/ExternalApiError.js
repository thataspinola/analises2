const { EXTERNAL_API_ERROR_DEFAULT_MESSAGE } = require('../../property')

class ExternalApiError extends Error {
	constructor(message, code, stack, errorCode) {
		super(message || EXTERNAL_API_ERROR_DEFAULT_MESSAGE)
		this.name = this.constructor.name
		this.code = code
		this.stack = stack
		this.errorCode = errorCode
	}
}

module.exports = ExternalApiError

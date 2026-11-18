const { EXTERNAL_API_ERROR_DEFAULT_MESSAGE } = require('../property')

class ExternalApiError extends Error {
	constructor(message, code, stack) {
		super()
		this.name = this.constructor.name
		this.code = code
		this.stack = stack
		this.message = message || EXTERNAL_API_ERROR_DEFAULT_MESSAGE
	}
}

module.exports = ExternalApiError

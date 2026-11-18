const { EXTERNAL_API_ERROR_DEFAULT_MESSAGE } = require('../property')

class ExternalApiError extends Error {
	constructor(message, code, stack, codeError) {
		super(message || EXTERNAL_API_ERROR_DEFAULT_MESSAGE)
		this.name = this.constructor.name
		this.code = code
		this.codeError = codeError
		this.stack = stack
	}
}

module.exports = ExternalApiError

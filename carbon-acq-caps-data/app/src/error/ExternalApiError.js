const { EXTERNAL_API_ERROR_DEFAULT_MESSAGE } = require('../../src/property')

class ExternalApiError extends Error {
	constructor(message, code, stack) {
		super(message || EXTERNAL_API_ERROR_DEFAULT_MESSAGE)
		this.name = this.constructor.name
		this.code = code
		this.stack = stack
	}
}

module.exports = ExternalApiError

const CONSTANTS = require('../property')

class ExternalApiError extends Error {
	constructor(error) {
		super()
		this.name = this.constructor.name
		this.code = error.code
		this.stack = error.stack
		this.message = error.message || CONSTANTS.EXTERNAL_API_ERROR_DEFAULT_MESSAGE
	}
}

module.exports = ExternalApiError

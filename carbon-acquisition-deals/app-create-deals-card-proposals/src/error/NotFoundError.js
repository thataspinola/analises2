const CONSTANTS = require('../property')

class NotFoundError extends Error {
	constructor(error) {
		super()
		this.name = this.constructor.name
		this.code = error.code
		this.stack = error.stack
		this.message = error.message || CONSTANTS.NOT_FOUND_ERROR_DEFAULT_MESSAGE
	}
}

module.exports = NotFoundError

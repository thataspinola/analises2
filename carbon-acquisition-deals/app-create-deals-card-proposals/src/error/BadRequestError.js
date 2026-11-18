const CONSTANTS = require('../property')

class BadRequest extends Error {
	constructor(error) {
		super()
		this.name = this.constructor.name
		this.code = error.code
		this.stack = error.stack
		this.message = error.message || CONSTANTS.BAD_REQUEST_DEFAULT_MESSAGE
	}
}

module.exports = BadRequest

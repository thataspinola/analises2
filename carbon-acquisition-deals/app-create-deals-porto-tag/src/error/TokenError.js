const CONSTANTS = require('../property')

class TokenError extends Error {
	constructor() {
		super()
		this.name = this.constructor.name
		this.code = 500
		this.message = CONSTANTS.TOKEN_ERROR_DEFAULT_MESSAGE
	}
}

module.exports = TokenError

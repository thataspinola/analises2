const CONSTANTS = require('../property')

class TokenError extends Error {
	constructor() {
		super(CONSTANTS.GET_TOKEN_ERROR_DEFAULT_MESSAGE)
		this.name = this.constructor.name
		this.code = CONSTANTS.STATUS_CODE.INTERNAL_SERVER_ERROR
	}
}

module.exports = TokenError

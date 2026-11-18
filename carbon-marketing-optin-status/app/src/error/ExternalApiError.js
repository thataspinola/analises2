const CONSTANT = require('../property')

class ExternalApiError extends Error {
	constructor(error) {
		super()
		this.name = this.constructor.name
		this.code = error.code
		this.message = error?.message || CONSTANT.EXTERNAL_API_ERROR_DEFAULT_MESSAGE
		this.stack = error?.stack
	}
}

class NotFoundError extends Error{
	constructor(error) {
		super()
		this.name = this.constructor.name
		this.code = CONSTANT.STATS_CODE.NOT_FOUND
		this.message = error?.message || 'Not Found'
		this.stack = error?.stack
	}
}

class BadRequest extends Error{
	constructor(error) {
		super()
		this.name = this.constructor.name
		this.code = CONSTANT.STATS_CODE.BAD_REQUEST
		this.message = error?.message || 'The supplied request body is invalid'
		this.stack = error?.stack
	}
}

module.exports = {ExternalApiError, NotFoundError, BadRequest}

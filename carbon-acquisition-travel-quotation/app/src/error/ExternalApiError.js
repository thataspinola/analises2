const { EXTERNAL_API_ERROR_DEFAULT_MESSAGE } = require('../property')

class ExternalApiError extends Error {
	constructor(error) {
		super()
		this.name = this.constructor.name
		this.code = error.code
		this.stack = error.stack
		this.message = error.message || EXTERNAL_API_ERROR_DEFAULT_MESSAGE
	}
}

class NotFoundError extends Error{
	constructor(error) {
		super()
		this.name = this.constructor.name
		this.code = error.code
		this.stack = error.stack
		this.message = error.message || 'Not Found'
	}
}

class BadRequest extends Error{
	constructor(error) {
		super()
		this.name = this.constructor.name
		this.code = error.code
		this.stack = error.stack
		this.message = error.message || 'The supplied request body is invalid'
	}
}

module.exports = {ExternalApiError, NotFoundError, BadRequest}

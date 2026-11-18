class BusinessError extends Error {
	constructor(message, code, stack) {
		super()
		this.name = this.constructor.name
		this.code = code
		this.stack = stack
		this.message = message
	}
}

module.exports = BusinessError

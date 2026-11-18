class ValidationError extends Error {
	constructor(message) {
		super()
		this.name = this.constructor.name
		this.code = 400
		this.message = message
	}
}

module.exports = ValidationError

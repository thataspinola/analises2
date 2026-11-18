class ExternalApiError extends Error {
	constructor(message, code) {
		super()
		this.name = this.constructor.name
		this.code = code
		this.message = message
	}
}

module.exports = ExternalApiError

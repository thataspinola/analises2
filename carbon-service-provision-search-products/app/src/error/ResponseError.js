
  
class ResponseError extends Error {
	constructor(statusCode, data) {
		const errorData = typeof data === 'object' ? data : { status: 'error' }
		const errorStatusCode = typeof statusCode === 'number' ? statusCode : 500
		super(`Response Error: ${errorStatusCode} - ${JSON.stringify(errorData)}`)
		this.name = this.constructor.name
		this.data = errorData
		this.statusCode = errorStatusCode
	}
}

module.exports = ResponseError
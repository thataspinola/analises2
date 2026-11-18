class DynamoDbError extends Error {
	constructor(message, innerError = null) {
		super(message)
		this.name = this.constructor.name
		this.code = 500
		this.innerError = innerError
	}
}

module.exports = DynamoDbError

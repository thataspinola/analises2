module.exports = class PersistenceError extends Error {
	constructor(message) {
		super(message)
		this.name = this.constructor.name
		this.code = 500
	}
}

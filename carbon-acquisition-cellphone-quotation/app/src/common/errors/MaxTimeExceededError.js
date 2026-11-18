const { MAXIMUM_TIME_EXCEEDED_ERROR_MESSAGE } = require('../../property')

class MaxTimeExceededError extends Error {
	constructor() {
		super(MAXIMUM_TIME_EXCEEDED_ERROR_MESSAGE)
		this.name = this.constructor.name
		this.code = 504 
	}
}

module.exports = MaxTimeExceededError

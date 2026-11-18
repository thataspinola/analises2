const CONSTANTS = require('../property')

class DealsDataLayerError extends Error {
	constructor(error) {
		super()
		this.name = this.constructor.name
		this.code = 500
		this.stack = error.stack
		this.message = error.message || CONSTANTS.DEALS_DATA_LAYER_ERROR_DEFAULT_MESSAGE
	}
}

module.exports = DealsDataLayerError
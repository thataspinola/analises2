const { PAYMENT_API_ERROR_DEFAULT_MESSAGE } = require('../property')

class PaymentApiError extends Error {
	constructor(message, code) {
		super()
		this.name = this.constructor.name
		this.code = code || 500
		this.message = message || PAYMENT_API_ERROR_DEFAULT_MESSAGE
	}
}

module.exports = PaymentApiError

const {
	COUPON_API_ERROR_DEFAULT_MESSAGE,
	COUPON_API_ERROR_CODE_DEFAULT,
} = require('../property')

class CouponApiError extends Error {
	constructor(error = {}) {
		super()
		this.name = this.constructor.name
		this.code = error.code || COUPON_API_ERROR_CODE_DEFAULT
		this.stack = error.stack
		this.message = error.message || COUPON_API_ERROR_DEFAULT_MESSAGE
	}
}

module.exports = { CouponApiError }
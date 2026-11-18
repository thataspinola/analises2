const {
	COUPON_API_ERROR_INVALID_COUPON,
	COUPON_API_ERROR_CODE_DEFAULT,
} = require('../../property')

class CouponApiError extends Error {
	constructor(message, code, coupon) {
		super(message || COUPON_API_ERROR_INVALID_COUPON)
		this.name = this.constructor.name
		this.statusCode = code || 422
		this.code = COUPON_API_ERROR_CODE_DEFAULT
		this.coupon = coupon
	}
}

module.exports = CouponApiError

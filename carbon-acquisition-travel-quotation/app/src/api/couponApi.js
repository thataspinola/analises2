const CONSTANTS = require('../property')
const errors = require('../common/errors')
const service = require('../../src/service')
const axios = require('axios')

exports.getCouponData = async (params) => {
	try {
		const config = {
			method: 'GET',
			url: `${CONSTANTS.COUPON_API_URL}/v1/coupons`,
			params: {
				produto: 'viagem',
				...params,
			},
			paramsSerializer: (p) => {
				const searchParams = new URLSearchParams()
				for (const [key, value] of Object.entries(p)) {
					if (Array.isArray(value)) {
						value.forEach((v) => searchParams.append(key, v))
					} else {
						searchParams.append(key, value)
					}
				}
				return searchParams.toString()
			},
		}

		const { data } = await axios(config)

		return data
	} catch (error) {
		service.logger.error(error, error.response ? error.response.data : null, CONSTANTS.COUPON_API_ERROR_INVALID_COUPON)
		throw new errors.CouponApiError()
	}
}
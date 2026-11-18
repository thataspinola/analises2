const {
	COUPON_API_ERROR_INVALID_COUPON,
	COUPON_API_URL,
} = require('../property')
const { CouponApiError } = require('../common/errors')
const { logger } = require('../../src/service')
const axios = require('axios')

exports.getCouponData = async (params,codigo) => {
	try {
		const config = {
            method: 'GET',
            url: `${COUPON_API_URL}/v1/coupons`,
            params: {
                produto: 'celular',
                variacao: params,
				codigo: codigo
            },
            paramsSerializer: {
                indexes: null
            }
        }
		
		const { data } = await axios(config)
		return data
	} catch (error) {
		logger.error(error, error.response?.data, COUPON_API_ERROR_INVALID_COUPON)
		throw new CouponApiError()
	}
}
const {
	COUPON_API_ERROR_INVALID_COUPON,
	COUPON_API_URL,
	COUPON_SCOPE,
} = require('../property')
const { logger } = require('../../src/service')
const axios = require('axios')

exports.getCouponData = async (codigo,params) => {
	try {
		const config = {
            method: 'GET',
            url: `${COUPON_API_URL}/v1/coupons`,
            params: {
                produto: COUPON_SCOPE,
                variacao: params,
				codigo: codigo
            },
            paramsSerializer: {
                indexes: null
            }
        }

		logger.info(codigo, 'Chamando API de Cupom com o código recebido')

		const { data } = await axios(config)

		return data
	} catch (error) {
		logger.error(error, error.response.data, COUPON_API_ERROR_INVALID_COUPON)
		throw error
	}
}

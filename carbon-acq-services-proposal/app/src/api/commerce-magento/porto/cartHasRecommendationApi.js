const errors = require('../../../error')
const factory = require('../../../factory')
const service = require('../../../service')
const CONSTANT = require('../../../property')
const axios = require('axios')
const https = require('https')

const httpsAgent = new https.Agent({ keepAlive: true })

exports.getCartHasRecommendation = async (
	cartCommerceId,
	customerCommerceToken
) => {
	const headers = {
		accept: 'application/json',
		'Content-Type': 'application/json',
	}

	if (customerCommerceToken) {
		headers.Authorization = `Bearer ${customerCommerceToken}`
	}

	const config = {
		method: 'GET',
		url: `${CONSTANT.COMMERCE_URL}/rest/V1/porto/cart/${cartCommerceId}/hasRecommendationProduct`,
		headers,
		httpsAgent,
	}

	try {
		const getCartHasRecommendationResponse = await axios(config)

		return {
			cartHasRecommendation:
				getCartHasRecommendationResponse.data.has_recommendation,
		}
	} catch (error) {
		service.logger.error(error, 'API error getCartHasRecommendation commerce')

		const dataFromAxiosError = factory.axiosResponseErrorData.getErrorData(
			error,
			'COMMERCE - CART_RECOMMENDATION'
		)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack,
			'cmm03'
		)

		throw externalApiError
	}
}

const errors = require('../../../error')
const factory = require('../../../factory')
const service = require('../../../service')
const CONSTANT = require('../../../property')
const axios = require('axios')
const https = require('https')

const httpsAgent = new https.Agent({ keepAlive: true })

exports.postPricing = async (pricingData) => {
	const config = {
		method: 'POST',
		url: `${CONSTANT.HUB_VENDAS_CARBON_SERVICES_PRICING_API}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			partner: CONSTANT.PARTNER_HEADER_VALUE,
		},
		data: pricingData,
		httpsAgent,
	}

	try {
		const postPricingesponse = await axios(config)

		if (!postPricingesponse || postPricingesponse.data === undefined) {
			throw new Error(
				`Erro inesperado recebido da chamada da API Pricing lambda: ${JSON.stringify(
					postPricingesponse
				)}`
			)
		}

		return postPricingesponse.data
	} catch (error) {
		service.logger.error(
			`Api Error API Pricing lambda: ${JSON.stringify(error)}`
		)
		const dataFromAxiosError = factory.axiosResponseErrorData.getErrorData(
			error,
			'PRODUTO - PRECIFICAÇÃO'
		)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack,
			'prd02'
		)

		throw externalApiError
	}
}

const errors = require('../../../error')
const factory = require('../../../factory')
const service = require('../../../service')
const CONSTANT = require('../../../property')
const axios = require('axios')
const https = require('https')

const httpsAgent = new https.Agent({ keepAlive: true })

exports.postCommerceCreateCart = async (postCommerceCartPayload) => {
	const config = {
		method: 'POST',
		url: `${CONSTANT.HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
		},
		data: postCommerceCartPayload,
		httpsAgent,
	}

	try {
		const postCommerceCartResponse = await axios(config)

		if (
			!postCommerceCartResponse ||
			postCommerceCartResponse.data === undefined
		) {
			throw new Error(
				`Erro inesperado recebido da chamada da API cart checkout lambda: Resultado de chamada vazio ou inválido`
			)
		}

		return postCommerceCartResponse.data
	} catch (error) {
		service.logger.error(`Api Error cartCommerceId: ${JSON.stringify(error)}`)
		const dataFromAxiosError = factory.axiosResponseErrorData.getErrorData(
			error,
			'COMMERCE - CARRINHO'
		)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack,
			'ckt01'
		)

		throw externalApiError
	}
}

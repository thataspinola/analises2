const { ExternalApiError } = require('../error')
const { axiosResponseErrorData } = require('../factory')
const CONSTANT = require('../property')
const { logger } = require('../../config')
const axios = require('axios')

exports.postCommerceCreateCart = async (postCommerceCartPayload) => {
	const config = {
		method: 'POST',
		url: `${CONSTANT.HUB_VENDAS_CARBON_ACQUISITION_SHOPPING_CART_API}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
		},
		data: postCommerceCartPayload,
	}

	try {
		const response = await axios(config)

		if (!response || response.data?.cartId === undefined ) {
			throw new Error(
				`Erro inesperado recebido da chamada da API cart checkout lambda: Resultado de chamada vazio ou inválido`
			)
		}

		return response.data.cartId
	} catch (error) {
		logger.error(`Api Error cartCommerceId: ${JSON.stringify(error)}`)
		const dataFromAxiosError = axiosResponseErrorData.getErrorData(
			error,
			'shoppingCartCommerceApi'
		)

		const externalApiError = new ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack
		)

		throw externalApiError
	}
}

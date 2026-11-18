const errors = require('../../../error')
const factory = require('../../../factory')
const service = require('../../../service')
const CONSTANT = require('../../../property')
const axios = require('axios')

exports.postCommerceCreateCart = async (postCommerceCartPayload) => {
	const config = {
		method: 'POST',
		url: `${CONSTANT.HUB_VENDAS_CARBON_ACQUISITION_CART_CHECKOUT_API}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
		},
		data: postCommerceCartPayload,
	}

	try {
		const response = await axios(config)

		if (!response || response.data === undefined) {
			throw new Error(
				`Erro inesperado recebido da chamada da API cart checkout lambda: Resultado de chamada vazio ou inválido`
			)
		}
		return response.data
	} catch (error) {
		const dataFromAxiosError =
			factory.axiosResponseErrorData.getErrorData(error)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack
		)

		service.logger.error(
			{
				rawError: error,
			},
			`Erro ao executar chamada post para ${
				CONSTANT.HUB_VENDAS_CARBON_ACQUISITION_CART_CHECKOUT_API
			}: ${JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			})}`
		)

		throw externalApiError
	}
}

const errors = require('../../../error')
const factory = require('../../../factory')
const service = require('../../../service')
const CONSTANT = require('../../../property')
const axios = require('axios')

exports.postCommerceProposal = async (commerceProposalPayload, cartId) => {
	const config = {
		method: 'POST',
		url: `${CONSTANT.COMMERCE_URL}/${CONSTANT.API_PATH_PROPOSAL}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			'porto-cart-id': `${cartId}`,
		},
		data: commerceProposalPayload,
	}

	try {
		const postCommerceProposalResponse = await axios(config)

		if (
			!postCommerceProposalResponse ||
			postCommerceProposalResponse.data === undefined
		) {
			throw new Error(
				`Erro inesperado recebido da chamada da API:rest/V1/porto/proposal Resultado: ${JSON.stringify(
					postCommerceProposalResponse
				)}`
			)
		}

		return postCommerceProposalResponse.data
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
			`Erro ao executar chamada post para ${CONSTANT.COMMERCE_URL}/${
				CONSTANT.API_PATH_PROPOSAL
			}: ${JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			})}`
		)

		throw externalApiError
	}
}

const errors = require('../../../error')
const factory = require('../../../factory')
const service = require('../../../service')
const CONSTANT = require('../../../property')
const axios = require('axios')
const https = require('https')

const httpsAgent = new https.Agent({ keepAlive: true })

exports.postCommerceProposal = async (
	commerceProposalPayload,
	cartId,
	customerToken = ''
) => {
	const headers = {
		accept: 'application/json',
		'Content-Type': 'application/json',
		'porto-cart-id': `${cartId}`,
	}
	if (customerToken) headers.Authorization = `Bearer ${customerToken}`

	const config = {
		method: 'POST',
		url: `${CONSTANT.COMMERCE_URL}/${CONSTANT.API_PATH_PROPOSAL}`,
		headers,
		data: commerceProposalPayload,
		httpsAgent,
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
		service.logger.error(
			`Api Error proposal commerce: ${JSON.stringify(error)}`
		)
		const dataFromAxiosError = factory.axiosResponseErrorData.getErrorData(
			error,
			'COMMERCE - PROPOSTA'
		)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack,
			'cmm02'
		)

		throw externalApiError
	}
}

const errors = require('../../../error')
const factory = require('../../../factory')
const service = require('../../../service')
const CONSTANT = require('../../../property')
const axios = require('axios')
const https = require('https')

const httpsAgent = new https.Agent({ keepAlive: true })

exports.postCommerceQuotation = async (commerceQuotationPayload) => {
	const config = {
		method: 'POST',
		url: `${CONSTANT.COMMERCE_URL}/${CONSTANT.API_PATH_COTACAO}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
		},
		data: commerceQuotationPayload,
		httpsAgent,
	}

	try {
		const postCommerceQuotationResponse = await axios(config)

		if (
			!postCommerceQuotationResponse ||
			postCommerceQuotationResponse.data === undefined
		) {
			throw new Error(
				`Erro inesperado recebido da chamada da API Error: rest/V1/porto/quotation Resultado : ${JSON.stringify(
					postCommerceQuotationResponse
				)}`
			)
		}

		return postCommerceQuotationResponse.data[0].token
	} catch (error) {
		service.logger.error(
			`Api Error quotation commerce: ${JSON.stringify(error)}`
		)
		const dataFromAxiosError = factory.axiosResponseErrorData.getErrorData(
			error,
			'COMMERCE - COTAÇÃO'
		)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack,
			'cmm01'
		)

		throw externalApiError
	}
}

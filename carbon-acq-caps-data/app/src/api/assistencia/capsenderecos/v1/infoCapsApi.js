const CONSTANT = require('../../../../property')
const errors = require('../../../../error')
const factory = require('../../../../factory')
const service = require('../../../../service')
const axios = require('axios')

exports.getCapsInfo = async (queryStringParameters, token) => {
	const quantity = CONSTANT.QUANTITY_DEFAULT_SIZE
	const latitude = queryStringParameters?.latitude
	const longitude = queryStringParameters?.longitude

	const getCapsInfoConfig = {
		method: 'GET',
		url: `${CONSTANT.GATEWAY_URL}/${CONSTANT.API_PATH}`,
		headers: {
			Authorization: `Bearer ${token}`,
			partner: CONSTANT.PARTNER_HEADER_VALUE,
		},
		params: {
			latOrigem: latitude,
			longOrigem: longitude,
			quantidade: quantity,
		},
	}

	try {
		const getCapsInfoResponse = await axios(getCapsInfoConfig)

		if (!getCapsInfoResponse || getCapsInfoResponse.data === undefined) {
			throw new Error(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		}

		return getCapsInfoResponse.data
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
			JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			})
		)

		throw externalApiError
	}
}

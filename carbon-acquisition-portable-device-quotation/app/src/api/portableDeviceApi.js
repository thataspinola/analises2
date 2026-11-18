const { PARTNER_HEADER_VALUE, MULESOFT_URL, API_PATH } = require('../property')
const factory = require('../factory')
const errors = require('../common/errors')
const service = require('../service')
const axios = require('axios')
const https = require('https')
exports.quotationRequest = async (payload, token, portoCertificates) => {
	try {
		const httpsAgent = new https.Agent({ ca: portoCertificates })

		const config = {
			method: 'POST',
			url: `${MULESOFT_URL}/${API_PATH}`,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				partner: PARTNER_HEADER_VALUE,
			},
			data: payload,
			httpsAgent,
		}

		const { data } = await axios(config)

		return data
	} catch (error) {
		if (error.response?.data?.payload) {
			error.response.data = error.response.data.payload
		}
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
			`Erro ao executar chamada get para ${MULESOFT_URL}/${API_PATH}: ${JSON.stringify(
				{
					message: externalApiError.message,
					statusCode: externalApiError.code,
				}
			)}`
		)

		throw externalApiError
	}
}

exports.getCalculoResponse = async (
	hash,
	codigoCanal,
	token,
	portoCertificates
) => {
	try {
		const httpsAgent = new https.Agent({ ca: portoCertificates })

		const config = {
			method: 'GET',
			url: `${MULESOFT_URL}/${API_PATH}`,
			params: {
				hash,
				codigoCanal,
			},
			headers: {
				Authorization: `Bearer ${token}`,
				partner: PARTNER_HEADER_VALUE,
			},
			httpsAgent,
		}
		const { data } = await axios(config)

		return data
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
			`Erro ao executar chamada get para ${MULESOFT_URL}/${API_PATH}: ${JSON.stringify(
				{
					message: externalApiError.message,
					statusCode: externalApiError.code,
				}
			)}`
		)

		throw externalApiError
	}
}

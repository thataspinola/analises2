const CONSTANT = require('../../../../property')
const errors = require('../../../../error')
const factory = require('../../../../factory')
const service = require('../../../../service')
const axios = require('axios')
const https = require('https')

exports.searchCapsAppointment = async (inputData, token, certificate) => {
	const httpsAgent = new https.Agent({
		ca: certificate,
	})
	const getAPICallConfig = {
		method: 'POST',
		url: `${CONSTANT.GATEWAY_URL}/${CONSTANT.API_PATH_APPOINTMENTS}`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		data: inputData,
		httpsAgent,
	}

	try {
		const getAPIResponse = await axios(getAPICallConfig)

		if (!getAPIResponse || getAPIResponse.data === undefined) {
			throw new Error(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		}

		return getAPIResponse.data
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

const axios = require('axios')

const CONSTANT = require('../property')
const errors = require('../error')
const factory = require('../factory')
const service = require('../service')

exports.execute = async (payload) => {
	const config = {
		method: 'POST',
		url: `${CONSTANT.INTERNAL_GTW_EMAIL_NOTIFICATION_URL}/${CONSTANT.API_PATH_EMAIL_NOTIFICATION}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			partner: CONSTANT.PARTNER_HEADER_VALUE,
		},
		data: payload,
	}
	try {
		const response = await axios(config)

		if (!response || response.data === undefined) {
			throw new Error(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		}

		return response.data
	} catch (error) {
		const dataFromAxiosError = factory.axiosHandlerError.getErrorData(error)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack
		)

		service.logger.error(
			JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			})
		)

		throw externalApiError
	}
}

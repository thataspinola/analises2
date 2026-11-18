const CONSTANTS = require('../property')
const { axiosHandlerError } = require('../factory')
const { ExternalApiError } = require('../error')
const { logger } = require('../service')
const axios = require('axios')

exports.getPesCod = async (payload) => {
	try {
		const config = {
			method: 'POST',
			url: `${CONSTANTS.REGISTER_COMPLETE_GATEWAY_URL}/${CONSTANTS.REGISTER_COMPLETE_PATH}`,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
			},
			data: payload,
		}

		const { data } = await axios(config)

		return data
	} catch (error) {
		const errorHandled = axiosHandlerError(error)

		const externalApiError = new ExternalApiError(
			errorHandled.message,
			errorHandled.status,
			error.stack,
			errorHandled.errorCode
		)

		logger.error(
			{
				message: externalApiError.message,
				statusCode: externalApiError.code,
			},
			'Erro ao invocar a API de Register'
		)

		throw externalApiError
	}
}

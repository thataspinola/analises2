const CONSTANTS = require('../property')
const service = require('../service')
const factory = require('../factory')
const errors = require('../error')
const axios = require('axios')

function handleEmailApiError(error) {
	const errorDetails = factory.axiosHandlerError(error)
	const externalApiError = new errors.ExternalApiError(
		errorDetails.message,
		errorDetails.status
	)

	service.logger.error(
		{ operation: 'send_notification' },
		'Falha ao invocar a API de notificação de e-mail'
	)
	throw externalApiError
}

exports.invoke = async (payload) => {
	try {
		const API_URL = `${CONSTANTS.INTERNAL_GTW_EMAIL_NOTIFICATION_URL}/${CONSTANTS.API_PATH}`
		const config = {
			method: 'POST',
			url: API_URL,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
			},
			data: payload,
		}
		const response = await axios(config)

		return response.data
	} catch (error) {
		handleEmailApiError(error)
	}
}


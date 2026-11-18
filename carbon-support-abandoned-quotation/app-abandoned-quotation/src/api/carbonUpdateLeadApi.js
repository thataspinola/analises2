const CONSTANTS = require('../property')
const { axiosHandlerError } = require('../factory')
const { ExternalApiError } = require('../error')
const { logger } = require('../service')
const axios = require('axios')

exports.updateLead = async (payload) => {
	try {
		const config = {
			method: 'PUT',
			url: `${CONSTANTS.UPDATE_LEAD}`,
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
			error.stack
		)

		logger.error({
			updateLeadPayload: payload,
			message: externalApiError.message,
			statusCode: externalApiError.code,
		})

		throw externalApiError
	}
}

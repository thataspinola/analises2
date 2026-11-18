const logger = require('../service/loggerService')
const CONSTANTS = require('../property')
const factory = require('../factory')
const errors = require('../error')
const axios = require('axios')

function handleApiError(error) {
	const errorDetails = factory.axiosHandlerError(error)
	const externalApiError = new errors.ExternalApiError(
		errorDetails.message,
		errorDetails.status
	)

	logger.error('Error invoking Carbon Update Lead API:', errorDetails.message)
	throw externalApiError
}

exports.updateLead = async (payload) => {
	try {
		const config = {
			method: 'PUT',
			url: `${CONSTANTS.CARBON_INTERNAL_GATEWAY_URL}/${CONSTANTS.API_UPDATE_LEAD_PATH}`,
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
		handleApiError(error)
	}
}

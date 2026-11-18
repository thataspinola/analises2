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

	service.logger.error('Error invoking Commerce API: ' + errorDetails.message)
	throw externalApiError
}

exports.searchCriteria = async (orderNumber, token) => {
	try {
		const API_URL = `${
			CONSTANTS.COMMERCE_URL
		}/${CONSTANTS.COMMERCE_SEARCH_CRITERIA(orderNumber)}`
		const config = {
			method: 'GET',
			url: API_URL,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
			},
		}
		const response = await axios(config)

		return response.data
	} catch (error) {
		handleEmailApiError(error)
	}
}

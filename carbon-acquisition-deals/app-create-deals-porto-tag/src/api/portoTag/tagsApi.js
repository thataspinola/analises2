const CONSTANTS = require('../../property')
const axios = require('axios')
const factory = require('../../factory')
const service = require('../../service')

exports.getTagsByDocument = async (document, token) => {
	try {
		const config = {
			method: 'GET',
			url: `${CONSTANTS.PORTOSEG_URL}/${CONSTANTS.TAGS_PATH}?document=${document}`,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
			},
		}

		const { data } = await axios(config)

		return data
	} catch (error) {
		if (error.response?.status === 404) {
			return null
		}
		const errorHandled = factory.axiosResponseErrorDataFactory(error)

		const externalApiError = factory.externalApiFactory.externalApiErrorFactory(
			{
				code: errorHandled.status,
				message: errorHandled.message,
				stack: error.stack,
			}
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

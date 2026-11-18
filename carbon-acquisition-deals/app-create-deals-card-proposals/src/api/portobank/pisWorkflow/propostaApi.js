const CONSTANTS = require('../../../property')
const axios = require('axios')
const factory = require('../../../factory')
const service = require('../../../service')

exports.getCardProposalsInProgressByDocument = async (document, token) => {
	try {
		const config = {
			method: 'GET',
			url: `${CONSTANTS.SENSEDIA_CLOUD_URL}/${CONSTANTS.PROPOSTA_PATH}/documento/${document}?periodo=15&situacao=Pendências`,
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

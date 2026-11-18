const CONSTANTS = require('../../../property')
const factory = require('../../../factory')
const axios = require('axios')
const logger = require('../../../../logger')
const https = require('https');

exports.post = async (data, token, correlationId, timeout = CONSTANTS.OFERTA_API_TIMEOUT_MS) => {
	try {
		const config = {
			method: 'post',
			url: `${CONSTANTS.GATEWAY_URL}/${CONSTANTS.OFERTAS_API_PATH}`,
			timeout,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				partner: CONSTANTS.PARTNER_HEADER_VALUE,
				'carbon-trace-id': `${correlationId}`
			},
			httpsAgent: new https.Agent({rejectUnauthorized: false}),
			data: data,
		}

		const response = await axios(config)
	
		return response.data
	} catch (error) {
		const errorHandled = factory.axiosResponseErrorData(error)

		const externalApiError = factory.externalApi.externalApiErrorFactory({
			code: errorHandled.status,
			message: errorHandled.message,
			stack: error.stack,
		})

		logger.error(
			JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			}),
			`CorrelationId: ${correlationId}`
		)

		throw externalApiError
	}
}

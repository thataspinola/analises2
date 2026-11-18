const {
	PARTNER_HEADER_VALUE,
	SENSEDIA_CLOUD_URL,
	API_PATH,
} = require('../property')
const axios = require('axios')
const service = require('../service')

exports.getPortoPayCards = async (payload, token) => {
	try {
		const config = {
			method: 'POST',
			url: `${SENSEDIA_CLOUD_URL}/${API_PATH}`,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				partner: PARTNER_HEADER_VALUE,
			},
			data: payload,
		}

		const { data } = await axios(config)
		service.logger.info(config.data)
		service.logger.info(data)
		return data
	} catch (error) {
		service.logger.error(error)

		if (error.response) {
			if (error.response.status === 404) {
				return null
			}
			throw new Error(
				`API error: code '${error.response.status}' data: '${JSON.stringify(
					error.response.data
				)}'`
			)
		} else if (error.request) {
			throw new Error('API did not give response')
		}
		throw new Error(`API unexpected error: ${error.message}`)
	}
}

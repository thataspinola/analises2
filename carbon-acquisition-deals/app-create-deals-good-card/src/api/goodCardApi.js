const { PARTNER_HEADER_VALUE, SENSEDIA_URL, API_PATH } = require('../property')
const axios = require('axios')

exports.getGoodCard = async (payload, token) => {
	try {
		const config = {
			method: 'POST',
			url: `${SENSEDIA_URL}/${API_PATH}`,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				partner: PARTNER_HEADER_VALUE,
			},
			data: payload,
		}

		const { data } = await axios(config)

		return data
	} catch (error) {
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

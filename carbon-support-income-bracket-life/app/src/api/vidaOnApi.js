const axios = require('axios')
const CONSTANT = require('../property')

exports.getIncomeBracket = async (tokenBearerString) => {
	const config = {
		method: 'get',
		url: `${CONSTANT.SENSEDIA_CLOUD_URL}/${CONSTANT.API_VIDAON_FAIXA_RENDA_URL}`,
		headers: {
			Authorization: `Bearer ${tokenBearerString}`,
			'Content-Type': 'application/json',
		},
	}

	let axiosResponse = null

	try {
		axiosResponse = await axios(config)
	} catch (err) {
		if (err.response) {
			throw new Error(
				`API error: code '${err.response.status}' data: '${JSON.stringify(
					err.response.data
				)}'`
			)
		} else if (err.request) {
			throw new Error('API did not give response')
		}
		throw new Error(`API unexpected error: ${err.message}`)
	}

	if (!axiosResponse || !axiosResponse.status) {
		throw new Error('API unexpected error: Empty or invalid response')
	}

	return axiosResponse.data
}

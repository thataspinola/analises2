const axios = require('axios')
const CONSTANTS = require('../property')
const { logger } = require('../service')

exports.getProfessions = (token) => {
	const config = {
		method: 'get',
		url: `${CONSTANTS.PROFESSION_API_URL}/${CONSTANTS.PROFESSION_API_PATH}`,
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${token}`,
			partner: CONSTANTS.PARTNER_HEADER_VALUE,
		},
	}

	return axios(config)
		.then(function (response) {
			return response.data
		})
		.catch((err) => {
			if (err.response) {
				logger.error(err.response.data)
			}
			throw new Error(`Error on Product API: ${err}`)
		})
}

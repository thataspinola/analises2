const axios = require('axios')
const CONSTANT = require('../../../../../property')

exports.postAntifraud = async (
	cpfCnpj,
	corporateHeaderValue,
	sensediaToken
) => {
	const postAntifraudOptions = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.PORTAIS_MSUSUARIOS_USERS_ACTIVATION_SIMPLE_ANTIFRAUD_API_PATH}?createUserAccess=true`,
		headers: {
			Authorization: `Bearer ${sensediaToken}`,
			'Content-Type': 'application/json',
			corporativoRequestHeader: corporateHeaderValue,
			codigoAutorizacao: CONSTANT.ANTIFRAUD_AUTHORIZATION_CODE,
			partner: 'HUB-VENDAS-CARBON',
		},
		data: { cpfCnpj: cpfCnpj },
	}

	let postAntifraudResponse = null

	try {
		postAntifraudResponse = await axios(postAntifraudOptions)
	} catch (err) {
		if (err.response) {
			let errorDataValue = err.response.data //Need to be considered to cover a 400 response caused by invalid payload
			if (err.response.data.length && err.response.data[0]) {
				errorDataValue = err.response.data[0] //Need to be considered to cover a 400 response
				if (err.response.data[0].data) {
					errorDataValue = err.response.data[0].data //Need to be considered to cover a 400 response generated from a lexisnexis error
				}
			}
			throw new Error(
				`API error: code '${err.response.status}' data: '${JSON.stringify(
					errorDataValue
				)}'`
			)
		} else if (err.request) {
			throw new Error('API did not give response')
		}
		throw new Error(`API unexpected error: ${err.message}`)
	}

	if (!postAntifraudResponse || postAntifraudResponse.data === undefined) {
		throw new Error('API unexpected error: Empty or invalid response')
	}

	return postAntifraudResponse.data
}

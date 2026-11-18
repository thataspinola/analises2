const axios = require('axios')
const CONSTANT = require('../../../../property')
const factory = require('../../../../factory')

exports.activation = require('./activation')
exports.postStatus = async (cpfCnpj, sensediaToken) => {
	const postStatusOptions = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.PORTAIS_MSUSUARIOS_USERS_STATUS_API_PATH}`,
		headers: {
			Authorization: `Bearer ${sensediaToken}`,
			'Content-Type': 'application/json',
			codigoAutorizacao: CONSTANT.ANTIFRAUD_AUTHORIZATION_CODE,
		},
		data: { cpfCnpj: cpfCnpj },
	}

	let postStatusResponse = null

	try {
		postStatusResponse = await axios(postStatusOptions)
	} catch (err) {
		if (err.response) {
			if (err.response.status === 404) {
				return err.response
			} else {
				const errorDataValue =
					factory.portais.msusuarios.users.statusResponseError.extractData(
						err.response
					)
				throw new Error(
					`API error: code '${err.response.status}' data: '${JSON.stringify(
						errorDataValue
					)}'`
				)
			}
		} else if (err.request) {
			throw new Error('API did not give response')
		}
		throw new Error(`API unexpected error: ${err.message}`)
	}

	if (!postStatusResponse || postStatusResponse.data === undefined) {
		throw new Error('API unexpected error: Empty or invalid response')
	}

	return postStatusResponse
}

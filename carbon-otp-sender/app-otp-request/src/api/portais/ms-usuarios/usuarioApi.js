const axios = require('axios')
const CONSTANT = require('../../../../src/property')

exports.getContatos = async (cpf, sensediaToken) => {
	const getContatosOptions = {
		method: 'GET',
		url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.PORTAIS_MSUSUARIOS_USUARIO_API_PATH}/${cpf}/contatos`,
		headers: {
			Authorization: `Bearer ${sensediaToken}`,
			'Content-Type': 'application/json',
			codigoAutorizacao: CONSTANT.AUTHORIZATION_CODE,
		},
	}

	let getContatosResponse = null

	try {
		getContatosResponse = await axios(getContatosOptions)
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

	if (!getContatosResponse || getContatosResponse.data === undefined) {
		throw new Error('API unexpected error: Empty or invalid response')
	}

	if (getContatosResponse.data.status !== 200) {
		if (getContatosResponse.data.status === 404) {
			return null
		}
		throw new Error(
			`API error: code '${
				getContatosResponse.data.status
			}' data: '${JSON.stringify(
				getContatosResponse.data.data
			)}' errors: '${JSON.stringify(getContatosResponse.data.errors)}'`
		)
	}

	return getContatosResponse.data.data.length
		? getContatosResponse.data.data[0]
		: null
}

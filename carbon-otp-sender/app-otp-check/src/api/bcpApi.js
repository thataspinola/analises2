const axios = require('axios')
const CONSTANT = require('../property')

exports.getDadosPessoa = async (cpf, token) => {
	const getDadosPessoaRequestOptions = {
		method: 'GET',
		url: `${CONSTANT.MULESOFT_URL}/${CONSTANT.BCP_API_PATH}?numDocumento=${cpf}`,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			partner: CONSTANT.PARTNER_HEADER_VALUE,
		},
	}

	let getDadosPessoaResponse = null

	try {
		getDadosPessoaResponse = await axios(getDadosPessoaRequestOptions)
	} catch (err) {
		if (err.response) {
			if (
				err.response.status === 404 &&
				err.response.data === 'Nenhum dado de pessoa encontrado'
			) {
				return null
			}
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

	if (!getDadosPessoaResponse || getDadosPessoaResponse.data === undefined) {
		throw new Error('API unexpected error: Empty or invalid response')
	}

	return getDadosPessoaResponse.data
}

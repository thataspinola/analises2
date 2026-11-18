const axios = require('axios')
const CONSTANT = require('../../../../../property')
const https = require('https')
const { ExternalApiError } = require('../../../../../error')

exports.get = async (pescod, mulesoftToken) => {
	const httpsAgent = new https.Agent({ ca: CONSTANT.CA_CERT_ARRAY })
	const getRequestOptions = {
		method: 'GET',
		url: `${CONSTANT.MULESOFT_URL}/${CONSTANT.GOVERNANCA_DADOS_PESSOA_API_PATH}/${pescod}/documentoidentificacao`,
		headers: {
			Authorization: `Bearer ${mulesoftToken}`,
			accept: 'application/json',
			'Content-Type': 'application/json',
			partner: CONSTANT.PARTNER_HEADER_VALUE,
		},
		httpsAgent,
	}

	let getRequestResponse = null

	try {
		getRequestResponse = await axios(getRequestOptions)
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

	if (!getRequestResponse || getRequestResponse.data === undefined) {
		throw new ExternalApiError('API unexpected error: Empty or invalid response')
	}

	if (
		!getRequestResponse.data.pessoa?.documentosIdentificacao ||
		!Array.isArray(getRequestResponse.data.pessoa?.documentosIdentificacao) ||
		getRequestResponse.data.pessoa?.documentosIdentificacao.length < 1
	) {
		return null
	}

	return getRequestResponse.data.pessoa?.documentosIdentificacao[0]
}

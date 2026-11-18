const axios = require('axios')
const CONSTANT = require('../../property')

exports.postConsentimentos = async (consentPayload, sensediaToken) => {
	const postConsentimentosOptions = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.AUDITORIA_RASTREABILIDADECDC_CONSENTIMENTOS_API_PATH}`,
		headers: {
			Authorization: `Bearer ${sensediaToken}`,
			'Content-Type': 'application/json',
		},
		data: consentPayload,
	}

	let postConsentimentosResponse = null

	try {
		postConsentimentosResponse = await axios(postConsentimentosOptions)
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

	if (
		!postConsentimentosResponse ||
		postConsentimentosResponse.data === undefined
	) {
		throw new Error('API unexpected error: Empty or invalid response')
	}

	return postConsentimentosResponse.data
}

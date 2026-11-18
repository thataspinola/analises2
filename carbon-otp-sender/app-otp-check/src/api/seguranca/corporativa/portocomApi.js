const axios = require('axios')
const CONSTANT = require('../../../property')

exports.postValidaTokenAa = async (
	postValidaTokenAaPayload,
	apiSensediaCloudTokenString
) => {
	const postValidaTokenAaRequestConfig = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_CLOUD_URL}/${CONSTANT.SEGURANCA_CORPORATIVA_PORTOCOM_VALIDATOKENAA_API_PATH}`,
		headers: {
			Authorization: `Bearer ${apiSensediaCloudTokenString}`,
			'Content-Type': 'application/json',
		},
		data: postValidaTokenAaPayload,
	}

	let postValidaTokenAaResponse = null

	try {
		postValidaTokenAaResponse = await axios(postValidaTokenAaRequestConfig)
		if (!postValidaTokenAaResponse || !postValidaTokenAaResponse.data) {
			throw new Error('Empty or invalid response')
		}
	} catch (err) {
		if (err.response) {
			if (err.response.status === 404) {
				return err.response
			} else {
				throw new Error(
					`API error: code '${err.response.status}' data: '${JSON.stringify(
						err.response.data
					)}'`
				)
			}
		} else if (err.request) {
			throw new Error('API did not give response')
		}
		throw new Error(`API unexpected error: ${err.message}`)
	}

	return postValidaTokenAaResponse
}

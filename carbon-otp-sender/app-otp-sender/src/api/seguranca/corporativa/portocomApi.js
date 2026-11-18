const axios = require('axios')
const CONSTANT = require('../../../property')

exports.postGeraTokenAa = async (
	postGeraTokenAaPayload,
	apiSensediaCloudTokenString
) => {
	const postGeraTokenAaRequestConfig = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_CLOUD_URL}/${CONSTANT.SEGURANCA_CORPORATIVA_PORTOCOM_GERATOKENAA_API_PATH}`,
		headers: {
			Authorization: `Bearer ${apiSensediaCloudTokenString}`,
			'Content-Type': 'application/json',
		},
		data: postGeraTokenAaPayload,
	}

	let postGeraTokenAaResponse = null

	try {
		postGeraTokenAaResponse = await axios(postGeraTokenAaRequestConfig)
		if (
			!postGeraTokenAaResponse ||
			!postGeraTokenAaResponse.data ||
			!postGeraTokenAaResponse.data.otp
		) {
			throw new Error('Empty or invalid response')
		}
	} catch (err) {
		if (err.response) {
			if (err.response.status === 404) {
				throw err
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

	return postGeraTokenAaResponse
}

const axios = require('axios')
const CONSTANT = require('../../property')

exports.postSendSms = async (sendSmsPayload, token) => {
	const postSendSmsRequestOptions = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.CORPORATIVO_SMSSERVICE_SENDSMS_API_PATH}`,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		data: sendSmsPayload,
	}

	let postSendSmsResponse = null

	try {
		postSendSmsResponse = await axios(postSendSmsRequestOptions)
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

	if (!postSendSmsResponse || postSendSmsResponse.data === undefined) {
		throw new Error('API unexpected error: Empty or invalid response')
	}

	return postSendSmsResponse.data
}

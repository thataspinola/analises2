const axios = require('axios')
const CONSTANT = require('../../property')
const factory = require('../../factory')

exports.postWhatsappPortoBotTrigger = async (
	whatsappPortoBotTriggerPayload
) => {
	const postWhatsappPortoBotTriggerHeaders =
		factory.api.zenvia.portoAssistencia.whatsappPortoBotTrigger.getHeaders()
	const postWhatsappPortoBotTriggerOptions = {
		method: 'POST',
		url: `${CONSTANT.ZENVIA_URL}/${CONSTANT.ZENVIA_PORTOASSISTENCIA_WHATSAPPBOT_PORTOSEGURO_SENDER_API_PATH}`,
		headers: postWhatsappPortoBotTriggerHeaders,
		data: whatsappPortoBotTriggerPayload,
	}

	let postWhatsappPortoBotTriggerResponse = null

	try {
		postWhatsappPortoBotTriggerResponse = await axios(
			postWhatsappPortoBotTriggerOptions
		)
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
		!postWhatsappPortoBotTriggerResponse ||
		postWhatsappPortoBotTriggerResponse.data === undefined
	) {
		throw new Error('API unexpected error: Empty or invalid response')
	}

	return postWhatsappPortoBotTriggerResponse.data
}

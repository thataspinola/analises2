const CONSTANTS = require('../../src/property')
const axios = require('axios')

exports.putUpdateLead = async (putUpdateLeadPayload) => {
	try {
		const putUpdateLeadIptions = {
			method: 'PUT',
			url: CONSTANTS.UPDATE_LEAD_ENDPOINT_URL,
			data: putUpdateLeadPayload,
		}

		response = await axios(putUpdateLeadIptions)
		return response
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
}

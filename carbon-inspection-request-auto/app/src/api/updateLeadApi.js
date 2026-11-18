const CONSTANTS = require('../../src/property')

const axios = require('axios')

exports.put = async (putUpdateLeadPayload) => {
	try {
		const putUpdateLeadIptions = {
			method: 'PUT',
			url: `${CONSTANTS.UPDATE_LEAD_API_URL}/${CONSTANTS.V1_UPDATE_LEAD_ENDPOINT}`,
			data: putUpdateLeadPayload,
		}

		const response = await axios(putUpdateLeadIptions)
		if (!response || response.data === undefined) {
			throw new Error(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		}

		return response.data
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

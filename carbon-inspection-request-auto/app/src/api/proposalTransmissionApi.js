const CONSTANTS = require('../property')

const axios = require('axios')
const uuidV1 = require('uuid').v1()
const service = require('../service')

exports.post = async (payload, sensidiaTokenString) => {
	const postProposalTransmissionRequestConfig = {
		method: 'POST',
		url: `${CONSTANTS.SENSEDIA_URL}/${CONSTANTS.AUTO_PROPOSAL_TRANSMISSION_PATH(
			payload?.numeroCotacao,
			payload?.orcamento?.codigo
		)}`,
		headers: {
			Authorization: `Bearer ${sensidiaTokenString}`,
			'Content-Type': 'application/json',
			'X-TRID': `HUB-VENDAS-${uuidV1}`,
		},
		data: payload,
	}

	let response = null

	try {
		response = await axios(postProposalTransmissionRequestConfig)
	} catch (err) {
		if (err.response) {
			if (
				err.response.status === 400 &&
				err.response.data.errors[0].errorMessage ===
					CONSTANTS.PROPOSAL_PROCESS_BEING_ISSUED_MESSAGE
			) {
				service.logger.warn(err.response.data, 'transmissão realizda duas vezes')
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

	return response
}

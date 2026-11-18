const axios = require('axios')
const {
	SENSEDIA_URL,
	AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH
} = require('../property')
const { axiosHandlerError } = require('../factory')
const { ExternalApiError } = require('../error')

exports.getProtocols = async (quotationNumber, sensediaToken) => {
	const getProtocolsOptions = {
		method: 'GET',
		url: `${SENSEDIA_URL}/${AUTOMOVEL_PARCEIRO_MARKETPLACE_OFERTAS_COTACOES_API_PATH}/${quotationNumber}/protocolos`,
		headers: {
			Authorization: `Bearer ${sensediaToken}`,
			'Content-Type': 'application/json',
		},
	}

	let getProtocolsResponse = null

	try {
		getProtocolsResponse = await axios(getProtocolsOptions)
	} catch (err) {
		const errorHandled = axiosHandlerError(err)

		throw new ExternalApiError(
			errorHandled.message,
			errorHandled.status,
			err.stack
		)
	}

	if (!getProtocolsResponse || getProtocolsResponse.data === undefined) {
		throw new ExternalApiError('API unexpected error: Empty or invalid response', null, null)
	}

	if (!getProtocolsResponse.data.proposta?.numero) {
		throw new ExternalApiError('API unexpected error: missing proposta.numero', getProtocolsResponse.status, null)
	}
	if (!getProtocolsResponse.data.proposta?.origem) {
		throw new ExternalApiError('API unexpected error: missing proposta.origem', getProtocolsResponse.status, null)
	}

	return getProtocolsResponse.data
}

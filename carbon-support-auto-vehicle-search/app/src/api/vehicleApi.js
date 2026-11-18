const { axiosHandlerError } = require('../factory')
const axios = require('axios')
const {
	TYPE_TABLE_REFERENCE,
	PARTNER_HEADER_VALUE,
	SENSEDIA_URL,
	API_PATH,
} = require('../property')

exports.getDataPerPlate = async (plate, token) => {
	const config = {
		method: 'get',
		url: `${SENSEDIA_URL}/${API_PATH}?placa=${plate}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			partner: PARTNER_HEADER_VALUE,
		},
	}

	return getInAutoApi(config, token)
}

exports.getDataPerDescriptionAndYearModel = async (
	description,
	yearModel,
	token
) => {
	const config = {
		method: 'get',
		url: `${SENSEDIA_URL}/${API_PATH}?descricao=${description}&anoModelo=${yearModel}&tipoTabelaReferencia=${TYPE_TABLE_REFERENCE}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			partner: PARTNER_HEADER_VALUE,
		},
	}

	return getInAutoApi(config, token)
}

async function getInAutoApi(config, token) {
	try {
		const { data } = await axios(config)

		return data
	} catch (error) {
		const errorHandled = axiosHandlerError(error)

		const externalApiError = new ExternalApiError(
			errorHandled.message,
			errorHandled.status,
			error.stack
		)

		logger.error(
			JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			})
		)

		throw externalApiError
	}
}

const axios = require('axios')
const https = require('https')
const CONSTANTS = require('../../property')
const errors = require('../../error')
const factory = require('../../factory')
const service = require('../../service')

exports.execute = async (payload, token, portoCertificates) => {
	const httpsAgent = new https.Agent({ ca: portoCertificates })
	const config = {
		method: 'POST',
		url: `${CONSTANTS.MULESOFT_URL}/${CONSTANTS.API_PATH_PROPOSTA}`,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			partner: CONSTANTS.PARTNER_HEADER_VALUE,
		},
		data: payload,
		httpsAgent,
	}
	try {
		// return {
		// 	numeroProposta: 1154028781,
		// 	mensagem: 'Proposta transmitida.',
		// }
		const response = await axios(config)

		if (!response || response.data === undefined) {
			throw new Error(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		}

		return response.data
	} catch (error) {
		const dataFromAxiosError = factory.axiosHandlerError.getErrorData(error)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack
		)

		service.logger.error(
			JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			})
		)

		throw externalApiError
	}
}

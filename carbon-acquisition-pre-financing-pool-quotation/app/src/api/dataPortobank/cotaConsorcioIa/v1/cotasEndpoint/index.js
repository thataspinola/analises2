const CONSTANT = require('../../../../../property')
const errors = require('../../../../../error')
const factory = require('../../../../../factory')
const service = require('../../../../../service')
const axios = require('axios')
const https = require('https')

//Código do certificado comentado pois estamos usando api externa e não precisa de certificado, mantendo o código caso futuramente precise 
exports.post = async (payload, token) => {
	try {
		const body = { ...payload.pre_financing_pool }
		//const httpsAgent = new https.Agent({ ca: certificates })
		let requestHeaders = {
			accept: 'application/json',
			'Content-Type': 'application/json',
			partner: CONSTANT.PARTNER_HEADER_VALUE,
			Authorization: `Bearer ${token}`,
		}
		const requestConfig = {
			method: 'POST',
			url: `${CONSTANT.SENSEDIA_URL_CONSORCIO_EXTERNO}/${CONSTANT.APF_PORTOBANK_COTA_CONSORCIO_ENDPOINT_PATH}`,
			headers: { ...requestHeaders },
			data: body,
			//httpsAgent
		}
		service.logger.info(`Efetuando chamada para api de bank com os dados : ${JSON.stringify(body)}`)
		const axiosResponse = await axios(requestConfig)
		if (!axiosResponse || axiosResponse.data === undefined) {
			throw new Error(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		}
		return axiosResponse.data
	} catch (error) {
		const errorHandled = factory.axiosResponseErrorData.getErrorData(error)

		const externalApiError = new errors.ExternalApiError(
			errorHandled.message,
			errorHandled.status,
			error.stack
		)

		service.logger.error(
			`Erro ao executar chamada post para ${CONSTANT.SENSEDIA_URL_CONSORCIO_EXTERNO}/${
				CONSTANT.APF_PORTOBANK_COTA_CONSORCIO_ENDPOINT_PATH
			}: ${JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			})}`
		)

		throw externalApiError
	}
}

const axios = require('axios')
const errors = require('../error')
const factory = require('../factory')
const CONSTANT = require('../property')
const service = require('../service')
const https = require('https')

exports.sendEmail = async (inputData, token) => {
	const httpsAgent = new https.Agent({ ca: CONSTANT.CA_CERT_ARRAY })
	const requestOption = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.API_SENDEMAIL_URL}`,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			partner: CONSTANT.PARTNER_HEADER_VALUE,
		},
		data: inputData,
		httpsAgent,
	}
	service.logger.info(requestOption)
	try {
		const responseApiRequest = await axios(requestOption)
		service.logger.info(
			`email enviado com sucesso para: ${JSON.stringify(
				inputData.emailsRecebedores
			)}`
		)

		if (!responseApiRequest || responseApiRequest.data === undefined) {
			service.logger.info('Resultado de chamada vazio ou inválido')
			throw new Error('Resultado de chamada vazio ou inválido')
		}

		return responseApiRequest.data
	} catch (error) {
		const dataFromAxiosError =
			factory.axiosResponseErrorData.getErrorData(error)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack
		)

		service.logger.error(
			{
				message: externalApiError.message,
				statusCode: externalApiError.code,
				stack: externalApiError.stack,
			},
			'Erro ao tentar chamar a API'
		)

		throw externalApiError
	}
}

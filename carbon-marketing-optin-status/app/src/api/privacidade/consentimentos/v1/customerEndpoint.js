const CONSTANT = require('../../../../property')
const factory = require('../../../../factory')
const service = require('../../../../service')
const axios = require('axios')

exports.get = async (inputData, token, certificate, traceId) => {
	let currentActivity = CONSTANT.MESSAGES.COTATION_API.CONFIGING

	const httpsAgent = factory.httpsAgent.createHttpsAgent(certificate)

	const config = {
		method: 'GET',
		url: `${CONSTANT.GATEWAY_URL}/${CONSTANT.CONSENTS_API_PATH}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			partner: CONSTANT.PARTNER_HEADER_VALUE,
			'carbon-trace-id': `${traceId}`
		},
		params: {cpf: inputData.taxvat},
		httpsAgent
	}

	try {
		currentActivity = CONSTANT.MESSAGES.COTATION_API.REQUESTING
		const {data} = await axios(config)

		return data
	} catch (ex) {
		const errorHandled = factory.axiosResponseErrorData(ex)

		const externalApiError = factory.externalApi.externalApiErrorFactory(
			{
				code: errorHandled.status,
				message: errorHandled.message,
				stack: ex.stack
			}
		)
		
		const errorReporting = JSON.stringify({
			rawError: ex,
			carbonErrorData: {
				identifiers: `carbon-trace-id: ${traceId} | taxvat: ${service.dataMask.maskCpf(inputData?.document)}`,
				layer: 'Integration',
				currentActivity: `Erro identificado durante a atividade: '${currentActivity}'`,
				errorMessage: externalApiError.message
			}
		})

		service.logger.error(
			errorReporting,
			`Erro identificado durante a atividade: '${currentActivity}'. ErrorMessage: ${externalApiError.message}`
		)

		throw externalApiError
	}
}

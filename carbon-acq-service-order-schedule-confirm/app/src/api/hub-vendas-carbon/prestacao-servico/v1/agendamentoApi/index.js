const CONSTANT = require('../../../../../property')
const ERRORS = require('../../../../../error')
const factory = require('../../../../../factory')
const service = require('../../../../../service')
const axios = require('axios')

exports.postBaixaEndpoint = async (
	payload,
	token,
	impersonalUserCarbon,
	carbonTraceId
) => {
	let apiCallHeaders = {
		accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
		B64_IBA: impersonalUserCarbon,
		partner: CONSTANT.API_PARTNER_HEADER_VALUE,
	}

	if (carbonTraceId) {
		apiCallHeaders['carbon-trace-id'] = carbonTraceId
	}

	const postBaixaEndpointConfig = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_CLOUD_URL}/${CONSTANT.HUB_VENDAS_CARBON_PRESTACAO_SERVICO_V1_AGENDAMENTO_API_ENDPOINT_PATH}`,
		headers: apiCallHeaders,
		data: payload,
	}

	try {
		const baixaEndpointResponse = await axios(postBaixaEndpointConfig)

		if (!baixaEndpointResponse || baixaEndpointResponse.data === undefined) {
			throw new Error(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		}

		const { status, message } = baixaEndpointResponse.data

		if (
			status === 'OK' &&
			(message === 'Servico no Moov' ||
				message === 'Baixa realizada com sucesso.')
		) {
			return baixaEndpointResponse.data
		} else {
			service.logger.info(
				`Resposta inválida recebida: status=${status}, message=${message}`
			)
			throw new Error('Resposta da API indica erro ou serviço não encontrado')
		}
	} catch (error) {
		const axiosResponsePaymentErrorData =
			factory.axiosResponseErrorData.getErrorData(error)

		const externalPaymentApiError = new ERRORS.ExternalApiError(
			axiosResponsePaymentErrorData.message,
			axiosResponsePaymentErrorData.status,
			axiosResponsePaymentErrorData.paymentError,
			error.stack
		)

		service.logger.error(
			{
				rawError: error,
			},
			JSON.stringify({
				message: externalPaymentApiError.message,
				statusCode: externalPaymentApiError.code,
				paymentError: JSON.stringify(externalPaymentApiError.paymentErrorData),
			})
		)

		throw externalPaymentApiError
	}
}

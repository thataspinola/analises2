const CONSTANT = require('../../../../../property')
const ERRORS = require('../../../../../error')
const factory = require('../../../../../factory')
const service = require('../../../../../service')
const axios = require('axios')

exports.putConsumoEndpoint = async (payload, token, carbonTraceId) => {
	let apiCallHeaders = {
		accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	}

	if (carbonTraceId) {
		apiCallHeaders = {
			...apiCallHeaders,
			'carbon-trace-id': `${carbonTraceId}`,
		}
	}

	const putConsumoEndpointConfig = {
		method: 'PUT',
		url: `${CONSTANT.SENSEDIA_CLOUD_URL}/${CONSTANT.PORTOASSISTENCIA_B2C_CUPOM_CONSUMO_API_ENDPOINT_PATH}`,
		headers: apiCallHeaders,
		data: payload,
	}

	try {
		const putConsumoEndpointResponse = await axios(putConsumoEndpointConfig)

		if (
			!putConsumoEndpointResponse ||
			putConsumoEndpointResponse.data === undefined
		) {
			throw new Error(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		}

		return putConsumoEndpointResponse.data
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

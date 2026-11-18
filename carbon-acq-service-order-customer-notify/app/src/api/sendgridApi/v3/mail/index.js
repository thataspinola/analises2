const CONSTANT = require('../../../../property')
const ERRORS = require('../../../../error')
const factory = require('../../../../factory')
const service = require('../../../../service')
const axios = require('axios')

exports.postSendEndpoint = async (payload, carbonTraceId) => {
	let apiCallHeaders = {
		accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${CONSTANT.PORTOSERVICO_SENDGRID_AUTH_TOKEN}`,
	}

	if (carbonTraceId) {
		apiCallHeaders = {
			...apiCallHeaders,
			'carbon-trace-id': `${carbonTraceId}`,
		}
	}

	const postSendEndpointConfig = {
		method: 'POST',
		url: `${CONSTANT.SENDGRID_API_URL}/${CONSTANT.SENDGRID_API_ENDPOINT_PATH}`,
		headers: apiCallHeaders,
		data: payload,
	}

	try {
		const postSendEndpointResponse = await axios(postSendEndpointConfig)

		if (
			!postSendEndpointResponse ||
			postSendEndpointResponse.data === undefined
		) {
			throw new Error('Resultado de chamada vazio ou inválido')
		}

		if (
			postSendEndpointResponse.data === '' &&
			postSendEndpointResponse.status === 202
		) {
			return { message: 'E-mail enviado com sucesso' }
		}

		return postSendEndpointResponse.data
	} catch (error) {
		const axiosResponsePaymentErrorData =
			factory.axiosResponseErrorData.getErrorData(error)

		const externalPaymentApiError = new ERRORS.ExternalApiError(
			axiosResponsePaymentErrorData.message,
			axiosResponsePaymentErrorData.status,
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

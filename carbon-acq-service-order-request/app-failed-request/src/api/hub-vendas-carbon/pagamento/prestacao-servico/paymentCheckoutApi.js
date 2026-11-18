const CONSTANT = require('../../../../property')
const { errors } = require(CONSTANT.COMMON_LIBRARY_LOCATION)
const factory = require('../../../../factory')
const service = require('../../../../service')
const axios = require('axios')

exports.postServiceProvisionPaymentCheckout = async (
	payload,
	carbonTraceId
) => {
	let apiCallHeaders = {
		accept: 'application/json',
		'Content-Type': 'application/json',
		partner: CONSTANT.PARTNER_HEADER_VALUE,
	}

	if (carbonTraceId) {
		apiCallHeaders = {
			...apiCallHeaders,
			'carbon-trace-id': `${carbonTraceId}`,
		}
	}
	const config = {
		method: 'POST',
		url: `${CONSTANT.CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_URL}/${CONSTANT.CARBON_SERVICE_ORDER_PAYMENT_CHECKOUT_API_ENDPOINT_PATH}`,
		headers: { ...apiCallHeaders },
		data: payload,
	}

	try {
		const postServiceProvisionPaymentCheckoutResponse = await axios(config)

		if (
			!postServiceProvisionPaymentCheckoutResponse ||
			postServiceProvisionPaymentCheckoutResponse.data === undefined
		) {
			throw new Error(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		}

		service.logger.info(
			`Resposta recebida da API de checkout de pagamento: ${JSON.stringify(
				postServiceProvisionPaymentCheckoutResponse.data
			)}`
		)

		return postServiceProvisionPaymentCheckoutResponse.data
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
				rawError: error,
			},
			JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			})
		)

		throw externalApiError
	}
}

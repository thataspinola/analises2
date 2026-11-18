const CONSTANT = require('../../../../property')
const { errors } = require(CONSTANT.COMMON_LIBRARY_LOCATION)
const factory = require('../../../../factory')
const service = require('../../../../service')
const axios = require('axios')

exports.createServiceOrder = async (
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
		apiCallHeaders = {
			...apiCallHeaders,
			'carbon-trace-id': `${carbonTraceId}`,
		}
	}

	const config = {
		method: 'POST',
		url: `${CONSTANT.SENSEDIA_CLOUD_URL}/${CONSTANT.API_PATH}`,
		headers: { ...apiCallHeaders },
		data: payload,
	}

	try {
		const createServiceOrderResponse = await axios(config)

		if (
			!createServiceOrderResponse ||
			createServiceOrderResponse.data === undefined ||
			createServiceOrderResponse.data.serviceOrderNumber === '0-0'
		) {
			throw new Error(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		}

		service.logger.info(
			`Ordem de serviço criada com sucesso: ${createServiceOrderResponse.data.serviceOrderNumber} (carbonTraceId: ${carbonTraceId})`
		)

		return createServiceOrderResponse.data
	} catch (error) {
		service.logger.warn(
			`Erro retornado pela API de criar OS: ${JSON.stringify(error)}`
		)

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
				apiUrl: config.url,
				carbonTraceId: carbonTraceId,
				payloadTransactionId: payload?.transactionId || 'N/A',
			})
		)

		throw externalApiError
	}
}

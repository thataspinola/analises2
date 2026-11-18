const CONSTANT = require('../../../../property')
const errors = require('../../../../error')
const factory = require('../../../../factory')
const service = require('../../../../service')
const axios = require('axios')

exports.postCheckinOs = async (parsedJsonRequest, token, carbonTraceId) => {
	let apiCallHeaders = {
		accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
		token: CONSTANT.TOKEN_PORTOASSISTENCIA_MULESOFT,
		clientid: CONSTANT.CLIENTID_PORTOASSISTENCIA_MULESOFT,
		tenantid: CONSTANT.TENANT_ID_PORTOASSISTENCIA_MULESOFT
	}

	if (carbonTraceId) {
		apiCallHeaders = {
			...apiCallHeaders,
			'carbon-trace-id': `${carbonTraceId}`,
		}
	}

	const postCheckinOsConfig = {
		method: 'POST',
		url: `${CONSTANT.MULESOFT_URL}/${CONSTANT.PORTOASSISTENCIA_ENDPOINT_PATH}`,
		headers: apiCallHeaders,
		data: parsedJsonRequest,
	}

	try {
		const postCheckinOsResponse = await axios(postCheckinOsConfig)

		if (!postCheckinOsResponse || postCheckinOsResponse.data === undefined) {
			service.logger.info('Resultado de chamada vazio ou inválido')
			return Promise.reject(new Error('Resultado de chamada vazio ou inválido'))
		}
		if (postCheckinOsResponse.data.erro) {
			service.logger.info(postCheckinOsResponse.data)
			return Promise.reject(
				new Error(`${postCheckinOsResponse.data?.erro?.mensagemErro}`)
			)
		}

		return postCheckinOsResponse.data
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

		return Promise.reject(externalApiError)
	}
}

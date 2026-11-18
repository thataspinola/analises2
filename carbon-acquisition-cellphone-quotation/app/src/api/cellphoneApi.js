const {
	QUOTATION_CALCULATION_API_ERROR_DEFAULT_MESSAGE,
	QUOTATION_REQUEST_API_ERROR_DEFAULT_MESSAGE,
	PARTNER_HEADER_VALUE,
	MULESOFT_URL,
	API_PATH,
} = require('../property')
const { axiosHandlerError } = require('../factory')
const { ExternalApiError } = require('../common/errors')
const { logger } = require('../../src/service')
const axios = require('axios')
const https = require('https')

exports.quotationRequest = async (payload, token, portoCertificates) => {
	try {
		const httpsAgent = new https.Agent({ ca: portoCertificates })

		const config = {
			method: 'POST',
			url: `${MULESOFT_URL}/${API_PATH}`,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				partner: PARTNER_HEADER_VALUE,
			},
			data: payload,
			httpsAgent
		}

		const { data } = await axios(config)

		return data
	} catch (error) {
		const errorHandled = axiosHandlerError(error)
		const externalApiError = new ExternalApiError(
			errorHandled.message ?? QUOTATION_REQUEST_API_ERROR_DEFAULT_MESSAGE,
			errorHandled.status,
			error.stack
		)

		logger.error(
			{
				message: externalApiError.message,
				statusCode: externalApiError.code
			},
			'Erro ao invocar o método POST na API de Produto'
		)

		throw externalApiError
	}
}

exports.getCalculoResponse = async (hash, codigoCanal, token, portoCertificates) => {
	try {
		const httpsAgent = new https.Agent({ ca: portoCertificates })

		const config = {
			method: 'GET',
			url: `${MULESOFT_URL}/${API_PATH}`,
			params: {
				hash,
				codigoCanal,
			},
			headers: {
				Authorization: `Bearer ${token}`,
				partner: PARTNER_HEADER_VALUE,
			},
			httpsAgent
		}
		const { data } = await axios(config)

		return data
	} catch (error) {
		const errorHandled = axiosHandlerError(error)

		const externalApiError = new ExternalApiError(
			errorHandled.message ?? QUOTATION_CALCULATION_API_ERROR_DEFAULT_MESSAGE,
			errorHandled.status,
			error.stack,
			errorHandled.errorCode
		)

		logger.error(
			{
				message: externalApiError.message,
				statusCode: externalApiError.code,
				errorCode: externalApiError.errorCode
			},
			'Erro ao invocar o método GET na API de Produto'
		)

		throw externalApiError
	}
}

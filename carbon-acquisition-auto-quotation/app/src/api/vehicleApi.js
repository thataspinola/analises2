const CONSTANT = require('../property')
const { vehicleApiErrorFactory } = require('../factory')
const { VehicleApiError } = require('../error')
const { logger } = require('../../config')
const axios = require('axios')
const uuidV1 = require('uuid').v1()
const https = require('https')

exports.generateQuote = async (payload, token) => {
	try {
		const config = {
			method: 'POST',
			url: `${CONSTANT.SENSEDIA_URL}/${CONSTANT.API_PATH}`,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
				partner: CONSTANT.PARTNER_HEADER_VALUE,
				'X-TRID': `HUB-VENDAS-${uuidV1}`,
			},
			data: payload
		}

		const { data } = await axios(config)

		return data
	} catch (error) {
		const errorHandled = vehicleApiErrorFactory(error)

		const vehicleApiError = new VehicleApiError(
			errorHandled.message,
			errorHandled.status,
			error.stack,
			errorHandled.errorCode
		)

		logger.error(
			{
				message: vehicleApiError.message,
				statusCode: vehicleApiError.code,
				errorCode: vehicleApiError.errorCode
			},
			'erro ao invocar a api do produto'
		)

		throw vehicleApiError
	}
}

const CONSTANTS = require('../property')

const axios = require('axios')

const factory = require('../factory')
const service = require('../service')
const errors = require('../error')

exports.get = async (plate) => {
	try {
		const config = {
			method: 'GET',
			url: `${CONSTANTS.VEHICLE_API_URL}/${CONSTANTS.V1_AUTO_VEHICLE_SEARCH_ENDPOINT}?plate=${plate}`,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}

		const axiosResponse = await axios(config)

		if (!axiosResponse || axiosResponse.data === undefined) {
			throw new Error(
				'Erro inesperado recebido da chamada da API: Resultado de chamada vazio ou inválido'
			)
		}

		return axiosResponse.data[0]
	} catch (error) {
		const errorHandled = factory.axiosHandlerError(error)

		const externalApiError = new errors.ExternalApiError(
			errorHandled.message,
			errorHandled.status,
			error.stack
		)

		service.logger.error(
			JSON.stringify({
				message: externalApiError.message,
				statusCode: externalApiError.code,
			})
		)

		throw externalApiError
	}
}

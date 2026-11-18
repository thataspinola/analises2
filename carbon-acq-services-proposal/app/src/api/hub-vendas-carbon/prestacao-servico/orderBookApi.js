const errors = require('../../../error')
const factory = require('../../../factory')
const service = require('../../../service')
const CONSTANT = require('../../../property')
const axios = require('axios')
const https = require('https')

const httpsAgent = new https.Agent({ keepAlive: true })

exports.postOrderBook = async (scheduleData) => {
	const config = {
		method: 'POST',
		url: `${CONSTANT.HUB_VENDAS_CARBON_SERVICES_ORDER_BOOKING_API}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			partner: CONSTANT.PARTNER_HEADER_VALUE,
		},
		data: scheduleData,
		httpsAgent,
	}
	try {
		const postScheduleResponse = await axios(config)

		if (!postScheduleResponse || postScheduleResponse.data === undefined) {
			throw new Error(`API order booking lambda, lista vazia`)
		}

		return postScheduleResponse.data
	} catch (error) {
		service.logger.error(
			`Api Error order booking lambda: ${JSON.stringify(error)}`
		)
		const dataFromAxiosError = factory.axiosResponseErrorData.getErrorData(
			error,
			'PRODUTO - AGENDAMENTO'
		)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
			error.stack,
			'prd01'
		)
		throw externalApiError
	}
}

const CONSTANT = require('../property')
const errors = require('../error')
const factory = require('../factory')
const service = require('../service')
const axios = require('axios')
const https = require('https')

exports.postServiceAppointment = async (
	parsedJsonRequest,
	token,
	certificate
) => {
	const httpsAgent = new https.Agent({ ca: certificate })

	const serviceAppointmentConfig = {
		method: 'POST',
		url: `${CONSTANT.SERVICE_APPOINTMENT_API}/${CONSTANT.SERVICE_APPOINTMENT_API_PATH}`,
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Basic ${token}`,
			partner: CONSTANT.PARTNER_HEADER_VALUE,
		},
		data: parsedJsonRequest,
		httpsAgent,
	}

	try {
		const serviceAppointmentResponse = await axios(serviceAppointmentConfig)

		if (
			!serviceAppointmentResponse ||
			serviceAppointmentResponse.data === undefined
		) {
			service.logger.info('Resultado de chamada vazio ou inválido')

			throw new Error('Resultado de chamada vazio ou inválido')
		}
		if (serviceAppointmentResponse.data.erro) {
			service.logger.info('Resultado da chamada errada')

			throw new Error(`${serviceAppointmentResponse.data?.erro?.mensagemErro}`)
		}

		return serviceAppointmentResponse.data
	} catch (error) {
		service.logger.error(error)
		
		const dataFromAxiosError =
			factory.axiosResponseErrorData.getErrorData(error)

		const externalApiError = new errors.ExternalApiError(
			dataFromAxiosError.message,
			dataFromAxiosError.status,
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

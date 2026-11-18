const service = require('../../../service')
const factory = require('../../../factory')
const api = require('../../../api')

exports.execute = async (parsedInput, tokenCarbon, certificate, date) => {
	let currentActivity =
		'Preparação do payload para a chamada do endpoint de API postServiceAppointment'
	try {
		const payload =
			factory.api.serviceAppointmentApi.serviceAppointmentRequestPayload.getPayload(
				parsedInput,
				date
			)
		currentActivity = 'Chamada do endpoint de API postServiceAppointment'
		service.logger.info(payload)

		const response = await api.serviceAppointmentApi.postServiceAppointment(
			payload,
			tokenCarbon,
			certificate
		)
		service.logger.info(response)
		if (
			!response ||
			!response.obterListaSugestoesOut ||
			!response.obterListaSugestoesOut.regulacoessaps ||
			response.obterListaSugestoesOut.regulacoessaps.length === 0
		) {
			return ''
		}

		return factory.api.serviceAppointmentApi.serviceAppointmentResponsePayload.getPayload(
			response
		)
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

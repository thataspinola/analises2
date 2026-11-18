const service = require('../../../service')
const factory = require('../../../factory')
const api = require('../../../api')

exports.execute = async (
	parsedInputData,
	mulesoftToken,
	certificate
) => {
	let currentActivity = 'Chamada do endpoint de API getAppointmentService'
	try {
		const getApiPayload =
			factory.api.servicoResolve.orcamentoCore.v1.AgendamentoApiPayloadRequest.getPayload(
				parsedInputData,
			)

		const getAppointmentService =
			await api.servicoResolve.orcamentoCore.v1.agendamentoApi.getAppointmentService(
				getApiPayload,
				mulesoftToken,
				certificate
			)
		const getAppointmentServiecPayloadReturn =
			factory.api.servicoResolve.orcamentoCore.v1.AgendamentoApiPayloadResponse.getPayload(
				getAppointmentService
			)
		currentActivity =
			'Preparação para o retorno da chamada do endpoint de API getAppointmentService'

		return getAppointmentServiecPayloadReturn
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

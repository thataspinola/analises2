const service = require('../../../service')
const factory = require('../../../factory')
const api = require('../../../api')

exports.execute = async (parsedInputData, mulesoftToken, certificate) => {
	let currentActivity = 'Chamada do endpoint de API SearchCaps Appointment'
	try {
		const getApiPayload =
			factory.api.assistencia.capsenderecos.v1.agendamentoPayloadRequest.getPayload(
				parsedInputData
			)

		const searchCapsAppointmentEndpointReturn =
			await api.assistencia.capsenderecos.v1.agendamentos.searchCapsAppointment(
				getApiPayload,
				mulesoftToken,
				certificate
			)

		currentActivity =
			'Preparação para o retorno da chamada do endpoint de API SearchCaps Appointment'

		return searchCapsAppointmentEndpointReturn
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

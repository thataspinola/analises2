const service = require('../../service')
const factory = require('../../factory')

exports.execute = (searchCapsAppointment) => {
	let currentActivity = 'Construção do valor de retorno'
	try {
		const buildReponse =
			factory.api.assistencia.capsenderecos.v1.agendamentoPayloadResponse.getPayload(
				searchCapsAppointment
			)
		const returnValue = factory.response.success(buildReponse)
		return returnValue
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

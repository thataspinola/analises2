const service = require('../../service')
const factory = require('../../factory')

exports.execute = (appointmentData) => {
	try {
		if (appointmentData == null || !appointmentData) {
			return factory.requestControllerResponse.noContent(
				'Nenhuma data foi retornada'
			)
		}

		if (Array.isArray(appointmentData) && appointmentData.length > 0) {
			return factory.requestControllerResponse.success(appointmentData)
		}

		return factory.requestControllerResponse.badRequestError()
	} catch (error) {
		service.logger.error(
			`Erro ao processar resposta de agendamento: ${error.message}`,
			{ appointmentData, stack: error.stack }
		)
		throw error
	}
}

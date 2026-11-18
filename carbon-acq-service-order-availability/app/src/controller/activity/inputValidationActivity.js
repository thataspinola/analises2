const CONSTANT = require('../../property')
const service = require('../../service')

exports.execute = (parsedInput) => {
	let currentActivity = 'Validação dos dados'
	try {
		service.validation.inputData(
			parsedInput,
			CONSTANT.VALIDATION_SERVICE_APPOINTMENT_SCHEMA
		)
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		if (error.name === 'ValidationError') {
			service.logger.warn(message)
		} else {
			service.logger.error(message)
		}
		throw error
	}
}

const CONSTANT = require('../../property')
const service = require('../../service')

exports.execute = (parsedInputData) => {
	let currentActivity = 'Validação dos dados'
	try {
		service.validation.inputData(
			parsedInputData,
			CONSTANT.SERVICE_PROPOSAL_SCHEMA
		)
	} catch (error) {
		const currentActivityMessage = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		if (error.name == 'ValidationError') {
			service.logger.warn(currentActivityMessage)
		} else {
			const errorReporting = {
				rawError: error,
				carbonErrorData: {
					layer: 'InputValidationActivity',
					currentActivity: currentActivityMessage,
					errorMessage: error.message,
				},
			}
			service.logger.error(errorReporting, error.message)
		}

		throw error
	}
}

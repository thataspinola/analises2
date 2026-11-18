const CONSTANTS = require('../../property')
const service = require('../../service')

exports.execute = (parsedJsonQueueMessage) => {
	let currentActivity = 'Validação dos dados'
	try {
		service.validation.inputData(
			parsedJsonQueueMessage,
			CONSTANTS.SQS_MESSAGE_SCHEMA
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

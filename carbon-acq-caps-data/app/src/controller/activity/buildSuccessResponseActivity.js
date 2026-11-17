const service = require('../../service')
const factory = require('../../factory')

exports.execute = (apigetCapsInfoResponseData) => {
	let currentActivity = 'Construção do valor de retorno'
	try {
		const returnValue = factory.response.success(apigetCapsInfoResponseData)
		return returnValue
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

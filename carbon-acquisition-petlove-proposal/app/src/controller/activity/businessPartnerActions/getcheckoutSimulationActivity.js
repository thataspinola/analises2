const service = require('../../../service')
const api = require('../../../api')

exports.execute = async (coupon, cardBin, data, petloveToken) => {
	let currentActivity = 'Obtendo simulação do checkout Petlove'
	try {
		return await api.businessPartner.checkoutSimulation.get(
			coupon,
			cardBin,
			data,
			petloveToken
		)
	} catch (error) {
		const currentActivityMessage = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`

		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'getcheckoutSimulationActivity',
				currentActivity: currentActivityMessage,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)

		throw error
	}
}

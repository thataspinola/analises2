const service = require('../../../service')
const api = require('../../../api')

exports.execute = async (payload, mulesoftToken, portoCertificates) => {
	let currentActivity = 'Fazendo requisição de orçamento'
	try {
		return await api.portableDevice.quotationRequest(
			payload,
			mulesoftToken,
			portoCertificates
		)
	} catch (error) {
		const currentActivityMessage = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`

		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'quotationRequestActivity',
				currentActivity: currentActivityMessage,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)

		throw error
	}
}

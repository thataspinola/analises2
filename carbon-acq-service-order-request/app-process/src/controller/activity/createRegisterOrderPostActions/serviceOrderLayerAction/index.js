const factory = require('../../../../factory')
const CONSTANTS = require('../../../../property')
const serviceOrderLayer = require(CONSTANTS.SERVICEORDER_LIBRARY_LOCATION)
const service = require('../../../../service')

exports.execute = async (parsedMessage, createOrderResponse) => {
	let currentActivity = 'Atualizando o registro na layer de serviços'
	try {
		currentActivity = 'Fazendo a conversão do payload para a chamada da layer'
		const recordPayload =
			factory.controller.createServiceOrderDataRequest.getPayload(
				parsedMessage,
				createOrderResponse
			)

		currentActivity = 'Fazendo a chamada na layer'
		const response = await serviceOrderLayer.createServiceOrderData(
			recordPayload
		)

		return response
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		service.logger.error(message)
		throw error
	}
}

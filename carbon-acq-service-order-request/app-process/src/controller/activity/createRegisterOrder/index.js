const factory = require('../../../factory')
const api = require('../../../api')
const service = require('../../../service')

exports.execute = async (
	integrationData,
	sensediaCloudToken,
	impersonalUserToken,
	carbonTraceId
) => {
	let currentActivity = 'Criando ordem de serviço'
	try {
		currentActivity =
			'Criando o factory para converter o payload para a chamada da API createServiceOrder'
		const createServiceOrderRequestPayload =
			factory.api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrderData.getServiceOrderRequestMessagePayload(
				integrationData
			)

		currentActivity = 'Chamada da API createServiceOrder'
		const createServiceOrderResult =
			await api.hubVendasCarbon.prestacaoServico.ordemServico.createServiceOrder(
				createServiceOrderRequestPayload,
				sensediaCloudToken,
				impersonalUserToken,
				carbonTraceId
			)

		return createServiceOrderResult
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		service.logger.error(message)
		throw error
	}
}

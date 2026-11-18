const factory = require('../../../../factory')
const api = require('../../../../api')
const service = require('../../../../service')

exports.execute = async (integrationData, carbonTraceId) => {
	let currentActivity =
		'Realizando o envio de e-mail do cancelamento da reserva de pagamento para o cliente'
	try {
		currentActivity =
			'Criando o factory para converter o payload para a chamada da API postSendEndpoint'
		const postSendEndpointRequestPayload =
			factory.api.sendgrid.v3.mail.postSendEndpoint.getPayload(integrationData)

		currentActivity = 'Chamada da API postSendEndpoint'

		const postSendEndpointResponsePayload =
			await api.sendgrid.v3.mail.postSendEndpoint(
				postSendEndpointRequestPayload,
				carbonTraceId
			)

		service.logger.info(`Email enviado com sucesso`)

		return postSendEndpointResponsePayload
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		service.logger.error(message)
		throw error
	}
}

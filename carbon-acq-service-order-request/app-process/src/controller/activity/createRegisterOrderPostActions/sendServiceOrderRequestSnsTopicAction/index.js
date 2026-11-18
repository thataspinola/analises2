const factory = require('../../../../factory')
const service = require('../../../../service')

exports.execute = async (parsedSqsMessage, createOrderResponse) => {
	let currentActivity = 'Enviando a mensagem para o tópico do SNS'
	try {
		currentActivity =
			'Fazendo a conversão de payload da mensagem para a chamada do SNS'
		const messagePayload = factory.service.sns.serviceOrderRequested.getPayload(
			parsedSqsMessage,
			createOrderResponse
		)
		currentActivity =
			'Fazendo a conversão do atributos da mensagem para a chamada do SNS'
		const messageAttributes =
			factory.service.sns.serviceOrderRequested.getSendMessageAttributes(
				createOrderResponse.serviceOrderNumber
			)
		currentActivity = 'Fazendo chamada para o SNS'
		const result = await service.sns.processSnsService.sendSnsMessage(
			messageAttributes,
			messagePayload
		)

		service.logger.info(
			`Message sent to pending service topic. Message ID: ${result || 'N/A'}`
		)
		return result
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		service.logger.error(message)
		throw error
	}
}

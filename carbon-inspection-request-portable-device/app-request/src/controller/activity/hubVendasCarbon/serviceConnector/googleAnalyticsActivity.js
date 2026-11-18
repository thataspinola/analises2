const CONSTANT = require('../../../../property')
const service = require('../../../../service')

exports.sendData = async (inputData, idTransaction) => {
	let currentActivity =
		'enviar mensagem para a fila que faz envio dos dados de tagueamento para o google-analytics'
	try {
		inputData.idTransaction = `${idTransaction}`
		if (!inputData.integrationData.analytics) {
			service.logger.warn(
				'Não foi repassado dados de tagueamento para ser enviado ao google-analytics'
			)
			return
		}

		const message = factory.googleAnalytics.getMessage(inputData, proposalId)

		await service.sqs.queue.sendMessage(message)

		service.logger.info(
			message,
			'Dados de tagueamento enviado para a fila que faz envio para o google-analytics com sucesso'
		)
	} catch (error) {
		const currentActivityMessage = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'googleAnalyticsActivity',
				currentActivity: currentActivityMessage,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)
		throw error
	}
}

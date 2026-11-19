const factory = require('../../../../factory')
const service = require('../../../../service')

exports.sendData = async (inputData, idTransaction) => {
	try {
		inputData.idTransaction = `${idTransaction}`
		if (!inputData.integrationData.analytics) {
			service.logger.warn(
				'Não foi repassado dados de tagueamento para ser enviado ao google-analytics'
			)
			return
		}

		const message = factory.googleAnalytics.getMessage(inputData, idTransaction)

		await service.sqs.queue.sendMessage(message)

		service.logger.info(
			'Dados de tagueamento enviados para a fila do google-analytics com sucesso'
		)
	} catch (error) {
		// A proposta e o pagamento já foram processados; falhar aqui os reenviaria.
		service.logger.error(
			'Falha na etapa opcional de envio de tagueamento para a fila do google-analytics'
		)
	}
}

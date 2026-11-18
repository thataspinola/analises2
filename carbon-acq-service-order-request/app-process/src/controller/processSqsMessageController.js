const service = require('../service')
const activity = require('./activity')

exports.process = async (parsedSqsMessage, carbonTraceId) => {
	service.logger.info(
		{ parsedSqsMessage, carbonTraceId },
		'Service order request received for processing'
	)

	service.logger.info(
		`Dados críticos para rastreamento: carbonTraceId=${carbonTraceId}, transactionId=${parsedSqsMessage.transactionId}, externalId=${parsedSqsMessage.externalId}`
	)

	try {
		activity.inputValidation.execute(parsedSqsMessage)

		activity.exceptionSimulation.execute(parsedSqsMessage)

		const { impersonalUserToken, sensediaCloudToken } =
			await activity.getApiGatewayTokens.execute()

		const createOrderResponse = await activity.createServiceOrder.execute(
			parsedSqsMessage.integrationData,
			sensediaCloudToken,
			impersonalUserToken,
			carbonTraceId
		)

		service.logger.info(
			`Service Order Created : ${createOrderResponse.serviceOrderNumber}`
		)

		const registerResult =
			await activity.createServiceOrderPost.serviceOrderLayer.execute(
				parsedSqsMessage,
				createOrderResponse
			)

		service.logger.info(
			`Service order registered: ${JSON.stringify(registerResult)}`
		)

		const messageResult =
			await activity.createServiceOrderPost.sendServiceOrderRequestSnsTopic.execute(
				parsedSqsMessage,
				createOrderResponse
			)

		service.logger.info(
			`Meio de pagamento identificado para a notificação da OS ${createOrderResponse.serviceOrderNumber}: transactionType=${parsedSqsMessage.transactionType}`
		)

		service.logger.info(
			`SNS message processed successfully. Result: ${JSON.stringify(
				messageResult
			)}`
		)

		await activity.googleAppointmentConversion.execute(parsedSqsMessage)

		return messageResult
	} catch (error) {
		const errorMessage = `Erro no processamento da mensagem SQS: ${error.message}`
		service.logger.error({ rawError: error }, errorMessage)

		if (error.name === 'ValidationError') {
			service.logger.error(`Estrutura ou dado inválido: ${error.message}`)
		} else {
			try {
				service.logger.error(
					`Erro interno. Dados: ${JSON.stringify(parsedSqsMessage)}`
				)
			} catch (detailsError) {
				service.logger.error(
					{ rawError: detailsError },
					`Erro interno. Não foi possível exibir dados: ${detailsError.message}`
				)
			}
		}
		throw error
	}
}

const service = require('../service')
const activity = require('./activity')
const factory = require('../factory')

exports.process = async (parsedSqsMessage, carbonTraceId) => {
	service.logger.info(
		factory.controller.processSqsMessage.receivedDataReport.getDataReport(
			parsedSqsMessage
		)
	)

	try {
		activity.exceptionSimulation.execute(parsedSqsMessage)

		let reservingResponse = null
		let cancelPaymentReservationResponse = null
		let customerNotifiedResponse = null
		if (parsedSqsMessage.transactionType === 'PIX') {
			service.logger.info(
				`[Cancelamento] Meio de pagamento PIX identificado. Fluxo automático não disponível. Encerrando. Dados: carbonTraceId=${carbonTraceId}, transactionId=${parsedSqsMessage.transactionId}, externalId=${parsedSqsMessage.externalId}`
			)
			return
		}
		if (parsedSqsMessage.externalId) {
			const [
				reservingSettledResponse,
				cancelPaymentReservationSettledResponse,
			] = await Promise.allSettled([
				(async () => {
					if (
						parsedSqsMessage.integrationData.serviceOrder.sku &&
						parsedSqsMessage.externalId
					) {
						return await activity.reservingDataError.execute(parsedSqsMessage)
					}
					throw new Error(
						'Cannot save on dynamoDB: sku property value not present'
					)
				})(),
				async () => {
					if (parsedSqsMessage.transactionId) {
						return await activity.cancelPaymentReservation.execute(
							parsedSqsMessage.transactionId,
							carbonTraceId
						)
					}
					throw new Error(
						'Cannot cancel payment credit-lock: transactionId property value not present'
					)
				},
			])

			if (reservingSettledResponse.status === 'rejected') {
				service.logger.error(
					{ rawError: reservingSettledResponse.reason },
					`DynamoDB data save error: ${reservingSettledResponse.reason.message}`
				)
			} else {
				reservingResponse = reservingSettledResponse.value
			}

			if (cancelPaymentReservationSettledResponse.status === 'rejected') {
				service.logger.error(
					{ rawError: cancelPaymentReservationSettledResponse.reason },
					`Payment credit-lock cancelling error: ${cancelPaymentReservationSettledResponse.reason.message}`
				)
			} else {
				cancelPaymentReservationResponse =
					cancelPaymentReservationSettledResponse.value
			}
			try {
				customerNotifiedResponse =
					await activity.customerNotifiedPost.sendCustomerNotifyRequest.execute(
						parsedSqsMessage,
						carbonTraceId
					)
			} catch (sendCustomerNotifyRequestError) {
				service.logger.error(
					{ rawError: sendCustomerNotifyRequestError },
					`Customer notification by email request error: ${sendCustomerNotifyRequestError.message}`
				)
			}
		} else {
			service.logger.error(
				'Cannot: save on dynamoDB, cancel payment credit-lock and request customer notify by email: externalId value is not present'
			)
		}

		const messageResult =
			factory.controller.processSqsMessage.processedDataReport.getDataReport(
				reservingResponse,
				cancelPaymentReservationResponse,
				customerNotifiedResponse
			)

		service.logger.info(messageResult)

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

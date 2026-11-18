const CONSTANT = require('../property')
const api = require('../api')
const factory = require('../factory')
const service = require('../service')

async function sendMessageToDLQ(message) {
	try {
		await service.sqs.queue.sendMessage(message)
	} catch (error) {
		service.logger.warn(
			{ error: true, message: error.message },
			`Não foi possível enviar o evento para a DLQ de Inspeção de Equipamentos Portáteis, porém o envio para a email-notification ocorreu com sucesso.`
		)
	}
}

exports.process = async (inputData) => {
	try {
		service.validation.inputData(inputData, CONSTANT.INSPECTION_FAIL_SCHEMA)

		const emailApiPayload = factory.api.emailNotification.getPayload(inputData)
		service.logger.info(
			{ payload: { ...emailApiPayload } },
			'Dados enviados para à notificação de email.'
		)

		await api.emailNotification.execute(emailApiPayload)

		await sendMessageToDLQ(inputData)
	} catch (error) {
		service.logger.error(
			{
				orderNumber: inputData.orderNumber,
				externalId: inputData.externalId,
			},
			`Falha no fluxo de envio de email de erro - ${error.message} - stack: ${error.stack}`
		)
		throw error
	}
}

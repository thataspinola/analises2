const integration = require('../integration')
const service = require('../service')
const factory = require('../factory')

const api = require('../api')

function validateInput(inputData) {
	service.validation.validateInputData(inputData)
}

async function callApi(payload) {
	await api.emailNotification.invoke(payload)
}

async function sendMessageToDLQ(inputData) {
	try {
		await integration.sqs.send(inputData)
	} catch (error) {
		service.logger.error(
			'Falha ao enviar a mensagem para a fila final de vistoria de celular'
		)
		throw error
	}
}

exports.processInspectionFail = async (inputData, logContext = {}) => {
	let operation = 'validate_input'
	try {
		validateInput(inputData)
		operation = 'build_notification'
		const payload = factory.emailNotification.createPayload(inputData)
		operation = 'send_notification'
		await callApi(payload)
		operation = 'send_final_queue'
		await sendMessageToDLQ(inputData)
	} catch (error) {
		service.logger.error(
			{ awsRequestId: logContext.awsRequestId, messageId: logContext.messageId, operation },
			'Falha no fluxo de notificação de vistoria'
		)
		throw error
	}
}


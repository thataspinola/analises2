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
		service.logger.warn(
			{ error: true, message: error.message },
			`Não foi possível enviar o evento para a DLQ de Inspeção do Celular, porém o envio para a email-notification ocorreu com sucesso.`
		)
	}
}

exports.processInspectionFail = async (inputData) => {
	validateInput(inputData)
	const payload = factory.emailNotification.createPayload(inputData)
	await callApi(payload)
	await sendMessageToDLQ(inputData)
}

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

exports.processInspectionFail = async (inputData) => {
	validateInput(inputData)
	const payload = factory.emailNotification.createPayload(inputData)
	await callApi(payload)
	await sendMessageToDLQ(inputData)
}

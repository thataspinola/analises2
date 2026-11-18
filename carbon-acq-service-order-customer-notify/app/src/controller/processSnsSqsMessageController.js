const CONSTANT = require('../property')
const serviceOrderLayer = require(CONSTANT.SERVICE_ORDER_LIBRARY_LOCATION)
const service = require('../service')
const factory = require('../factory')
const api = require('../api')

const inputValidation = (parsedSnsSqsMessagePayload) => {
	const activity = 'Validação dos dados'
	try {
		service.validation.inputData(
			parsedSnsSqsMessagePayload,
			CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
		)
	} catch (error) {
		logError(activity, error)
		throw error
	}
}

const getServiceOrderData = async (parsedJsonInputBody) => {
	let activity =
		'Construindo o payload para consultar os dados relativos a Ordem de Serviço'
	try {
		const requestValue =
			factory.controller.getServiceOrderData.getPayload(parsedJsonInputBody)
		activity = 'Consultar os dados relativos a Ordem de Serviço'
		const returnValue = await serviceOrderLayer.getServiceOrderData(
			requestValue
		)
		return JSON.parse(returnValue.body.message)
	} catch (error) {
		logError(activity, error)
		throw error
	}
}

const customerNotify = async (payload, carbonTraceId) => {
	let activity =
		'Preparação do payload para a chamada do endpoint de API postSendEndpoint'
	try {
		const dataPayload =
			factory.api.sendgrid.v3.mail.postSendEndpoint.getPayload(payload)
		service.logger.info(
			`Os valores selecionados foram: transactionType=${payload?.transactionType} e templateId=${dataPayload?.template_id}`
		)

		activity = 'Chamada do endpoint de API postSendEndpoint'

		const response = await api.sendgrid.v3.mail.postSendEndpoint(
			dataPayload,
			carbonTraceId
		)
		service.logger.info(
			'Chamada do endpoint de API postSendEndpoint retornou sem erros.'
		)
		return response
	} catch (error) {
		logError(activity, error)
		throw error
	}
}

const updateCustomerNotifyStatus = async (
	parsedSnsSqsMessagePayload,
	redeemResponseData
) => {
	let activity =
		'Construindo o payload para a atualização do status do envio de email transacional para o cliente'
	try {
		const updateData =
			factory.controller.setServiceOrderCustomerNotifyData.getPayload(
				parsedSnsSqsMessagePayload,
				redeemResponseData
			)

		activity =
			'Atualização do status do envio de email transacional para o cliente'

		const setServiceOrderCustomerNotifyDataReturn =
			await serviceOrderLayer.setCustomerNotifyData(updateData)

		if (setServiceOrderCustomerNotifyDataReturn.statusCode !== 200) {
			throw new Error(setServiceOrderCustomerNotifyDataReturn.body.message)
		}

		service.logger.info(
			`Processamento de atualiação do status do envio de email transacional para o cliente bem sucedido. Dados: ${JSON.stringify(
				updateData
			)}`
		)
		return setServiceOrderCustomerNotifyDataReturn.body
	} catch (error) {
		logError(activity, error)
	}
}

const logError = (activity, error) => {
	const message = `Erro identificado durante '${activity}': ${error.message}`
	if (error.name === 'ValidationError') {
		service.logger.warn({ rawError: error }, message)
	} else {
		service.logger.error({ rawError: error }, message)
	}
}

const exceptionSimulation = (parsedInput) => {
	let currentActivity = 'Teste de exceção'
	try {
		if (parsedInput.integrationData.customer.name === 'Except') {
			throw new Error('Simulação de falha')
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

exports.process = async (parsedSnsSqsMessagePayload, carbonTraceId) => {
	const parsedSnsMessagePayload = parsedSnsSqsMessagePayload.payload

	const receivedDataReport =
		factory.controller.processSqsMessage.receivedDataReport.getDataReport(
			parsedSnsMessagePayload
		)

	service.logger.info(
		`Processamento de mensagem da fila iniciado. Dados: ${JSON.stringify(
			receivedDataReport
		)}`
	)

	try {
		inputValidation(parsedSnsMessagePayload)

		exceptionSimulation(parsedSnsMessagePayload)

		const serviceOrderData = await getServiceOrderData(parsedSnsMessagePayload)
		let customerNotifyReturn = null
		let updateCustomerNotifyStatusReturn = null
		if (!serviceOrderData.customerNotified) {
			customerNotifyReturn = await customerNotify(
				parsedSnsMessagePayload,
				carbonTraceId
			)

			updateCustomerNotifyStatusReturn = await updateCustomerNotifyStatus(
				parsedSnsMessagePayload,
				customerNotifyReturn
			)
		}

		const processedDataReport =
			factory.controller.processSqsMessage.processedDataReport.getDataReport(
				serviceOrderData.customerNotified,
				customerNotifyReturn,
				updateCustomerNotifyStatusReturn
			)

		service.logger.info(
			`Processamento de mensagem da fila bem sucedido. Dados resultantes: ${JSON.stringify(
				processedDataReport
			)}`
		)

		return processedDataReport
	} catch (error) {
		const errorMessage = `Erro no processamento da mensagem SQS: ${error.message}`
		service.logger.error({ rawError: error }, errorMessage)

		if (error.name === 'ValidationError') {
			service.logger.error(`Estrutura ou dado inválido: ${error.message}`)
		}
		throw error
	}
}

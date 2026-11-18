const CONSTANT = require('../property')
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const serviceOrderLayer = require(CONSTANT.SERVICE_ORDER_LIBRARY_LOCATION)
const service = require('../service')
const factory = require('../factory')
const api = require('../api')

const inputValidation = (parsedSnsSqsMessage) => {
	const activity = 'Validação dos dados'
	try {
		service.validation.inputData(
			parsedSnsSqsMessage,
			CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
		)
	} catch (error) {
		handleProcessError(activity, error, payload)
		throw error
	}
}

const getApiGatewayTokens = async () => {
	const activity = 'Obtenção do token Sensedia Token Carbon Cloud'
	try {
		const impersonalUserCarbon = await token.getImpersonalUserCarbon()
		const sensediaCloudToken = await token.getSensediaTokenCarbonCloud()
		return { impersonalUserCarbon, sensediaCloudToken }
	} catch (error) {
		handleProcessError(activity, error)
		throw error
	}
}

const scheduleConfirm = async (
	payload,
	sensediaCloudToken,
	impersonalUserCarbon,
	carbonTraceId
) => {
	let activity =
		'Preparação do payload para a chamada do endpoint de API postBaixaEndpoint'
	try {
		const dataPayload =
			factory.api.hubVendasCarbon.prestacaoServico.v1.agendamentoApi.postBaixaEndpointFactory.getPayload(
				payload
			)

		activity = 'Chamada do endpoint de API postBaixaEndpoint'

		const response =
			await api.hubVendasCarbon.prestacaoServico.v1.agendamentoApi.postBaixaEndpoint(
				dataPayload,
				sensediaCloudToken,
				impersonalUserCarbon,
				carbonTraceId
			)

		return response
	} catch (error) {
		handleProcessError(activity, error, payload)
		throw error
	}
}

const updateScheduleStatus = async (
	parsedSnsSqsMessage,
	confirmResponseData
) => {
	let activity =
		'Construindo o payload para a atualização do status da baixa de agendamento'
	try {
		const updateData =
			factory.controller.setServiceOrderScheduleConfirmData.getPayload(
				parsedSnsSqsMessage,
				confirmResponseData
			)
		activity = 'Atualização do status da baixa de agendamento'

		const setServiceOrderScheduleConfirmDataReturn =
			await serviceOrderLayer.setServiceOrderScheduleConfirmData(updateData)

		if (setServiceOrderScheduleConfirmDataReturn.statusCode !== 200) {
			throw new Error(setServiceOrderScheduleConfirmDataReturn.body.message)
		}

		service.logger.info(
			`Processamento de atualização do status da baixa bem sucedido. Dados: ${JSON.stringify(
				updateData
			)}`
		)
		return setServiceOrderScheduleConfirmDataReturn
	} catch (error) {
		handleProcessError(activity, error, parsedSnsSqsMessage)
		throw error
	}
}

const handleProcessError = (activity, error, payload) => {
	const errorMessage = `Erro no processamento da mensagem SQS na atividade "${activity}": ${error.message}`
	service.logger.error(errorMessage)

	if (error.name === 'ValidationError') {
		service.logger.error(`Estrutura ou dado inválido: ${error.message}`)
	} else {
		try {
			service.logger.error(`Erro interno. Dados: ${JSON.stringify(payload)}`)
		} catch (detailsError) {
			service.logger.error(
				`Erro interno. Não foi possível exibir dados: ${detailsError.message}`
			)
		}
	}
}

exports.process = async (parsedSnsSqsMessage, carbonTraceId) => {
	const parsedSnsSqsMessagePayload = parsedSnsSqsMessage.payload

	const receivedDataReport =
		factory.controller.processSnsSqsMessage.receivedDataReport.getDataReport(
			parsedSnsSqsMessagePayload
		)

	service.logger.info(
		`Processamento de mensagem da fila iniciado. Dados: ${JSON.stringify(
			receivedDataReport
		)}`
	)

	try {
		inputValidation(parsedSnsSqsMessagePayload)

		const { impersonalUserCarbon, sensediaCloudToken } =
			await getApiGatewayTokens()

		const confirmDataReturn = await scheduleConfirm(
			parsedSnsSqsMessagePayload,
			sensediaCloudToken,
			impersonalUserCarbon,
			carbonTraceId
		)

		const updateScheduleStatusReturn = await updateScheduleStatus(
			parsedSnsSqsMessagePayload,
			confirmDataReturn
		)

		const processedDataReport =
			factory.controller.processSnsSqsMessage.processedDataReport.getDataReport(
				confirmDataReturn,
				updateScheduleStatusReturn
			)

		service.logger.info(
			`Processamento de mensagem da fila bem sucedido. Dados resultantes: ${JSON.stringify(
				processedDataReport
			)}`
		)

		return processedDataReport
	} catch (error) {
		handleProcessError('Processamento', error, payload)
		throw error
	}
}

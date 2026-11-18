const CONSTANT = require('../property')
const token = require(CONSTANT.TOKEN_LIBRARY_LOCATION)
const serviceOrderLayer = require(CONSTANT.SERVICE_ORDER_LIBRARY_LOCATION)
const service = require('../service')
const factory = require('../factory')
const api = require('../api')

const inputValidation = (parsedSnsMessagePayload) => {
	const activity = 'Validação dos dados'
	try {
		service.validation.inputData(
			parsedSnsMessagePayload,
			CONSTANT.PROCESS_SNS_SQS_MESSAGE_SCHEMA
		)
	} catch (error) {
		handleProcessError(activity, error, parsedSnsMessagePayload)
		throw error
	}
}

const getApiGatewayTokens = async () => {
	const activity = 'Obtenção do token Mulesoft Impersonal Token'
	try {
		const mulesoftImpersonalToken = await token.getMulesoftImpersonalTokenHub()
		return { mulesoftImpersonalToken }
	} catch (error) {
		handleProcessError(activity, error)
		throw error
	}
}

const postServiceOrderCheckin = async (
	parsedSnsMessagePayload,
	mulesoftImpersonalToken,
	carbonTraceId
) => {
	const activity = 'Chamada do endpoint de API postCheckinOs'
	try {
		const dataPayload =
			factory.api.asssitencia.webhook.oschassi.checkinOsApi.postCheckinOsPayload.getPayload(
				parsedSnsMessagePayload
			)
		service.logger.info(`Payload para a API: ${JSON.stringify(dataPayload)}`)

		const response =
			await api.assistencia.webhook.oschassi.checkinOsApi.postCheckinOs(
				dataPayload,
				mulesoftImpersonalToken,
				carbonTraceId
			)
		service.logger.info(`Resposta da API: ${JSON.stringify(response)}`)

		return response
	} catch (error) {
		handleProcessError(activity, error, parsedSnsMessagePayload)
		throw error
	}
}

const setCheckinStatus = async (
	parsedSnsMessagePayload,
	confirmResponseData
) => {
	const activity =
		'Atualização do status da baixa do checkin na Porto Assistência/Protheus'
	try {
		const updateData = factory.controller.serviceOrderCheckinData.getPayload(
			parsedSnsMessagePayload,
			confirmResponseData
		)

		const setCheckinStatusDataReturn =
			await serviceOrderLayer.setServiceOrderCheckinData(updateData)

		if (setCheckinStatusDataReturn.statusCode !== 200) {
			throw new Error(setCheckinStatusDataReturn.body.message)
		}

		service.logger.info(
			`Processamento de atualização do status da baixa bem sucedido. Dados: ${JSON.stringify(
				setCheckinStatusDataReturn
			)}`
		)
	} catch (error) {
		handleProcessError(activity, error, parsedSnsMessagePayload)
		throw error
	}
}

const handleProcessError = (activity, error, parsedSnsMessagePayload) => {
	const errorMessage = `Erro no processamento da mensagem SQS na atividade "${activity}": ${error.message}`
	service.logger.error(errorMessage)

	if (error.name === 'ValidationError') {
		service.logger.error(`Estrutura ou dado inválido: ${error.message}`)
	} else {
		try {
			service.logger.error(
				`Erro interno. Dados: ${JSON.stringify(parsedSnsMessagePayload)}`
			)
		} catch (detailsError) {
			service.logger.error(
				`Erro interno. Não foi possível exibir dados: ${detailsError.message}`
			)
		}
	}
}

exports.process = async (parsedSnsSqsMessage, carbonTraceId) => {
	service.logger.info(
		`Início do processamento da mensagem SQS. Dados: ${JSON.stringify(
			parsedSnsSqsMessage
		)}`
	)

	const parsedSnsMessagePayload = parsedSnsSqsMessage.payload

	try {
		inputValidation(parsedSnsMessagePayload)

		const { mulesoftImpersonalToken } = await getApiGatewayTokens()

		const confirmData = await postServiceOrderCheckin(
			parsedSnsMessagePayload,
			mulesoftImpersonalToken,
			carbonTraceId
		)

		return await setCheckinStatus(parsedSnsMessagePayload, confirmData)
	} catch (error) {
		handleProcessError('Processamento', error, parsedSnsMessagePayload)
		throw error
	}
}

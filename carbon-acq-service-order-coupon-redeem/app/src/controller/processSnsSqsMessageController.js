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
		logError(activity, error)
		throw error
	}
}

const getApiGatewayTokens = async () => {
	const activity = 'Obtenção do token Sensedia Token Carbon Cloud'
	try {
		const sensediaCloudToken = await token.getSensediaTokenCarbonCloud()
		return { sensediaCloudToken }
	} catch (error) {
		logError(activity, error)
		throw error
	}
}

const redeemCoupon = async (payload, sensediaCloudToken, carbonTraceId) => {
	let activity =
		'Preparação do payload para a chamada do endpoint de API putConsumoEndpoint'
	try {
		const dataPayload =
			factory.api.portoAssistencia.b2c.v1.cupomApi.putConsumoEndpointFactory.getPayload(
				payload
			)

		activity = 'Chamada do endpoint de API putConsumoEndpoint'

		const response = await api.portoAssistencia.b2c.v1.cupom.putConsumoEndpoint(
			dataPayload,
			sensediaCloudToken,
			carbonTraceId
		)

		return response
	} catch (error) {
		logError(activity, error)
		throw error
	}
}

const updateCouponStatus = async (parsedSnsSqsMessage, redeemResponseData) => {
	let activity =
		'Construindo o payload para a atualização do status da baixa de cupom'
	try {
		const updateData =
			factory.controller.setServiceOrderCouponRedeemData.getPayload(
				parsedSnsSqsMessage,
				redeemResponseData
			)

		activity = 'Atualização do status da baixa de cupom'

		const setServiceOrderCouponRedeemDataReturn =
			await serviceOrderLayer.setServiceOrderCouponRedeemData(updateData)

		if (setServiceOrderCouponRedeemDataReturn.statusCode !== 200) {
			throw new Error(setServiceOrderCouponRedeemDataReturn.body.message)
		}

		service.logger.info(
			`Processamento de atualização do status da baixa bem sucedido. Dados: ${JSON.stringify(
				updateData
			)}`
		)
		return setServiceOrderCouponRedeemDataReturn
	} catch (error) {
		logError(activity, error)
		throw error
	}
}

const logError = (activity, error) => {
	const message = `Erro identificado durante '${activity}': ${error.message}`
	if (error.name === 'ValidationError') {
		service.logger.warn(message)
	} else {
		service.logger.error(message)
	}
}

exports.process = async (parsedSnsSqsMessage, carbonTraceId) => {
	const parsedSnsMessagePayload = parsedSnsSqsMessage.payload

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

		const { sensediaCloudToken } = await getApiGatewayTokens()

		const redeemCouponReturn = await redeemCoupon(
			parsedSnsMessagePayload,
			sensediaCloudToken,
			carbonTraceId
		)

		if (redeemCouponReturn.codigo === 400) {
			const processedDataReport =
				factory.controller.processSqsMessage.processedDataReport.getDataReport(
					redeemCouponReturn
				)

			service.logger.warn(
				`Processamento de mensagem da fila foi realizado, porém ocorreu um erro na resposta da API. Dados resultantes: ${JSON.stringify(
					processedDataReport
				)}`
			)

			return processedDataReport
		}

		const updateCouponStatusReturn = await updateCouponStatus(
			parsedSnsMessagePayload,
			redeemCouponReturn
		)

		const processedDataReport =
			factory.controller.processSqsMessage.processedDataReport.getDataReport(
				redeemCouponReturn,
				updateCouponStatusReturn
			)

		service.logger.info(
			`Processamento de mensagem da fila bem sucedido. Dados resultantes: ${JSON.stringify(
				processedDataReport
			)}`
		)

		return processedDataReport
	} catch (error) {
		const errorMessage = `Erro no processamento da mensagem SQS: ${error.message}`
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
		throw error
	}
}

const api = require('../api')
const factory = require('../factory')
const CONSTANTS = require('../property')
const service = require('../service')
const logger = require('../../config/logger')

const token = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)
const paymentDataLayer = require(CONSTANTS.PAYMENT_DATA_LIBRARY_LOCATION)

exports.process = async (inputData, logContext = {}) => {
	const logData = { awsRequestId: logContext.awsRequestId, messageId: logContext.messageId }
	let operation = 'validate_input'
	try {
		service.validation.inputData(inputData, CONSTANTS.QUEUE_MESSAGE_SCHEMA)
		operation = 'build_payload'
		const proposalPayload = factory.proposalPayload.build(inputData.integrationData)
		operation = 'get_token'
		const muleSoftToken = await token.getMulesoftTokenHubInternal()
		operation = 'get_certificates'
		const portoCertificates = await token.getPortoCertificates()

		logger.info(
			{ ...logData, operation: 'send_proposal' },
			'informação enviada para o produto'
		)
		operation = 'send_proposal'
		const productResponse = await api.proposal.integration(
			proposalPayload,
			muleSoftToken,
			portoCertificates
		)

		operation = 'validate_product_response'
		service.validation.productData(productResponse)
		inputData.idTransaction = `${productResponse?.numeroProposta}`
		operation = 'save_payment_data'
		await paymentDataLayer.savePaymentData(inputData)
		logger.info(
			logData,
			'Registro das informações de vistoria efetuado com sucesso.'
		)

		await sendDataToGoogleAnalytics(inputData, productResponse.numeroProposta, logData)

		return factory.response.success('Success')
	} catch (error) {
		logger.error(
			{ ...logData, operation },
			'Falha no fluxo de envio da proposta'
		)
		throw error
	}
}

async function sendDataToGoogleAnalytics(inputData, proposalId, logData) {
	try {
		if (!inputData.integrationData.analytics) {
			logger.warn(
				{ ...logData, operation: 'send_analytics' },
				'Não foi repassado dados de tagueamento para ser enviado ao google-analytics'
			)
			return
		}

		const message = factory.googleAnalyticsCollect.getMessage(
			inputData,
			proposalId
		)

		await service.sqs.queueService.sendMessage(
			message,
			CONSTANTS.GOOGLE_ANALYTICS_COLLECT_QUEUE_URL
		)

		logger.info(
			{ ...logData, operation: 'send_analytics' },
			'dados de tagueamento enviado para a fila que faz envio para o google-analytics com sucesso'
		)
	} catch (error) {
		logger.error(
			{ ...logData, operation: 'send_analytics' },
			'erro ao enviar mensagem para a fila que faz envio dos dados de tagueamento para o google-analytics'
		)
	}
}


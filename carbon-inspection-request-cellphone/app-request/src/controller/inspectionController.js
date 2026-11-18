const api = require('../api')
const factory = require('../factory')
const CONSTANTS = require('../property')
const service = require('../service')

const token = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)
const paymentDataLayer = require(CONSTANTS.PAYMENT_DATA_LIBRARY_LOCATION)

exports.process = async (inputData) => {
	try {
		service.validation.inputData(inputData, CONSTANTS.QUEUE_MESSAGE_SCHEMA)
		const proposalPayload = factory.proposalPayload.build(inputData.integrationData)
		const muleSoftToken = await token.getMulesoftTokenHubInternal()
		const portoCertificates = await token.getPortoCertificates()

		logger.info(
			{ input: { ...proposalPayload } },
			'informação enviada para o produto'
		)
		const productResponse = await api.proposal.integration(
			proposalPayload,
			muleSoftToken,
			portoCertificates
		)

		service.validation.productData(productResponse)
		inputData.idTransaction = `${productResponse?.numeroProposta}`
		await paymentDataLayer.savePaymentData(inputData)

		const logData = {
			orderNumber: inputData.orderNumber,
			externalId: inputData.externalId,
			idTransaction: inputData.idTransaction,
		}
		logger.info(
			logData,
			'Registro das informações de vistoria efetuado com sucesso.'
		)

		await sendDataToGoogleAnalytics(inputData, productResponse.numeroProposta)

		return factory.response.success('Success')
	} catch (error) {
		const logData = {
			orderNumber: inputData.orderNumber,
			externalId: inputData.externalId,
		}

		logger.error(
			logData,
			`Falha no fluxo de envio da proposta - ${error.message} - stack: ${error.stack}`
		)
		throw error
	}
}

async function sendDataToGoogleAnalytics(inputData, proposalId) {
	try {
		if (!inputData.integrationData.analytics) {
			logger.warn(
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
			message,
			'dados de tagueamento enviado para a fila que faz envio para o google-analytics com sucesso'
		)
	} catch (error) {
		logger.error(
			error,
			'erro ao enviar mensagem para a fila que faz envio dos dados de tagueamento para o google-analytics'
		)
	}
}

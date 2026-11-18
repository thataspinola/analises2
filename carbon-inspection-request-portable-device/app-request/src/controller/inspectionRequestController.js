const CONSTANTS = require('../property')
const activity = require('./activity')
const factory = require('../factory')
const service = require('../service')
const token = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)

exports.process = async (inputData) => {
	try {
		service.validation.inputData(
			inputData,
			CONSTANTS.PROPOSAL_QUEUE_MESSAGE_SCHEMA
		)

		const muleSoftToken = await token.getMulesoftTokenHubInternal()
		const portoCertificates = await token.getPortoCertificates()

		const idTransaction = await activity.portableDevice.proposal.send(
			inputData,
			muleSoftToken,
			portoCertificates
		)
		await activity.hubVendasCarbon.payments.postponedPayment.save(
			inputData,
			idTransaction
		)

		await activity.hubVendasCarbon.serviceConnector.googleAnalytics.sendData(
			inputData,
			idTransaction
		)

		return factory.response.success('Sucesso')
	} catch (error) {
		service.logger.error(
			{
				orderNumber: inputData.orderNumber,
				externalId: inputData.externalId,
			},
			`Falha no fluxo de envio da proposta - ${error.message} - stack: ${error.stack}`
		)
		throw error
	}
}

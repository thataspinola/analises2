const api = require('../api')
const factory = require('../factory')
const service = require('../service')
const activity = require('./activity')
const CONSTANTS = require('../property')

const token = require(CONSTANTS.TOKEN_LIBRARY_LOCATION)

exports.process = async (itemCheckoutData) => {
	try {
		service.controllerValidation.checkoutItemData(itemCheckoutData)

		const allowedLogData = {
			orderNumber: itemCheckoutData.orderNumber,
			orderPaymentId: itemCheckoutData.orderPaymentId,
			externalId: itemCheckoutData.externalId,
			numeroOrcamento: itemCheckoutData.integrationData.numeroOrcamento,
		}

		let { integrationData, chargeId, status, charges } = itemCheckoutData

		if (charges) {
			/* O CARBON PAYMENT ESTÁ CONFIGURADO PARA APENAS 1 CARTÃO
				CONFORME DEFINIDO PELO NEGÓCIO */
			const charge = charges[0]
			integrationData.bandeira = charge?.creditCard?.flag
		}

		integrationData.idCartao = itemCheckoutData.orderPaymentId
		integrationData.idCobranca = chargeId
		integrationData.estado = status

		/**
		 * ADAPTAÇÃO DE URGÊNCIA CONFORME SOLICITAÇÃO/APROVAÇÃO DA SARA
		 * SERÁ REMOVIDO APÓS O PRODUTO ADEQUAR O RECEBIMENTO INCLUINDO
		 * O CÓDIGO DA ORIGEM
		 */
		const travelItem = transformTravelItem(integrationData)

		const sensediaToken = await token.getSensediaTokenHubInternal()

		const certificates = await activity.getCertificate.execute()

		const viagemOnPagamentoReturn = await api.viagemOn.integration(
			sensediaToken,
			certificates,
			travelItem
		)

		logger.info(
			{ ...allowedLogData, viagemOnPagamentoReturn },
			'Registro da Transmissão efetuado com sucesso.'
		)

		return factory.response.success(viagemOnPagamentoReturn)
	} catch (error) {
		const allowedLogData = {
			orderNumber: itemCheckoutData.orderNumber,
			orderPaymentId: itemCheckoutData.orderPaymentId,
			externalId: itemCheckoutData.externalId,
			numeroOrcamento: itemCheckoutData.integrationData.numeroOrcamento,
		}

		logger.error(allowedLogData, error.message)

		throw error
	}
}

function transformTravelItem(checkoutTransmissionItem) {
	const initialProposal = checkoutTransmissionItem.propostas || []

	if (initialProposal.length > 0) {
		const finalProposal = initialProposal.map((proposal) => {
			const proposalNumber = proposal?.numero || ''

			if (proposalNumber.substring(0, 2) == '18') {
				proposal.numero = proposalNumber.substring(2)
			}

			return proposal
		})

		checkoutTransmissionItem.propostas = finalProposal
	}

	return checkoutTransmissionItem
}

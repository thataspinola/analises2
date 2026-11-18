const factory = require('../../../factory')
const api = require('../../../api')
const service = require('../../../service')

exports.execute = async (
	inputData,
	commerceQuotationId,
	commerceCartData,
	createLeadData
) => {
	let currentActivity =
		'Criando payload para ser enviado para api de proposta do commerce'
	try {
		const postCommerceProposalEndpointPayload =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				inputData,
				commerceQuotationId,
				createLeadData
			)

		service.logger.info(postCommerceProposalEndpointPayload)

		currentActivity = 'Chamada do endpoint de proposta do commerce'
		const postCommerceProposalEndpointReturn =
			await api.commerceMagento.porto.proposal.postCommerceProposal(
				postCommerceProposalEndpointPayload,
				commerceCartData.cartId
			)

		service.logger.info(
			`Retorno do endpoint de API postCommerceProposal : ${JSON.stringify(
				postCommerceProposalEndpointReturn
			)}`
		)

		return postCommerceProposalEndpointReturn
	} catch (error) {
		const currentActivityMessage = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`

		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'PostCommerceProposalActivity',
				currentActivity: currentActivityMessage,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)

		throw error
	}
}

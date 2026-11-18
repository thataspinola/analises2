const factory = require('../../../factory')
const api = require('../../../api')
const service = require('../../../service')
const CONSTANT = require('../../../property')

exports.execute = async (
	proposalInputData,
	commerceQuotationId,
	scheduleData,
	commerceCartData,
	createLeadData,
	isRecommendation
) => {
	let currentActivity =
		'Preparação do payload para a chamada do endpoint de API commerceProposal'
	try {
		const postCommerceProposalEndpointPayload =
			factory.api.commerce.porto.commerceProposalApiRequestPayload.getRequestPayload(
				proposalInputData,
				commerceQuotationId,
				scheduleData,
				createLeadData,
				isRecommendation
			)

		logCommerceAnalyticsPayload(postCommerceProposalEndpointPayload)

		service.logger.info(
			`Retorno da conversão do payload da API postCommerceProposal: ${JSON.stringify(
				postCommerceProposalEndpointPayload
			)}`
		)
		const postCommerceProposalEndpointReturn =
			await api.commerceMagento.porto.proposal.postCommerceProposal(
				postCommerceProposalEndpointPayload,
				commerceCartData,
				proposalInputData.customerCommerceToken
			)

		service.logger.info(
			`Retorno do endpoint de API postCommerceProposal : ${JSON.stringify(
				postCommerceProposalEndpointReturn
			)}`
		)

		return postCommerceProposalEndpointReturn
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

function logCommerceAnalyticsPayload(payload) {
	const analytics = payload?.proposal?.porto_service?.analytics;

	service.logger.info(
		{ analytics },
		"Enviando campos do Google Analytics na requisição do Commerce"
	)
}

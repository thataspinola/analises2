const factory = require('../../../factory')
const api = require('../../../api')
const service = require('../../../service')

exports.execute = async (postPricingBudgetReturnCall, isRecommendation) => {
	let currentActivity =
		'Preparação do payload para a chamada do endpoint de API commerceQuotation'
	try {
		const postCommerceQuotationEndpointPayload =
			factory.api.commerce.porto.commerceQuotationApiRequestPayload.getRequestPayload(
				postPricingBudgetReturnCall, isRecommendation
			)

		service.logger.info(
			`Retorno da conversão do payload da API postCommerceQuotation: ${JSON.stringify(
				postCommerceQuotationEndpointPayload
			)}`
		)
		const postCommerceQuotationEndpointReturn =
			await api.commerceMagento.porto.quotation.postCommerceQuotation(
				postCommerceQuotationEndpointPayload
			)

		service.logger.info(
			`Retorno do endpoint de API postCommerceQuotation : ${JSON.stringify(
				postCommerceQuotationEndpointReturn
			)}`
		)

		return postCommerceQuotationEndpointReturn
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

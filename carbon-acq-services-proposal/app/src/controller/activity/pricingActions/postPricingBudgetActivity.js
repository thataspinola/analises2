const api = require('../../../api')
const service = require('../../../service')
const CONSTANT = require('../../../property')

exports.execute = async (parsedInputData) => {
	let currentActivity =
		'Preparação do payload para a chamada do endpoint de API pricing'
	try {
		let isRecommendation =
			await verifyIfRecommendationCouponShouldBeApplied(parsedInputData)

		const coupon = !isRecommendation
			? parsedInputData.serviceProvision.coupon
			: CONSTANT.RECOMMENDATION_COUPON

		const princingPayload = {
			...parsedInputData.serviceProvision,
			coupon,
		}

		const pricingRequestResponseData =
			await api.hubVendasCarbon.prestacaoServico.pricing.postPricing(
				princingPayload
			)

		const isRecommendationButFailedToApplyCouponFlag =
			isRecommendation && pricingRequestResponseData.couponStatus === 'invalid'

		if (isRecommendationButFailedToApplyCouponFlag) {
			service.logger.warn(
				'Houve uma tentativa de aplicar o cupom de recomendação a um serviço que não é recomendação'
			)
			isRecommendation = false
		}

		service.logger.info(
			{ pricingRequestResponseData, isRecommendation },
			'Retorno do endpoint de API hub-vendas-carbon services pricing'
		)

		return {
			pricingRequestResponseData,
			isRecommendationFlag: isRecommendation,
		}
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const verifyIfRecommendationCouponShouldBeApplied = async (parsedInputData) => {
	if (parsedInputData.isRecommendation && parsedInputData.cartCommerceId) {
		const getCartHasRecommendationResponse =
			await api.commerceMagento.porto.cartHasRecommendation.getCartHasRecommendation(
				parsedInputData.cartCommerceId,
				parsedInputData.customerCommerceToken,
			)

		if (getCartHasRecommendationResponse.cartHasRecommendation === false) {
			service.logger.info(
				'Não há uma recomendação no carrinho, o cupom para obtenção do desconto de recomendação deve ser aplicado'
			)
			return true
		}

		if (getCartHasRecommendationResponse.cartHasRecommendation === true) {
			service.logger.info(
				'Há uma recomendação no carrinho, o cupom para obtenção do desconto de recomendação não deve ser aplicado'
			)
			return false
		}
	}

	service.logger.info(
		{
			isRecommendation: parsedInputData.isRecommendation,
			cartCommerceId: parsedInputData.cartCommerceId,
		},
		'Não foi necessário verificar se há uma recomendação em um carrinho existente para aplicação do cupom de recomendação'
	)

	return false
}

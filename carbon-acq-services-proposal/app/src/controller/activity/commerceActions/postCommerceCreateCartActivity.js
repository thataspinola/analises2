const api = require('../../../api')
const service = require('../../../service')
const factory = require('../../../factory')

exports.execute = async (parsedInputData) => {
	let currentActivity =
		'Preparação do payload para a chamada do endpoint de API cartCheckout'
	try {
		const postCommerceCartPayload =
			factory.api.hubVendasCarbon.acquisition.cartCheckoutApiRequest.getRequestPayload(
				parsedInputData
			)
		const postCommerceCartEndpointReturn =
			await api.hubVendasCarbon.acquisition.cartCheckout.postCommerceCreateCart(
				postCommerceCartPayload
			)
		service.logger.info(
			`Retorno do endpoint de API postCommerceCreateCart : ${JSON.stringify(
				postCommerceCartEndpointReturn
			)}`
		)
		return postCommerceCartEndpointReturn.cartId
	} catch (error) {
		service.logger.error(
			`Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		)
		throw error
	}
}

const api = require('../../../api')
const factory = require('../../../factory')
const service = require('../../../service')

exports.execute = async (inputData) => {
	let currentActivity =
		'Criando objeto para enviar para API Cart Checkout lambda'
	try {
		const postCommerceCartPayload =
			factory.api.hubVendasCarbon.acquisition.cartCheckoutApiRequest.getRequestPayload(
				inputData
			)

		currentActivity = 'Chamada do endpoint de API Cart Checkout lambda'
		service.logger.info(
			`${currentActivity} ${JSON.stringify(postCommerceCartPayload)}`
		)

		const response =
			await api.hubVendasCarbon.acquisition.cartCheckout.postCommerceCreateCart(
				postCommerceCartPayload
			)

		currentActivity = 'Retorno do endpoint de API Cart Checkout lambda'
		service.logger.info(`${currentActivity} ${JSON.stringify(response)}`)

		return response
	} catch (error) {
		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'PostCartActivity',
				currentActivity: `Erro identificado durante a atividade: '${currentActivity}'`,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)
		throw error
	}
}

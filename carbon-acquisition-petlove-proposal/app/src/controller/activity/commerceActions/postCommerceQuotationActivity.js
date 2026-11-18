const factory = require('../../../factory')
const api = require('../../../api')
const service = require('../../../service')

exports.execute = async (inputData) => {
	let currentActivity =
		'Criando payload para ser enviado para api de cotação do commerce'
	try {
		const postCommerceQuotationEndpointPayload =
			factory.api.commerce.porto.commerceQuotationApiRequestPayload.getRequestPayload(
				inputData
			)

		service.logger.info(postCommerceQuotationEndpointPayload)

		currentActivity = 'Chamada do endpoint de cotação do commerce'
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
		const currentActivityMessage = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`

		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'PostCommerceQuotationActivity',
				currentActivity: currentActivityMessage,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)

		throw error
	}
}

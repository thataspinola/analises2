const factory = require('../../../factory')
const api = require('../../../api')
const service = require('../../../service')

exports.execute = async (transactionId, carbonTraceId) => {
	let currentActivity = 'Realizando o cancelamento da reserva de pagamento'
	try {
		currentActivity =
			'Criando o factory para converter o payload para a chamada da API postServiceProvisionPaymentCheckout'
		const postServiceProvisionPaymentCheckoutRequestPayload =
			factory.api.hubVendasCarbon.pagamento.prestacaoServico.paymentCheckout.getPayload(
				transactionId
			)

		currentActivity = 'Chamada da API postServiceProvisionPaymentCheckout'
		const postServiceProvisionPaymentCheckoutResponsePayload =
			await api.hubVendasCarbon.pagamento.prestacaoServico.paymentCheckout.postServiceProvisionPaymentCheckout(
				postServiceProvisionPaymentCheckoutRequestPayload,
				carbonTraceId
			)

		service.logger.info(
			`Retorno da chamada da API service-order-checkout: ${JSON.stringify(
				postServiceProvisionPaymentCheckoutResponsePayload
			)}`
		)
		return postServiceProvisionPaymentCheckoutResponsePayload
	} catch (error) {
		const message = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		service.logger.error(message)
		throw error
	}
}

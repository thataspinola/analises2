const MOCKS_FACTORY_POSTSERVICEPROVISIONCHECKOUT = require('../../../../factory/api/hub-vendas-carbon/pagamento/prestacao-servico/paymentCheckoutEndpointPayloadFactory.mock')
const POSTSERVICEPROVISIONCHECKOUT_SUCCESS_RESPONSE_DATA_VALUE = {
	//TODO: ajustar para o payload response real da chamada da API service-order-payment-checkout
	serviceOrderNumber: 'N/A',
	externalId: '6599001291',
	payment: {
		status: 'CANCELED',
		orderId: '3d7dd331-72f4-4d73-be1c-b43e40fa349a',
		chargeId: '3fde5ac4-9b54-45fa-8240-cb46af96f3d5',
	},
}

exports.POSTSERVICEPROVISIONCHECKOUT_SUCCESS_RESPONSE_DATA = () => {
	return POSTSERVICEPROVISIONCHECKOUT_SUCCESS_RESPONSE_DATA_VALUE
}
exports.POSTSERVICEPROVISIONCHECKOUT_VALID_PAYLOAD = () => {
	return MOCKS_FACTORY_POSTSERVICEPROVISIONCHECKOUT.VALID_RETURN()
}
exports.POSTSERVICEPROVISIONCHECKOUT_VALID_RETURN = () => {
	return POSTSERVICEPROVISIONCHECKOUT_SUCCESS_RESPONSE_DATA_VALUE
}

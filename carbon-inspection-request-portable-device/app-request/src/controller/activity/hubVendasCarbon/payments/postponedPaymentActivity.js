const CONSTANTS = require('../../../../property')
const paymentDataLayer = require(CONSTANTS.PAYMENT_DATA_LIBRARY_LOCATION)
const service = require('../../../../service')

exports.save = async (data, idTransaction) => {
	let currentActivity = 'envio dos dados de pagamento para paymentDataLayer'
	try {
		data.idTransaction = `${idTransaction}`
		await paymentDataLayer.savePaymentData(data)
		service.logger.info(
			{
				orderNumber: data.orderNumber,
				externalId: data.externalId,
				idTransaction: data.idTransaction,
			},
			'Registro das informações de vistoria efetuado com sucesso.'
		)
		return
	} catch (error) {
		const currentActivityMessage = `Erro identificado durante a atividade '${currentActivity}': ${error.message}`
		const errorReporting = {
			rawError: error,
			carbonErrorData: {
				layer: 'postponedPaymentActivity',
				currentActivity: currentActivityMessage,
				errorMessage: error.message,
			},
		}
		service.logger.error(errorReporting, error.message)
		throw error
	}
}

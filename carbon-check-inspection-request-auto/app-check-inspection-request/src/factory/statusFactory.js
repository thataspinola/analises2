const {
	INSPECTION,
	AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_ARRAY
} = require('../property')

exports.getInspectionStatus = (protocolData) => {
	let inspectionStatus = INSPECTION.PENDING
	if (protocolData) {
		if (protocolData.status === 'EMITIDA') {
			inspectionStatus = INSPECTION.ISSUED
		} else if (protocolData.status === 'RECUSADA') {
			inspectionStatus = INSPECTION.REFUSED
		} else if (protocolData.devolutivas?.length === AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_ARRAY.length) {
			const readyToPayment =
				AUTO_INSURANCE_PAYMENT_READY_SET_OF_FEEDBACKS_TEXT_ARRAY.reduce(
					(readyToPay, paymentReadyFeedbackSetItem, paymentReadyFeedbackSetItemIndex) => {
						let readyToPayActualValue = readyToPay
						if (paymentReadyFeedbackSetItemIndex === 1) {
							readyToPayActualValue = protocolData.devolutivas.findIndex((devolutiva) => {
									return readyToPay === devolutiva.texto.trim().toUpperCase()
								}) >= 0
						}

						const paymentReadyFeedbackSetItemFound =
							protocolData.devolutivas.findIndex((devolutiva) => {
								return (
									paymentReadyFeedbackSetItem ===
									devolutiva.texto.trim().toUpperCase()
								)
							}) >= 0
						return readyToPayActualValue && paymentReadyFeedbackSetItemFound
					}
				)

			if (readyToPayment) inspectionStatus = INSPECTION.OK
		}
	}
	return inspectionStatus
}

const isValidPropertyValue = (inputData) => {
	return typeof inputData === 'string' && inputData.trim() !== ''
}

exports.getDataReport = (
	customerAlreadyNotified,
	customerNotifyRequestSent,
	updateCustomerNotifyStatusReturn
) => {
	const updateCustomerNotifyStatusReturnRequestId = isValidPropertyValue(
		updateCustomerNotifyStatusReturn?.requestId
	)
		? updateCustomerNotifyStatusReturn.requestId
		: 'N/A'

	const customerNotifyRequestNotSentMessage = customerAlreadyNotified
		? 'ALREADY-SENT'
		: 'N/A'
	const payload = {
		customerNotifyReturnMessage: customerNotifyRequestSent
			? 'SENT'
			: customerNotifyRequestNotSentMessage,
		updateCustomerNotifyStatusReturnRequestId,
	}

	return payload
}

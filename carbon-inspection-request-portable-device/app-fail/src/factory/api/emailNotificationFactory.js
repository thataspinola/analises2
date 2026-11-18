exports.getPayload = (inputData) => {
	return {
		status: 'ERROR',
		scope: 'portable_device',
		paymentData: {
			orderNumber: inputData.orderNumber,
			externalId: inputData.externalId,
			scope: inputData.scope,
		},
	}
}

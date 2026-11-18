exports.createPayload = (inputData) => {
	return {
		status: 'ERROR',
		scope: 'phone',
		paymentData: {
			orderNumber: inputData.orderNumber,
			externalId: inputData.externalId,
			scope: inputData.scope,
		},
	}
}

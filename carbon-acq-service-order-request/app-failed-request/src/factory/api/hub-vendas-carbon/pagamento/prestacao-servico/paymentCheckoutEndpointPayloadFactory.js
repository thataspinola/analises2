exports.getPayload = (transactionId) => {
	const payload = {
		transactionId: transactionId,
		canceled: true,
		amount: 0,
	}

	return payload
}

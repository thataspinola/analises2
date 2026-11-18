exports.getPayload = (
	paymentReadyStatus,
	transactionId,
	proposalId,
	proposalOrigin
) => {
	return {
		scope: 'auto',
		idTransaction: transactionId,
		status: paymentReadyStatus,
		proposalData: {
			proposalId: proposalId,
			externalId: `${proposalOrigin}${proposalId.padStart(8, '0')}`,
		},
	}
}

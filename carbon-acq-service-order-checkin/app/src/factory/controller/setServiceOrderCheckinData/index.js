exports.getPayload = (parsedSnsSqsMessage, apiResponse) => {
	return {
		carbonTraceId: parsedSnsSqsMessage.carbonTraceId,
		eCommercePlatform: {
			orderNumber: parsedSnsSqsMessage.eCommercePlatform.orderNumber,
			loggedCPF: parsedSnsSqsMessage.eCommercePlatform.loggedCPF,
		},
		serviceOrderNumber: parsedSnsSqsMessage.integrationData.serviceOrderNumber,
		sku: parsedSnsSqsMessage.integrationData.serviceOrder.sku,
		externalId: parsedSnsSqsMessage.externalId,
		transactionId: parsedSnsSqsMessage.transactionId,
		responseMessageServiceOrderCheckin:
			apiResponse.message || 'No response message',
	}
}

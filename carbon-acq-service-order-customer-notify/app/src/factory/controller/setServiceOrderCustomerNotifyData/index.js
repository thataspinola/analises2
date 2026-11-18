exports.getPayload = (parsedSnsSqsMessagePayload) => {
	return {
		carbonTraceId: parsedSnsSqsMessagePayload.carbonTraceId,
		eCommercePlatform: {
			orderNumber: parsedSnsSqsMessagePayload.eCommercePlatform.orderNumber,
			loggedCPF: parsedSnsSqsMessagePayload.eCommercePlatform.loggedCPF,
		},
		serviceOrderNumber:
			parsedSnsSqsMessagePayload.integrationData.serviceOrderNumber,
		sku: parsedSnsSqsMessagePayload.integrationData.serviceOrder.sku,
		externalId: parsedSnsSqsMessagePayload.externalId,
		transactionId: parsedSnsSqsMessagePayload.transactionId,
		responseMessageCustomerNotified:
			'Customer notify email message sent to sendgrid server',
	}
}

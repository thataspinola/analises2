exports.getPayload = (parsedSqsMessage, apiResponse) => {
	return {
		carbonTraceId: parsedSqsMessage.carbonTraceId,
		eCommercePlatform: {
			orderNumber: parsedSqsMessage.eCommercePlatform.orderNumber,
			loggedCPF: parsedSqsMessage.eCommercePlatform.loggedCPF,
		},
		serviceOrderNumber: apiResponse.serviceOrderNumber,
		sku: parsedSqsMessage.integrationData.serviceOrder.sku,
		externalId: parsedSqsMessage.externalId,
		transactionId: parsedSqsMessage.transactionId,
		transactionType: parsedSqsMessage?.transactionType || 'CREDIT_CARD',
		hasCoupon: !!parsedSqsMessage.integrationData?.serviceOrder?.coupon,
	}
}

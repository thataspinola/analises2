const isValidPropertyValue = (value) => {
	return value !== undefined && value !== null && value !== ''
}

exports.getDataReport = (parsedSqsMessagePayload) => {
	const coupon = isValidPropertyValue(
		parsedSqsMessagePayload.integrationData.serviceOrder.coupon
	)
		? parsedSqsMessagePayload.integrationData.serviceOrder.coupon
		: 'N/A'
	const number = isValidPropertyValue(
		parsedSqsMessagePayload.integrationData.serviceOrderNumber
	)
		? parsedSqsMessagePayload.integrationData.serviceOrderNumber
		: 'N/A'

	const documentNumber = isValidPropertyValue(
		parsedSqsMessagePayload.integrationData.customer?.documentNumber
	)
		? `${parsedSqsMessagePayload.integrationData.customer?.documentNumber.substring(
				0,
				4
		  )}******`
		: 'N/A'

	return {
		number: number,
		coupon: coupon,
		documentNumber: documentNumber,
	}
}

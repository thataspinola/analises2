const isValidPropertyValue = (value) => {
	return value !== undefined && value !== null && value !== ''
}

exports.getDataReport = (parsedSnsSqsMessagePayload) => {
	const key = isValidPropertyValue(
		parsedSnsSqsMessagePayload.integrationData?.serviceOrder?.schedule?.key
	)
		? parsedSnsSqsMessagePayload.integrationData.serviceOrder.schedule.key
		: 'N/A'

	const serviceOrderNumber = isValidPropertyValue(
		parsedSnsSqsMessagePayload.integrationData?.serviceOrderNumber
	)
		? parsedSnsSqsMessagePayload.integrationData.serviceOrderNumber
		: 'N/A'

	return {
		key: key,
		serviceOrderNumber: serviceOrderNumber,
	}
}

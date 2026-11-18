exports.getPayload = (parsedSnsSqsMessagePayload) => {
	const reservationKey =
		parsedSnsSqsMessagePayload.integrationData.serviceOrder.schedule.key
	const [serviceOrderNumber, serviceOrderYear] =
		parsedSnsSqsMessagePayload.integrationData.serviceOrderNumber.split('-')

	return {
		reservationKey,
		serviceOrderNumber,
		serviceOrderYear,
	}
}

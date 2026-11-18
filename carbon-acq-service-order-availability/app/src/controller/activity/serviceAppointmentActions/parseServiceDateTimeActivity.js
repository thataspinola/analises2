exports.execute = async (serviceDateTime) => {
	if (!serviceDateTime) {
		const today = new Date()
		today.setUTCHours(0, 0, 0, 0)
		return today
	}

	const parsedDate = new Date(serviceDateTime)

	if (isNaN(parsedDate.getTime())) {
		throw new Error(
			`Formato de data inválido: ${serviceDateTime}. Use o formato ISO 8601.`
		)
	}

	parsedDate.setUTCHours(0, 0, 0, 0)
	return parsedDate
}

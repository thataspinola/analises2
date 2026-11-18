exports.getPayload = (parsedSnsSqsMessagePayload) => {
	return {
		externalId: parsedSnsSqsMessagePayload.externalId,
	}
}

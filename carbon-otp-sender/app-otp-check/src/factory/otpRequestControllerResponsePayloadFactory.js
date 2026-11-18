exports.getPayload = (pescod) => {
	const payload = {
		message: 'Código validado com sucesso',
		pescod,
	}

	return payload
}

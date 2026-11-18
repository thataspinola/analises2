exports.getMessage = (motivo, idLead) => {
	const message = {
		motivo: motivo,
		oportunidadeId: idLead,
	}

	return message
}

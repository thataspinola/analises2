exports.getPayload = (inputData) => {
	return {
		codigosCaps: inputData.capsCodes,
		codigosServicos: inputData.serviceCodes,
		disponibilidadeData: inputData.dateAvailability,
	}
}

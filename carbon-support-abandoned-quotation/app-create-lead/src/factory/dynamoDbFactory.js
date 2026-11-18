exports.makePayloadLeadInProgress = (dynamicsResponse, inputData) => {
	let payload = {
		vdoCode: dynamicsResponse.codigoAtendimentoVDO,
		idBranch: inputData.idBranch,
	}

	if (inputData.idProductType) {
		payload.idProductType = inputData.idProductType
	}

	return payload
}

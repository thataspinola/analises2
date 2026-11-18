exports.getPayload = (parsedInputData) => {
	const data = parsedInputData || {}

	return {
		codigoVistoria: data?.inspectionKey || '',
		codigoReparoAuto: data?.serviceOrderCode || ''
	}
}

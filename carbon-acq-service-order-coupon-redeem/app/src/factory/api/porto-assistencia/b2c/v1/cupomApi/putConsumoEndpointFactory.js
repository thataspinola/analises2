exports.getPayload = (parsedSnsMessagePayload) => {
	const payload = {
		cupom: parsedSnsMessagePayload.integrationData.serviceOrder.coupon,
		cpfCnpj: parsedSnsMessagePayload.integrationData.customer.documentNumber,
		numeroOs: parsedSnsMessagePayload.integrationData.serviceOrderNumber,
	}
	return payload
}

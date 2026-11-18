exports.getRequestPayload = (parsedInputData) => {
	const responsePayload = {
		cartCommerceId: parsedInputData.cartCommerceId
			? parsedInputData.cartCommerceId
			: '',
		customerToken: parsedInputData.customerCommerceToken
			? parsedInputData.customerCommerceToken
			: '',
	}

	return responsePayload
}

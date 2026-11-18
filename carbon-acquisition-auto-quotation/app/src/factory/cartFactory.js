exports.getRequestPayload = (input) => {
	const responsePayload = {
		cartCommerceId: input.auto.shoppingToken || '',
		customerToken: input.auto.commerceCustomerToken || '',
	}

	return responsePayload
}

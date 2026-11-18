exports.getPayload = (
	urlCartRedirect,
	commerceCartId,
	commerceQuotationId,
	pricingData,
	createLeadData,
	proposalData,
	orderBookData
) => {
	const returnValue = {
		urlCartRedirect: urlCartRedirect,
		cartCommerceId: commerceCartId,
		quotationCommerceId: commerceQuotationId,
		pricing_data: pricingData,
		...createLeadData,
		proposalData,
		orderBookData,
	}
	return returnValue
}

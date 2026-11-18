exports.error = (message) => {
	const response = {
		statusCode: 500,
		body: {
			status: 'error',
		},
	}

	if (message) {
		Object.assign(response.body, { message })
	}

	return response
}

exports.badRequestError = (message) => {
	return {
		statusCode: 400,
		body: {
			message,
		},
	}
}

exports.success = (
	urlCartRedirect,
	commerceCartId,
	commerceQuotationId,
	createLeadData,
	proposalData
) => {
	return {
		statusCode: 200,
		body: {
			urlCartRedirect: urlCartRedirect,
			cartCommerceId: commerceCartId,
			quotationCommerceId: commerceQuotationId,
			...createLeadData,
			proposalData,
		},
	}
}

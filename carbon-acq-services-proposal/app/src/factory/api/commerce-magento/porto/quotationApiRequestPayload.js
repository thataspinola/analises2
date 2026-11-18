exports.getRequestPayload = (pricingApiReponse, isRecommendation) => {
	const responsePayload = {
		quotation: {
			scope: 'porto_service',
			porto_service: {
				sku: pricingApiReponse.products[0].sku,
				forms_of_payment: [
					mapPortoCardPaymentMethod(pricingApiReponse),
					mapOtherCardPaymentMethod(pricingApiReponse),
					...(pricingApiReponse.paymentMethod?.pix ? [mapPixPaymentMethod(pricingApiReponse)] : []),
				],
				is_recommendation: isRecommendation ?? false,
			},
		},
	}

	return responsePayload
}

const mapPixPaymentMethod = (pricingApiReponse) => {
	return mapFormsOfPayment(
		pricingApiReponse.paymentMethod.pix,
		'pix',
		pricingApiReponse.finalValuePix
	)
}

const mapPortoCardPaymentMethod = (pricingApiReponse) => {
	return mapFormsOfPayment(
		pricingApiReponse.paymentMethod.portoCard,
		'porto_card',
		pricingApiReponse.finalValuePortoCard
	)
}

const mapOtherCardPaymentMethod = (pricingApiReponse) => {
	return mapFormsOfPayment(
		pricingApiReponse.paymentMethod.otherCardBrands,
		'other_card',
		pricingApiReponse.finalValue
	)
}

const mapFormsOfPayment = (paymentMethod, code, paymentMethodFinalPrice) => {
	return {
		code,
		installments_available: mapInstallments(paymentMethod.installment),
		final_price: paymentMethodFinalPrice,
	}
}

const mapInstallments = (installments) => {
	return Object.entries(installments).map(([number, price]) => ({
		number_of_installments: parseInt(number, 10),
		single_installment_price: price,
	}))
}
